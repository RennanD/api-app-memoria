import { model, Schema, Document } from 'mongoose';

interface Reminder extends Document {
  user_id: string;
  date: string;
  title: string;
  important_date_id: string;
  reminderDate: Date;
  parsed_date: string;
  notification_message: string;
}

const ReminderSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    important_date_id: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    reminderDate: {
      required: true,
      type: Date,
    },
    date: {
      type: String,
      required: true,
    },
    parsed_date: {
      type: String,
      required: true,
    },
    notification_message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<Reminder>('Reminder', ReminderSchema);
