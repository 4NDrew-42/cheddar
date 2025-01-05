import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'medium',
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export interface ITask extends mongoose.Document {
	title: string;
	description: string;
	dueDate: Date;
	priority: 'low' | 'medium' | 'high';
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;
