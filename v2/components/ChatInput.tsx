// components/ChatInput.tsx
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input);
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-notion-gray/10 p-4 bg-white">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about my experience, skills, or background..."
          className="flex-1 p-3 border border-notion-gray/20 rounded-lg bg-white text-notion-dark placeholder:text-notion-gray/60 focus:outline-none focus:ring-1 focus:ring-notion-dark focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-notion-dark text-white px-5 py-3 rounded-lg disabled:opacity-50 hover:bg-notion-dark/90 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
}