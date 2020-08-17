import { model, Schema, Document } from 'mongoose';

interface PersonPreference extends Document {
  person_id: string;
  category: string;
  subcategories: string[];
}

const PersonPreferenceSchema = new Schema(
  {
    person_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<PersonPreference>(
  'PersonPreference',
  PersonPreferenceSchema,
);
