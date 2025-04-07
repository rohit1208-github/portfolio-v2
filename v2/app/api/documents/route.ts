// app/api/documents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processDocument } from '@/lib/langchain';

export async function POST(req: NextRequest) {
  // Check API key for document uploads (only for you to update docs)
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.DOCUMENT_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' }, 
        { status: 400 }
      );
    }
    
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await processDocument(buffer, file.name);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in documents route:', error);
    return NextResponse.json(
      { error: 'Failed to process document' }, 
      { status: 500 }
    );
  }
} 