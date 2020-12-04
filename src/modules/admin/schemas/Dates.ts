import { model, Schema, Document } from 'mongoose';

interface Date extends Document {
  title: string;
}

const DateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<Date>('Date', DateSchema);
