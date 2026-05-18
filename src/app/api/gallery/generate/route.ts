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
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { style, category, description } = await request.json();

    const prompt = `Professional salon photography of a beautiful Black person with ${style}. ${description || ""} Studio lighting, high-end salon setting, elegant and luxurious atmosphere. The hairstyle should be the focal point, showing intricate detail and craftsmanship. Premium beauty photography aesthetic.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
    });

    const imageUrl = response.data[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    // Save to gallery
    const galleryImage = await prisma.galleryImage.create({
      data: {
        title: style,
        description: description || null,
        imageUrl,
        category: category || "General",
        tags: [style.toLowerCase(), category?.toLowerCase()].filter(Boolean),
        aiGenerated: true,
      },
    });

    return NextResponse.json(galleryImage, { status: 201 });
  } catch (error) {
    console.error("Gallery generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate gallery image" },
      { status: 500 }
    );
  }
}
