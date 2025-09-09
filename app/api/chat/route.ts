import { type UIMessage, convertToModelMessages, streamText, stepCountIs } from 'ai';
import { customModel } from '@/lib/ai';
import { getMatchingDocuments } from '@/lib/embeddings';
import { tools } from '@/lib/ai/tools';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages }: { messages: Array<UIMessage> } = await req.json();

  // Build simple RAG context from the latest user text parts
  const lastUser = [...messages].reverse().find(m => m.role === 'user');
  let context = '';
  if (lastUser) {
    const query = (lastUser.parts || [])
      .filter((p: any) => p.type === 'text')
      .map((p: any) => p.text)
      .join('\n');
    if (query) {
      const documents = await getMatchingDocuments(query);
      context = documents.map(doc => doc.content).join('\n\n');
    }
  }

  const result = await streamText({
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
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools,
  });

  return result.toUIMessageStreamResponse();
}