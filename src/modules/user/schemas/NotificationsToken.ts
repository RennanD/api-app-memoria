import { model, Schema, Document } from 'mongoose';

interface NotificationToken extends Document {
  user_id: string;
  token: string;
}

const NotificationTokenSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<NotificationToken>(
  'NotificationToken',
  NotificationTokenSchema,
);
