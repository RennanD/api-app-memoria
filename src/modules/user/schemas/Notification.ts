import { model, Schema, Document } from 'mongoose';

interface Notification extends Document {
  important_date_id: string;
  description: string;
  read: boolean;
  user_id: string;
}

const NotificationSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    important_date_id: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<Notification>('Notification', NotificationSchema);
