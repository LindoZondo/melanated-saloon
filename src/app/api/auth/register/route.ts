import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Generate unique referral code
    const referralCode = `QUEEN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Get loyalty config for welcome bonus
    const loyaltyConfig = await prisma.loyaltyConfig.findFirst({
      where: { isActive: true },
    });
    const welcomeBonus = loyaltyConfig?.welcomeBonus || 25;

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        password: hashedPassword,
        referralCode,
        referredBy: data.referralCode || null,
        loyaltyPoints: welcomeBonus,
      },
    });

    // Handle referral bonus
    if (data.referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: data.referralCode },
      });

      if (referrer) {
        const referralBonus = loyaltyConfig?.referralBonus || 50;

        await prisma.user.update({
          where: { id: referrer.id },
          data: { loyaltyPoints: { increment: referralBonus } },
        });

        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: user.id,
            bonusAwarded: true,
          },
        });

        // Notify referrer
        await prisma.notification.create({
          data: {
            userId: referrer.id,
            title: "Referral Bonus! 🎉",
            message: `${data.name} joined using your referral code! You earned ${referralBonus} loyalty points.`,
            type: "referral",
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Account created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
