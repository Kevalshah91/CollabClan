import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    roomId: {
      type: String,
      require: true,
    },
    senderId: {
      type: String,
    },
    senderName: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// model
const Message = model('message', messageSchema); 

export default Message;