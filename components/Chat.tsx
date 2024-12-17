'use client';

import { useChat } from 'ai/react';
import { WheatOff, SendHorizontal, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SparklesIcon } from '@/components/icons';
import { SuggestedActions } from '@/components/suggested-actions';

interface ChatProps {
  id: string;
  initialMessages: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
  }[];
  selectedModelId: string;
  selectedVisibilityType: 'private' | 'public';
  isReadonly: boolean;
}

export function Chat({
  id,
  initialMessages,
  selectedModelId,
}: ChatProps) {
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    id,
    initialMessages,
    body: {
      id,
      modelId: selectedModelId,
    },
  });

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Header */}
      <header className="glass-navbar py-3 px-4 md:py-4 md:px-6 flex-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold flex items-center text-[#00F879] dark:text-[#00F879]">
              <WheatOff className="mr-2 h-5 w-5 md:h-6 md:w-6" />
              Paraguay Sin Gluten
            </h1>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <SuggestedActions chatId={id} append={append} />
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-none w-6 h-6 rounded-full bg-[#00F879]/10 flex items-center justify-center">
                    <SparklesIcon size={14} className="text-[#00F879]" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-3 py-2 md:px-4 md:py-2 max-w-[85%] md:max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="flex-none w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="text-white text-xs">Tú</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input Form - Fixed at bottom */}
      <div className="glass-navbar p-3 md:p-4 flex-none">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex gap-2 md:gap-4"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Pregúntale a Celia sobre lugares sin gluten..."
            className="flex-1 rounded-lg px-3 py-2 md:px-4 md:py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F879] text-sm md:text-base"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg px-3 py-2 md:px-4 md:py-2 bg-[#00F879] text-gray-900 hover:bg-[#00F879]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <SendHorizontal className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 