import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { GET, PATCH } from './route';
import UserModel from '@/models/User';
import { userSettingsSchema } from '@/types/settings';

// Mock next-auth
jest.mock('next-auth');
const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>;

// Mock User model
jest.mock('@/models/User', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
  },
}));

describe('Settings API', () => {
  const mockSession = {
    user: {
      email: 'test@example.com',
      name: 'Test User',
    },
  };

  const mockUser = {
    email: 'test@example.com',
    settings: {
      profile: {
        name: 'Test User',
        email: 'test@example.com',
        timezone: 'America/New_York',
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
        theme: 'light',
        density: 'comfortable',
        timezone: 'America/New_York',
      },
      platforms: {},
    },
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetServerSession.mockResolvedValue(mockSession);
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
  });

  describe('GET /api/settings', () => {
    it('should return user settings when authenticated', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.settings).toEqual(mockUser.settings);
      expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockSession.user.email });
    });

    it('should return 401 when not authenticated', async () => {
      mockGetServerSession.mockResolvedValueOnce(null);
      const response = await GET();

      expect(response.status).toBe(401);
      expect(await response.json()).toEqual({ error: 'Unauthorized' });
    });

    it('should return 404 when user not found', async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValueOnce(null);
      const response = await GET();

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: 'User not found' });
    });
  });

  describe('PATCH /api/settings', () => {
    const mockRequest = (body: any) =>
      new NextRequest('http://localhost/api/settings', {
        method: 'PATCH',
        body: JSON.stringify(body),
      });

    it('should update user settings when valid data provided', async () => {
      const newSettings = {
        profile: {
          name: 'Updated Name',
          language: 'es',
        },
      };

      const response = await PATCH(mockRequest(newSettings));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(mockUser.save).toHaveBeenCalled();
      expect(data.settings).toMatchObject({
        ...mockUser.settings,
        ...newSettings,
      });
    });

    it('should return 401 when not authenticated', async () => {
      mockGetServerSession.mockResolvedValueOnce(null);
      const response = await PATCH(mockRequest({}));

      expect(response.status).toBe(401);
      expect(await response.json()).toEqual({ error: 'Unauthorized' });
    });

    it('should return 400 when invalid data provided', async () => {
      const invalidSettings = {
        profile: {
          email: 'invalid-email',
        },
      };

      const response = await PATCH(mockRequest(invalidSettings));
      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid settings data');
    });

    it('should validate settings against schema', async () => {
      const validSettings = {
        appearance: {
          theme: 'dark',
          density: 'compact',
          timezone: 'UTC',
        },
      };

      const parsed = userSettingsSchema.partial().parse(validSettings);
      expect(parsed).toEqual(validSettings);
    });
  });
});