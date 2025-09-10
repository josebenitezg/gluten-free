import { Chat } from '@/components/Chat';
import { generateUUID } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/utils/supabase/server';

export default async function ChatPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect('/login');
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