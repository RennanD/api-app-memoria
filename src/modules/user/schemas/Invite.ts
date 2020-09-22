import { model, Schema, Document } from 'mongoose';

interface Invite extends Document {
  guestId: string;
  ownerInviteId: string;
}

const InviteSchema = new Schema(
  {
    guestId: {
      type: String,
      required: true,
    },
    ownerInviteId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<Invite>('Invite', InviteSchema);
