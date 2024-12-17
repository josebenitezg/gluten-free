import {
  type Message,
  convertToCoreMessages,
  createDataStreamResponse,
  streamText,
} from 'ai';
import { customModel } from '@/lib/ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages }: { messages: Array<Message> } = await req.json();

  const coreMessages = convertToCoreMessages(messages);

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: customModel('gpt-4'),
        system: `You are Celia, an expert assistant for Paraguay Sin Gluten, a platform that helps people find gluten-free places in Paraguay. 
        You are knowledgeable about celiac disease, gluten-free diets, and restaurants/stores in Paraguay that offer gluten-free options. 
        Be friendly, helpful, and provide accurate information about gluten-free options in Paraguay.
        Respond in Spanish unless specifically asked to use another language.`,
        messages: coreMessages,
        maxSteps: 5,
      });

      result.mergeIntoDataStream(dataStream);
    },
  });
}