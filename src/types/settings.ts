import { z } from 'zod';

export interface UserSettings {
    profile: {
        name: string;
        email: string;
        avatar?: string;
        timezone: string;
        language: string;
    };
    notifications: {
        email: boolean;
        push: boolean;
        digest: 'daily' | 'weekly' | 'none';
        types: {
            posts: boolean;
            mentions: boolean;
            analytics: boolean;
        };
    };
    platforms: {
        [key: string]: {
            connected: boolean;
            username?: string;
            lastSync?: Date;
            preferences: {
                autoPost: boolean;
                requireApproval: boolean;
            };
        };
    };
    appearance: {
        theme: 'light' | 'dark' | 'system';
        density: 'comfortable' | 'compact';
        timezone: string;
    };
}

export interface SettingsFormProps {
    section: 'profile' | 'notifications' | 'platforms' | 'appearance';
    initialData: Partial<UserSettings>;
    onUpdate: (data: Partial<UserSettings>) => Promise<void>;
}

// Zod schemas for validation
export const profileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    avatar: z.string().optional(),
    timezone: z.string(),
    language: z.string()
});

export const notificationSchema = z.object({
    email: z.boolean(),
    push: z.boolean(),
    digest: z.enum(['daily', 'weekly', 'none']),
    types: z.object({
        posts: z.boolean(),
        mentions: z.boolean(),
        analytics: z.boolean()
    })
});

export const platformPreferencesSchema = z.object({
    autoPost: z.boolean(),
    requireApproval: z.boolean()
});

export const platformSchema = z.record(z.object({
    connected: z.boolean(),
    username: z.string().optional(),
    lastSync: z.date().optional(),
    preferences: platformPreferencesSchema
}));

export const appearanceSchema = z.object({
    theme: z.enum(['light', 'dark', 'system']),
    density: z.enum(['comfortable', 'compact']),
    timezone: z.string()
});

export const userSettingsSchema = z.object({
    profile: profileSchema,
    notifications: notificationSchema,
    platforms: platformSchema,
    appearance: appearanceSchema
});