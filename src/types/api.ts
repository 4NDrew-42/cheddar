import { NextRequest } from 'next/server';
import { IPost } from '../models/Post';

// Route Context Types
export type RouteContext<P extends Record<string, string> = {}> = {
  params: P;
  searchParams: { [key: string]: string | string[] | undefined };
};

// Route Handler Types
export type RouteHandler<
  P extends Record<string, string> = {},
  R = unknown
> = (
  request: NextRequest,
  context: RouteContext<P>
) => Promise<Response>;

// Post-specific Types
export type PostParams = {
  id: string;
};

export type PostInput = Omit<
  IPost,
  '_id' | 'id' | 'createdAt' | 'updatedAt' | 'userId'
>;

// API Response Types
export type ApiResponse<T> = {
  data?: T;
  message?: string;
  errors?: ApiError[];
};

// Error Types
export type ApiError = {
  code: string;
  message: string;
  field?: string;
};

// Validation Types
export type ValidationError = {
  field: string;
  message: string;
};

// Utility type for validating request body
export type ValidateBody<T> = (body: unknown) => {
  valid: boolean;
  data?: T;
  errors?: ValidationError[];
};

// Helper function to create typed responses
export const createApiResponse = <T>(
  data?: T,
  message?: string,
  status = 200
): Response => {
  return Response.json(
    { data, message, timestamp: new Date().toISOString() },
    { status }
  );
};

// Helper function to create error responses
export const createErrorResponse = (
  message: string,
  errors?: ApiError[],
  status = 400
): Response => {
  return Response.json(
    { message, errors, timestamp: new Date().toISOString() },
    { status }
  );
};

// Post validation function
export const validatePostInput: ValidateBody<PostInput> = (
  body: unknown
): { valid: boolean; data?: PostInput; errors?: ValidationError[] } => {
  const errors: ValidationError[] = [];
  const input = body as Partial<PostInput>;

  if (!input.title?.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (!input.content?.trim()) {
    errors.push({ field: 'content', message: 'Content is required' });
  }

  if (!input.date) {
    errors.push({ field: 'date', message: 'Date is required' });
  }

  if (!input.scheduledAt) {
    errors.push({ field: 'scheduledAt', message: 'Scheduled date is required' });
  }

  if (!input.timeZone?.trim()) {
    errors.push({ field: 'timeZone', message: 'Timezone is required' });
  }

  if (!input.platforms || !Array.isArray(input.platforms) || input.platforms.length === 0) {
    errors.push({ field: 'platforms', message: 'At least one platform is required' });
  } else {
    const validPlatforms = ['twitter', 'linkedin', 'facebook'];
    const invalidPlatforms = input.platforms.filter(
      (p) => !validPlatforms.includes(p)
    );
    if (invalidPlatforms.length > 0) {
      errors.push({
        field: 'platforms',
        message: `Invalid platforms: ${invalidPlatforms.join(', ')}`,
      });
    }
  }

  if (input.status && !['draft', 'scheduled', 'published', 'failed'].includes(input.status)) {
    errors.push({
      field: 'status',
      message: 'Invalid status value',
    });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, data: input as PostInput };
};