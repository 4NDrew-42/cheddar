import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '../../../../lib/mongo';
import {
    RouteHandler,
    createApiResponse,
    createErrorResponse,
} from '../../../../types/api';

// Define interface for test document
interface ITest {
    message: string;
    createdAt: Date;
}

// Create schema with proper typing
const TestSchema = new mongoose.Schema<ITest>({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// This ensures we don't redefine the model multiple times
const TestModel = mongoose.models.Test || mongoose.model<ITest>('Test', TestSchema);

export const GET: RouteHandler = async (_request: NextRequest) => {
    try {
        await dbConnect();

        // Create a test document
        const doc = await TestModel.create({ 
            message: 'Hello from DB test',
            createdAt: new Date()
        });

        // Query all documents
        const allDocs = await TestModel.find({}).sort({ createdAt: -1 });
        
        return createApiResponse({
            created: {
                id: doc._id.toString(),
                message: doc.message,
                createdAt: doc.createdAt
            },
            allDocs: allDocs.map(d => ({
                id: d._id.toString(),
                message: d.message,
                createdAt: d.createdAt
            }))
        }, 'Database connection test successful');
    } catch (error) {
        console.error('DB Test Error:', error);
        
        // Handle specific mongoose errors
        if (error instanceof mongoose.Error.MongooseServerSelectionError) {
            return createErrorResponse(
                'Database connection failed',
                [{
                    code: 'DB_CONNECTION_ERROR',
                    message: 'Could not connect to the database'
                }],
                503
            );
        }

        if (error instanceof mongoose.Error.ValidationError) {
            return createErrorResponse(
                'Database validation failed',
                [{
                    code: 'DB_VALIDATION_ERROR',
                    message: error.message
                }],
                400
            );
        }

        if (error instanceof Error) {
            return createErrorResponse(
                'Database operation failed',
                [{
                    code: 'DB_ERROR',
                    message: error.message
                }],
                500
            );
        }

        return createErrorResponse(
            'Internal server error',
            [{
                code: 'INTERNAL_ERROR',
                message: 'An unexpected error occurred while testing database connection'
            }],
            500
        );
    }
};