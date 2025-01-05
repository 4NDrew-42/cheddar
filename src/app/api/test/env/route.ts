import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import {
    RouteHandler,
    createApiResponse,
    createErrorResponse,
} from '../../../../types/api';

interface EnvStatus {
    name: string;
    status: 'loaded' | 'not_loaded';
    isRequired: boolean;
}

const REQUIRED_ENV_VARS = [
    'MONGODB_URI',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
] as const;

const OPTIONAL_ENV_VARS = [
    'NEXT_PUBLIC_VERCEL_URL'
] as const;

export const GET: RouteHandler = async (_request: NextRequest) => {
    try {
        // Check authentication
        const session = await getServerSession();
        if (!session?.user?.id) {
            return createErrorResponse('Unauthorized', undefined, 401);
        }

        const envStatus: EnvStatus[] = [
            ...REQUIRED_ENV_VARS.map(name => ({
                name,
                status: process.env[name] ? ('loaded' as const) : ('not_loaded' as const),
                isRequired: true
            })),
            ...OPTIONAL_ENV_VARS.map(name => ({
                name,
                status: process.env[name] ? ('loaded' as const) : ('not_loaded' as const),
                isRequired: false
            }))
        ];

        // Check if any required env vars are missing
        const missingRequired = envStatus.filter(
            env => env.isRequired && env.status === 'not_loaded'
        );

        if (missingRequired.length > 0) {
            return createErrorResponse(
                'Missing required environment variables',
                missingRequired.map(env => ({
                    code: 'ENV_MISSING',
                    message: `Required environment variable ${env.name} is not loaded`,
                    field: env.name
                })),
                500
            );
        }

        return createApiResponse({
            environment: process.env.NODE_ENV,
            variables: envStatus,
            summary: {
                total: envStatus.length,
                loaded: envStatus.filter(env => env.status === 'loaded').length,
                required: REQUIRED_ENV_VARS.length,
                optional: OPTIONAL_ENV_VARS.length
            }
        }, 'Environment check completed');

    } catch (error) {
        console.error('Environment check error:', error);
        return createErrorResponse(
            'Internal server error',
            [{
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred while checking environment variables'
            }],
            500
        );
    }
};