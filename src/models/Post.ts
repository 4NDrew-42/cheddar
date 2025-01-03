import mongoose from 'mongoose';

export interface Post extends mongoose.Document {
	_id: string;
	userId: mongoose.Schema.Types.ObjectId;
	title: string;
	copy: string;
	mediaUrl: string;
	mediaType: string;
	platform: string[];
	date: Date;
	status: string;
}

const PostSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: { type: String, required: true },
	copy: { type: String, default: '' },
	mediaUrl: { type: String, default: '' },
	mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
	platform: { type: [String], default: [] },
	date: { type: Date, default: Date.now },
	status: { type: String, enum: ['Draft', 'Scheduled', 'Published'], default: 'Draft' },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
