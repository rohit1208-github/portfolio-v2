// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function generateResponse(
  query: string, 
  context: string[], 
  chatHistory: { role: 'user' | 'model', content: string }[]
) {
  // Format the context for the prompt
  const formattedContext = context.join('\n\n');
  
  // Convert chat history to Gemini format
  const formattedHistory = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  // Create the chat session
  const chat = model.startChat({
    history: formattedHistory,
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });

  // Generate the response with context
  const systemPrompt = `You are an AI assistant for a job candidate. Your purpose is to answer questions that hiring managers and recruiters might have about the candidate based on their resume and other professional documents. 
  Only answer questions based on the provided context. If you don't have enough information in the context, say so honestly.
  
  Here is the relevant information from the candidate's documents:
  ${formattedContext}`;
  
  const result = await chat.sendMessage(systemPrompt + "\n\nUser question: " + query);
  return result.response.text();
}