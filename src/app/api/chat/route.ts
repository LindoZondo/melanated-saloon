import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are the AI Beauty Assistant for MELANATED SALOON, a premium salon celebrating melanated beauty. You are warm, knowledgeable, and supportive.

Your expertise includes:
- Hair care for melanin-rich hair (4A-4C textures, locs, braids, natural styles)
- Product recommendations for textured hair
- Style suggestions based on face shape, lifestyle, and preferences
- Salon services information and booking guidance
- Scalp health and hair growth tips
- Color recommendations that complement melanin-rich skin tones

Personality:
- Warm and encouraging, like a trusted friend
- Use inclusive language celebrating Black beauty
- Occasionally use terms of endearment like "queen" or "sis"
- Be specific and actionable in recommendations
- If asked about booking, direct them to the booking page

Services available:
- Braids & Locs (box braids, goddess locs, loc retwist, faux locs)
- Cuts & Styling (precision cuts, silk press, roller sets)
- Color & Highlights (full color, highlights, balayage for dark hair)
- Natural Hair Care (twist outs, wash and go, deep conditioning)
- Scalp Treatments (hot oil, scalp detox, growth treatments)
- Special Occasions (bridal, prom, event styling)

Keep responses concise (2-3 sentences max) unless the user asks for detailed information.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10), // Keep last 10 messages for context
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const message = completion.choices[0]?.message?.content || 
      "I'm here to help with your beauty needs! What would you like to know?";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "I'm having a moment, queen. Try again in a sec! 💫" },
      { status: 200 }
    );
  }
}
