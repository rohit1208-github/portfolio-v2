// components/ChatInterface.tsx
'use client';

import { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSendMessage(message: string) {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: message,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: messages,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }
      
      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { role: 'model', content: data.response },
      ]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'model', 
          content: 'Sorry, something went wrong. Please try again.' 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-notion-gray/10">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}