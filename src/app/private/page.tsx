import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

function ObjectViewer({ data }: { data: Record<string, any> }) {
  return (
    <div className="p-4 bg-gray-100 rounded shadow text-sm">
      <ul className="space-y-1" style={{ listStyleType: 'square', color: 'blue', paddingLeft: '20px' }}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="flex">
            <span className="font-medium w-32">{key} : </span>
            <span className="break-all">{JSON.stringify(value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <ObjectViewer data={data.user} />;
}
