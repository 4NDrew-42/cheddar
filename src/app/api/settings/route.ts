import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { userSettingsSchema, type UserSettings } from '@/types/settings';
import UserModel, { IUser } from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const defaultSettings: UserSettings = {
      profile: {
        name: session.user.name || '',
        email: session.user.email,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: 'en',
      },
      notifications: {
        email: true,
        push: false,
        digest: 'daily',
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

    return NextResponse.json({
      settings: user.settings || defaultSettings,
    });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedSettings = userSettingsSchema.partial().parse(body);

    const user = await UserModel.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Merge existing settings with new settings
    user.settings = {
      ...user.settings || {},
      ...validatedSettings,
    };

    await user.save();

    return NextResponse.json({ settings: user.settings });
  } catch (error: unknown) {
    console.error('Failed to update settings:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid settings data', details: (error as any).errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}