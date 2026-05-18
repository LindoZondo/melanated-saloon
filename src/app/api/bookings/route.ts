import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: (session.user as any).id },
    include: {
      service: true,
      stylist: { include: { user: true } },
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { serviceId, stylistId, date, startTime, promoCode } = body;

    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Calculate end time based on service duration
    const [hours, minutes] = startTime.split(":").map(Number);
    const endMinutes = hours * 60 + minutes + service.duration;
    const endTime = `${Math.floor(endMinutes / 60).toString().padStart(2, "0")}:${(endMinutes % 60).toString().padStart(2, "0")}`;

    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: { code: promoCode },
      });

      if (promo && promo.isActive && new Date() <= promo.validUntil) {
        if (promo.maxUses && promo.usedCount >= promo.maxUses) {
          return NextResponse.json({ error: "Promo code expired" }, { status: 400 });
        }

        discount = promo.discountType === "percentage"
          ? (service.price * promo.discountValue) / 100
          : promo.discountValue;

        await prisma.promoCode.update({
          where: { id: promo.id },
          data: { usedCount: { increment: 1 } },
        });

        await prisma.promoUsage.create({
          data: {
            userId: (session.user as any).id,
            promoId: promo.id,
          },
        });
      }
    }

    // Apply loyalty discount for returning clients
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
    });

    const loyaltyConfig = await prisma.loyaltyConfig.findFirst({
      where: { isActive: true },
    });

    if (user && loyaltyConfig && user.loyaltyPoints >= loyaltyConfig.redeemThreshold) {
      // Auto-apply loyalty discount if eligible
      discount += loyaltyConfig.discountPerRedeem;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          loyaltyPoints: { decrement: loyaltyConfig.redeemThreshold },
        },
      });
    }

    const totalPrice = Math.max(0, service.price - discount);

    const booking = await prisma.booking.create({
      data: {
        userId: (session.user as any).id,
        stylistId,
        serviceId,
        date: new Date(date),
        startTime,
        endTime,
        totalPrice,
        discountApplied: discount,
        status: "PENDING",
      },
    });

    // Award loyalty points
    if (loyaltyConfig) {
      const pointsEarned =
        loyaltyConfig.pointsPerVisit +
        Math.floor(totalPrice * loyaltyConfig.pointsPerDollar);

      await prisma.user.update({
        where: { id: (session.user as any).id },
        data: {
          loyaltyPoints: { increment: pointsEarned },
          totalVisits: { increment: 1 },
        },
      });
    }

    // Create reminder notification
    await prisma.notification.create({
      data: {
        userId: (session.user as any).id,
        title: "Booking Confirmed! ✨",
        message: `Your ${service.name} appointment is booked for ${date} at ${startTime}. We'll send you a reminder 24 hours before.`,
        type: "booking",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
