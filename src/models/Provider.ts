import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		config: {
			type: Object,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export interface IProvider extends mongoose.Document {
	name: string;
	type: string;
	config: object;
	createdAt: Date;
	updatedAt: Date;
}

const Provider = mongoose.model<IProvider>('Provider', ProviderSchema);
export default Provider;
