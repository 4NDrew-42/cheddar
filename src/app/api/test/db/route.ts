import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongo';
import mongoose from 'mongoose';

// Optional: create a minimal schema if you don't already have one
const TestSchema = new mongoose.Schema({
	message: String,
	createdAt: { type: Date, default: Date.now },
});

// This ensures we don't redefine the model multiple times
const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema);

export async function GET() {
	try {
		await dbConnect();
		// Create a test document
		const doc = await TestModel.create({ message: 'Hello from DB test' });
		// Query all documents
		const allDocs = await TestModel.find({});
		
		return NextResponse.json({
			success: true,
			created: doc,
			allDocs,
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('DB Test Error:', errorMessage);
		return NextResponse.json(
			{ success: false, error: errorMessage },
			{ status: 500 }
		);
	}
}