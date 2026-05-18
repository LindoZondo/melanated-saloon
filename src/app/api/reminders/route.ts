import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { addHours, isWithinInterval } from "date-fns";

// This endpoint is called by a cron job to send appointment reminders
// Sends reminders 24 hours before the appointment
export async function POST(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const in24Hours = addHours(now, 24);

    // Find bookings that are 24 hours away and haven't been reminded
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        status: "CONFIRMED",
        reminderSent: false,
        date: {
          gte: now,
          lte: in24Hours,
        },
      },
      include: {
        user: true,
        service: true,
        stylist: { include: { user: true } },
      },
    });

    const reminders = [];

    for (const booking of upcomingBookings) {
      // Create in-app notification
      await prisma.notification.create({
        data: {
          userId: booking.userId,
          title: "Appointment Tomorrow! 💫",
          message: `Reminder: Your ${booking.service.name} appointment with ${booking.stylist.user.name} is tomorrow at ${booking.startTime}. See you soon, queen!`,
          type: "reminder",
        },
      });

      // Mark reminder as sent
      await prisma.booking.update({
        where: { id: booking.id },
        data: { reminderSent: true },
      });

      reminders.push({
        bookingId: booking.id,
        userEmail: booking.user.email,
        service: booking.service.name,
      });

      // In production, you'd also send email/SMS here using your SMTP config
      // await sendReminderEmail(booking.user.email, booking);
      // await sendReminderSMS(booking.user.phone, booking);
    }

    return NextResponse.json({
      message: `Sent ${reminders.length} reminders`,
      reminders,
    });
  } catch (error) {
    console.error("Reminder error:", error);
    return NextResponse.json(
      { error: "Failed to process reminders" },
      { status: 500 }
    );
  }
}
