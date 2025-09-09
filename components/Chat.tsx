"use client";

import { useChat } from "@ai-sdk/react";
import { WheatOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SuggestedActions } from "@/components/suggested-actions";
import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
import { useEffect, useRef, useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputButton,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { Response as AIResponse } from "@/components/ai-elements/response";

interface ChatProps {
  id: string;
  initialMessages: {
    id: string;
    content: string;
    role: "user" | "assistant";
  }[];
  selectedModelId: string;
  selectedVisibilityType: "private" | "public";
  isReadonly: boolean;
}

export function Chat({ id, initialMessages, selectedModelId }: ChatProps) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    id,
    messages: initialMessages as any,
  });
  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Header */}
      <header className="glass-navbar py-3 px-4 md:py-4 md:px-6 flex-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
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
      <div className="flex-1 overflow-hidden">
        <div className="max-w-3xl mx-auto h-full flex min-h-0">
          <Conversation>
            {messages.length === 0 ? (
              <ConversationEmptyState
                description="Empieza una conversación para ver mensajes aquí"
                title="Sin mensajes aún"
              >
                <SuggestedActions
                  chatId={id}
                  append={(text) => {
                    if (!text.trim()) return;
                    sendMessage({ text });
                  }}
                />
              </ConversationEmptyState>
            ) : (
              <ConversationContent className="space-y-2">
                {messages.map((m: any, idx: number) => (
                  <Message from={m.role} key={idx}>
                    <MessageAvatar
                      name={m.role === "user" ? "Tú" : "Celia"}
                      src={
                        m.role === "user"
                          ? "/favicon-32x32.png"
                          : "/gluten-free-icon.svg"
                      }
                    />
                    <MessageContent>
                      {Array.isArray(m.parts) ? (
                        <>
                          {m.parts.map((part: any, index: number) => {
                            if (part.type === "text") {
                              return <AIResponse key={index}>{part.text}</AIResponse>;
                            }

                            if (part.type === "tool-displayLocation") {
                              if (part.state === "input-available" || part.state === "input-streaming") {
                                return (
                                  <div key={index} className="w-full mt-2">
                                    <LocationCardSkeleton />
                                  </div>
                                );
                              }
                              if (part.state === "output-available") {
                                return (
                                  <div key={index} className="w-full mt-2">
                                    <LocationCard location={part.output} />
                                  </div>
                                );
                              }
                              if (part.state === "output-error") {
                                return (
                                  <div key={index} className="w-full mt-2 text-sm text-red-600">
                                    {part.errorText || "Error al ejecutar la herramienta."}
                                  </div>
                                );
                              }
                            }

                            return null;
                          })}
                        </>
                      ) : (
                        <AIResponse>{m.content}</AIResponse>
                      )}
                    </MessageContent>
                    {m.toolInvocations?.map((toolInvocation: any) => {
                      const { toolName, toolCallId, state } = toolInvocation;
                      if (state === "result") {
                        if (toolName === "displayLocation") {
                          const { result } = toolInvocation as any;
                          return (
                            <div key={toolCallId} className="w-full mt-2">
                              <LocationCard location={result} />
                            </div>
                          );
                        }
                      } else {
                        return (
                          <div key={toolCallId} className="w-full">
                            {toolName === "displayLocation" ? (
                              <LocationCardSkeleton />
                            ) : null}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </Message>
                ))}
                <ConversationScrollButton />
                <div ref={messagesEndRef} />
              </ConversationContent>
            )}
          </Conversation>
        </div>
      </div>

      {/* Input Form - Fixed at bottom */}
      <div className="glass-navbar p-3 md:p-4 flex-none">
        <PromptInput
          className="max-w-3xl mx-auto"
          onSubmit={(message) => {
            if (!message.text?.trim()) return;
            sendMessage({ text: message.text });
            setInput("");
          }}
        >
          <PromptInputToolbar>
            <div className="flex items-center gap-2">
              <PromptInputButton aria-label="Marca" variant="ghost">
                <WheatOff className="w-4 h-4" />
              </PromptInputButton>
            </div>
            <PromptInputSubmit status={status} />
          </PromptInputToolbar>
          <PromptInputBody>
            <PromptInputTextarea
              placeholder="Pregúntale a Celia"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== "ready"}
              rows={1}
            />
          </PromptInputBody>
        </PromptInput>
      </div>
    </div>
  );
} 