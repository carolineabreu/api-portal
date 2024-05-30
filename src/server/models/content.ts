import mongoose, { Document, Model, Schema } from 'mongoose';

interface IContent extends Document {
  api_name: string;
  api_description: string;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: Date;
}

const contentSchema: Schema = new Schema({
  api_name: { type: String, required: true },
  api_description: { type: String, required: true },
  status: { type: String, required: true, enum: ['ACTIVE', 'INACTIVE'] },
  created_at: { type: Date, default: Date.now },
});

const Content: Model<IContent> = mongoose.models.API || mongoose.model<IContent>('API', contentSchema);

export default Content;