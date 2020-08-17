import { model, Schema, Document } from 'mongoose';

interface Preference extends Document {
  category: string;
  subcategories: string[];
}

const PreferenceSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        type: String,
      },
    ],
    deleted_at: Date,
  },
  {
    timestamps: true,
  },
);

export default model<Preference>('Preference', PreferenceSchema);
