import { cookies } from 'next/headers';
import { Chat } from '@/components/Chat';
import { generateUUID } from '@/lib/utils';

export default async function ChatPage() {
  const id = generateUUID();

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      selectedModelId="gpt-4o"
      selectedVisibilityType="private"
      isReadonly={false}
    />
  );
} 