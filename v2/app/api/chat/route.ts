import { NextRequest, NextResponse } from 'next/server';
import { queryDocuments } from '@/lib/langchain';
import { generateResponse } from '@/lib/gemini';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    
    // Get relevant documents from Supabase
    const documents = await queryDocuments(message);
    const context = documents.map(doc => doc.pageContent);
    
    // Generate response using Gemini
    const response = await generateResponse(
      message, 
      context, 
      history
    );
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' }, 
      { status: 500 }
    );
  }
} 