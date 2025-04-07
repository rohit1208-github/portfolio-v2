// components/MessageList.tsx
import { Message } from './ChatInterface';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-notion-gray/10 scrollbar-track-transparent">
      {messages.length === 0 ? (
        <div className="text-left text-notion-gray my-1">
          <p className="text-[16px] leading-normal">👋 Hello! I&apos;m a personal assistant.</p>
          {/* <p className="text-[16px] leading-normal">Ask me anything about my skills, experience, or qualifications.</p> */}
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-3 rounded-lg text-[15px] leading-relaxed ${message.role === 'user'
              ? 'bg-notion-dark text-white max-w-[85%]'
              : 'bg-notion-sidebar text-notion-dark max-w-[85%]'
              }`}
            >
              <div className="whitespace-pre-wrap text-left">
                {message.content}
              </div>
            </div>
          </div>
        ))
      )}
      {isLoading && (
        <div className="flex justify-start">
          <div className="p-3 rounded-lg bg-notion-sidebar max-w-[85%]">
            <div className="flex space-x-2 items-center h-6">
              <div className="w-2 h-2 bg-notion-dark/40 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-notion-dark/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-notion-dark/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}