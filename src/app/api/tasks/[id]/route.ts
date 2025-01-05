import { NextResponse } from 'next/server';
import { TaskModel } from '@models/Task';
import { taskQueue } from '@lib/queue';

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const task = await TaskModel.findById(params.id);

		if (!task) {
			return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
		}

		// Get job status from queue
		const job = await taskQueue.getJob(params.id);
		const queueStatus = await job?.getState();

		return NextResponse.json(
			{
				success: true,
				task: task.toObject(),
				queueStatus,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}
