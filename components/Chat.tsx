"use client";

import { useChat } from "@ai-sdk/react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import type { UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { SuggestedActions } from "@/components/suggested-actions";
import { LocationCard } from "@/components/LocationCard";
import { LocationCardSkeleton } from "@/components/LocationCardSkeleton";
// (removed duplicate react imports)
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageAvatar, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
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
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: UserResponse) => {
      const meta = (data.user?.user_metadata as Record<string, unknown> | undefined) || {};
      const picture = (meta["avatar_url"] as string | undefined) || (meta["picture"] as string | undefined);
      const fullName = (meta["full_name"] as string | undefined) || data.user?.email || undefined;
      setUserAvatar(picture);
      setUserName(fullName);
    });
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Chat Messages */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {/* Back button moved to global header */}
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
              <ConversationContent className="space-y-2 pb-28 md:pb-32">
                {messages.map((m: any, idx: number) => (
                  <Message from={m.role} key={m.id ?? idx}>
                    <MessageAvatar
                      name={m.role === "user" ? (userName || "Tú") : "Celia"}
                      src={m.role === "user" ? (userAvatar || "/favicon-32x32.png") : "/gluten-free-icon.svg"}
                    />
                    <MessageContent>
                      {Array.isArray(m.parts) ? (
                        <>
                          {m.parts.map((part: any, index: number) => {
                            if (part.type === "text") {
                              return (
                                <AIResponse key={part.id ?? `${index}-text`}>
                                  {part.text}
                                </AIResponse>
                              );
                            }

                            if (part.type === "tool-displayLocation") {
                              if (part.state === "input-available" || part.state === "input-streaming") {
                                return (
                                  <div key={part.id ?? `${index}-tool-loading`} className="w-full mt-2">
                                    <LocationCardSkeleton />
                                  </div>
                                );
                              }
                              if (part.state === "output-available") {
                                return (
                                  <div key={part.id ?? `${index}-tool-output`} className="w-full mt-2">
                                    <LocationCard location={part.output} />
                                  </div>
                                );
                              }
                              if (part.state === "output-error") {
                                return (
                                  <div key={part.id ?? `${index}-tool-error`} className="w-full mt-2 text-sm text-red-600">
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
      <div className="fixed inset-x-0 bottom-0 z-50 p-3 md:p-4 glass-effect border-t pb-[env(safe-area-inset-bottom)]">
        <PromptInput
          className="max-w-3xl mx-auto mt-2"
          onSubmit={(message) => {
            if (!message.text?.trim()) return;
            sendMessage({ text: message.text });
            setInput("");
          }}
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => (
                <PromptInputAttachment data={attachment} />
              )}
            </PromptInputAttachments>
            <PromptInputTextarea
              placeholder="Pregúntale a Celia"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={status !== "ready"}
              rows={1}
            />
          </PromptInputBody>
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger />
                <PromptInputActionMenuContent>
                  <PromptInputActionAddAttachments />
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
            </PromptInputTools>
            <PromptInputSubmit status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
} 