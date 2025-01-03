'use client';

import { useChat } from 'ai/react';
import { WheatOff, SendHorizontal, Loader2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SparklesIcon } from '@/components/icons';
import { SuggestedActions } from '@/components/suggested-actions';
import ReactMarkdown from 'react-markdown';

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
                  <ReactMarkdown
                    className={`prose ${
                      message.role === 'user'
                        ? 'prose-invert'
                        : 'prose-gray dark:prose-invert'
                    } max-w-none prose-p:leading-normal prose-pre:p-0`}
                    components={{
                      p: ({ children }) => <p className="m-0">{children}</p>,
                      a: ({ href, children }) => {
                        const formattedHref = href?.startsWith('wa.me') ? `https://${href}` : href;
                        
                        return (
                          <a
                            href={formattedHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`underline ${
                              message.role === 'user'
                                ? 'text-white'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            {children}
                          </a>
                        );
                      },
                      ul: ({ children }) => (
                        <ul className="list-disc pl-4 my-2">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-4 my-2">{children}</ol>
                      ),
                      li: ({ children }) => <li className="my-0">{children}</li>,
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
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
          className="max-w-3xl mx-auto relative"
        >
          <div className="relative flex items-center bg-gray-800/70 rounded-2xl">
            <div className="absolute left-3">
              <div className="p-1.5 bg-gray-700/50 rounded-lg">
                <WheatOff className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Pregúntale a Celia"
              className="w-full bg-transparent text-gray-200 placeholder:text-gray-400 px-12 py-3 resize-none focus:outline-none"
              disabled={isLoading}
              rows={1}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2 rounded-lg bg-[#00F879] text-gray-900 hover:bg-[#00F879]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <SendHorizontal className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 