import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  attachments: [{
    url: String,
    filename: String,
    mimeType: String
  }]
}, { timestamps: true });

messageSchema.index({ sender: 1, timestamp: -1 });

export const Message = model("Message", messageSchema);