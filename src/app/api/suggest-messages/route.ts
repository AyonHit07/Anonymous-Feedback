import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // const prompt = ""
        const { messages } = await req.json();

        const result = streamText({
            model: openai('gpt-4o'),
            messages,
            // prompt,
        });

        return result.toDataStreamResponse();
    } catch (error) {
        console.log("Error in setting up AI connnection: ", error)
        return Response.json({
            success: false,
            message: "AI chat configuration error"
        }, { status: 403 })
    }
}