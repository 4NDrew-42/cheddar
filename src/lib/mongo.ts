// src/lib/mongo.ts
import mongoose, { Mongoose } from 'mongoose';

interface GlobalWithMongoose {
	mongoose: {
		conn: Mongoose | null;
		promise: Promise<Mongoose> | null;
	};
}

declare const global: GlobalWithMongoose;

let MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV === 'test') {
	// In test environment, use the memory server URI if available
	MONGODB_URI = process.env.MONGODB_TEST_URI;
}

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
	// If we're already connected, return the Mongoose instance
	if (mongoose.connection.readyState === 1) {
		return mongoose;
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
			return mongoose;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
