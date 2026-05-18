import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET - Fetch loyalty configuration
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const config = await prisma.loyaltyConfig.findFirst({
    where: { isActive: true },
  });

  return NextResponse.json(config);
}

// PUT - Update loyalty configuration
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      pointsPerVisit,
      pointsPerDollar,
      redeemThreshold,
      discountPerRedeem,
      referralBonus,
      welcomeBonus,
    } = body;

    // Upsert the loyalty config
    const existingConfig = await prisma.loyaltyConfig.findFirst({
      where: { isActive: true },
    });

    let config;
    if (existingConfig) {
      config = await prisma.loyaltyConfig.update({
        where: { id: existingConfig.id },
        data: {
          pointsPerVisit,
          pointsPerDollar,
          redeemThreshold,
          discountPerRedeem,
          referralBonus,
          welcomeBonus,
        },
      });
    } else {
      config = await prisma.loyaltyConfig.create({
        data: {
          pointsPerVisit,
          pointsPerDollar,
          redeemThreshold,
          discountPerRedeem,
          referralBonus,
          welcomeBonus,
          isActive: true,
        },
      });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("Loyalty config error:", error);
    return NextResponse.json(
      { error: "Failed to update loyalty configuration" },
      { status: 500 }
    );
  }
}
