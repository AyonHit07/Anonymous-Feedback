import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(_req: Request) {
  try {
    const prompt =
      "Generate a fresh and creative list of three open-ended questions formatted as a single string, with each question separated by '||'. The primary goal is to produce a novel set of questions each time this prompt is used to spark unique conversations on an anonymous social platform like Qooh.me. Avoid overly common or repetitive questions (e.g., 'What's your favorite movie?', 'What's your dream job?'). Instead, focus on imaginative, universal themes that encourage reflection and friendly interaction. For structure, your output should resemble: 'If you could have any scent as a candle, what would you choose?||What's a small, everyday thing that feels like magic?||What's a skill you've always admired in others?'.";

    // The entire streaming logic is now a single, unified function call
    const result = await streamText({
      model: google('gemini-1.5-flash'), // Simple model declaration
      prompt: prompt,
    });

    // Return the stream directly using the built-in helper
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new NextResponse('An internal server error occurred', { status: 500 });
  }
}