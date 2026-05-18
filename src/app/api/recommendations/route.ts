import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { hairType, faceShape, lifestyle, preferences } = await request.json();

    // Get user's booking history for personalization
    const pastBookings = await prisma.booking.findMany({
      where: { userId: (session.user as any).id, status: "COMPLETED" },
      include: { service: true },
      orderBy: { date: "desc" },
      take: 5,
    });

    const historyContext = pastBookings.length > 0
      ? `Previous styles: ${pastBookings.map((b) => b.service.name).join(", ")}`
      : "No previous booking history.";

    const prompt = `Based on the following client profile, recommend 3 hairstyles with brief descriptions:

Hair Type: ${hairType || "Not specified"}
Face Shape: ${faceShape || "Not specified"}
Lifestyle: ${lifestyle || "Not specified"}
Preferences: ${preferences || "Open to suggestions"}
${historyContext}

For each recommendation, provide:
1. Style name
2. Why it suits them (1 sentence)
3. Maintenance level (low/medium/high)
4. Estimated price range

Format as JSON array with keys: name, reason, maintenance, priceRange`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional hairstylist specializing in melanin-rich hair textures. Provide personalized style recommendations.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    
    // Try to parse JSON from the response
    let recommendations;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      recommendations = [
        {
          name: "Goddess Locs",
          reason: "A versatile protective style that suits most face shapes and lifestyles.",
          maintenance: "low",
          priceRange: "$120-$180",
        },
        {
          name: "Silk Press",
          reason: "Showcases your natural length with a sleek, polished finish.",
          maintenance: "medium",
          priceRange: "$75-$100",
        },
        {
          name: "Twist Out",
          reason: "Celebrates your natural texture with defined, bouncy curls.",
          maintenance: "medium",
          priceRange: "$55-$75",
        },
      ];
    }

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Recommendations error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
