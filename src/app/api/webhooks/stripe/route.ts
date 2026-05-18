import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const bookingId = paymentIntent.metadata.bookingId;

      if (bookingId) {
        await prisma.payment.updateMany({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: "COMPLETED" },
        });

        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "CONFIRMED" },
        });
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await prisma.payment.updateMany({
        where: { stripePaymentId: paymentIntent.id },
        data: { status: "FAILED" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
