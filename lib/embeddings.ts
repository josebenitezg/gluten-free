import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('Missing SUPABASE_URL');
if (!process.env.NEXT_PUBLIC_SUPABASE_KEY) throw new Error('Missing SUPABASE_SERVICE_KEY');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

interface Document {
  id: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

export async function getMatchingDocuments(query: string): Promise<Document[]> {
  try {
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: query.replace(/\n/g, ' '),
      encoding_format: "float",
    });

    const { data: documents, error } = await supabaseClient.rpc('match_documents', {
      query_embedding: embedding.data[0].embedding,
      filter: {}
    });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return (documents as Document[]).slice(0, 5);
  } catch (error) {
    console.error('Error getting matching documents:', error);
    return [];
  }
} 