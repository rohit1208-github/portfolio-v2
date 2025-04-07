// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

// Create the vector store
export async function createVectorStore() {
  const { error } = await supabase.rpc('create_vector_store', {
    name: 'document_embeddings'
  });
  
  if (error) console.error('Error creating vector store:', error);
}