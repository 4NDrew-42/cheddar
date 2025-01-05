import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
	const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cheddar';

	try {
		await mongoose.connect(mongoUri);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
}

export async function disconnectFromDatabase(): Promise<void> {
	await mongoose.disconnect();
	console.log('Disconnected from MongoDB');
}
