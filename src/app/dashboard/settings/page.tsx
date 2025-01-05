import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { fetchSettings } from '@/lib/api/settings';
import { UserSettings } from '@/types/settings';

function SettingsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function SettingsContent() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const defaultSettings: UserSettings = {
    profile: {
      name: session.user.name ?? '',
      email: session.user.email ?? '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',
    },
    notifications: {
      email: true,
      push: false,
      digest: 'daily' as const,
      types: {
        posts: true,
        mentions: true,
        analytics: false,
      },
    },
    appearance: {
      theme: 'system',
      density: 'comfortable',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    platforms: {},
  };

  const initialSettings = await fetchSettings().catch(() => defaultSettings);

  return <SettingsLayout initialData={initialSettings} />;
}

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="mt-6">
        <Suspense fallback={<SettingsLoading />}>
          <SettingsContent />
        </Suspense>
      </div>
    </div>
  );
}