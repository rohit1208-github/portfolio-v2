// lib/langchain.ts
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabase';
import { Embeddings } from '@langchain/core/embeddings';
import { Document } from 'langchain/document';

// Configuration
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

// Create a custom embedding class using Google's Generative AI
class GoogleAIEmbeddings implements Embeddings {
  private model: GoogleGenerativeAI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  caller: any = undefined;
  
  constructor(apiKey: string) {
    this.model = new GoogleGenerativeAI(apiKey);
  }
  
  async embedQuery(text: string): Promise<number[]> {
    const embeddingModel = this.model.getGenerativeModel({ model: "embedding-001" });
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  }
  
  async embedDocuments(documents: string[]): Promise<number[][]> {
    const embeddings = [];
    for (const doc of documents) {
      const embedding = await this.embedQuery(doc);
      embeddings.push(embedding);
    }
    return embeddings;
  }
}

// Initialize Google AI Embeddings
const embeddings = new GoogleAIEmbeddings(process.env.GOOGLE_API_KEY!);

// Function to process a document
export async function processDocument(fileBuffer: Buffer, fileName: string) {
  let docs: Document[] = [];
  
  if (fileName.endsWith('.md')) {
    const textContent = fileBuffer.toString('utf-8');
    // Create document manually instead of using TextLoader
    docs = [
      new Document({
        pageContent: textContent,
        metadata: { source: fileName },
      }),
    ];
  } else {
    throw new Error('Unsupported file type');
  }

  // Split the document
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  
  const splitDocs = await textSplitter.splitDocuments(docs);
  
  // Create and store embeddings
  const vectorStore = await SupabaseVectorStore.fromDocuments(
    splitDocs,
    embeddings,
    {
      client: supabase,
      tableName: 'document_embeddings',
      queryName: 'match_documents',
    }
  );
  console.log('vectorStore :', vectorStore);
  
  return {
    documentId: fileName,
    chunkCount: splitDocs.length
  };
}

// Function to query documents
export async function queryDocuments(query: string) {
  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: 'document_embeddings',
    queryName: 'match_documents',
  });
  
  const results = await vectorStore.similaritySearch(query, 5);
  return results;
}