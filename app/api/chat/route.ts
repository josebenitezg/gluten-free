import {
  type Message,
  convertToCoreMessages,
  createDataStreamResponse,
  streamText,
} from 'ai';
import { customModel } from '@/lib/ai';
import { getMatchingDocuments } from '@/lib/embeddings';
import { tools } from '@/lib/ai/tools';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages }: { messages: Array<Message> } = await req.json();
  const coreMessages = convertToCoreMessages(messages);
  
  const latestMessage = coreMessages[coreMessages.length - 1];
  let context = '';

  if (latestMessage.role === 'user' && typeof latestMessage.content === 'string') {
    const documents = await getMatchingDocuments(latestMessage.content);
    context = documents.map(doc => doc.content).join('\n\n');
  }

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: customModel('gpt-4o'),
        system: `You are Celia, an expert assistant for Paraguay Sin Gluten, a platform that helps people find gluten-free places in Paraguay. 
        You are knowledgeable about celiac disease, gluten-free diets, and restaurants/stores in Paraguay that offer gluten-free options. 
        
        When mentioning a specific location, ALWAYS use the displayLocation tool to show its information in a visual card.
        
        Use the following context to help answer the question. If the context doesn't contain relevant information, use your general knowledge:
        The context is a list of foods, beverages and products that are gluten-free. 
        Also include locations of stores and restaurants that sell gluten-free products.

        Context: ${context}
        
        Be friendly, helpful, and provide accurate information about gluten-free options in Paraguay.
        Respond in Spanish unless specifically asked to use another language.`,
        messages: coreMessages,
        maxSteps: 5,
        tools,
      });

      result.mergeIntoDataStream(dataStream);
    },
  });
}