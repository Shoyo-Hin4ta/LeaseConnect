import {Schema, model} from "mongoose";


const chatSchema = new Schema({
    participants: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }],
    messages: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'Message'
    }],
    relatedListing: { type: Schema.Types.ObjectId, ref: 'Listing' },
    lastMessage: {
      content: String,
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      timestamp: Date
    }
  }, { timestamps: true });
  
chatSchema.index({ participants: 1, updatedAt: -1 });
chatSchema.index({ relatedListing: 1 });

chatSchema.path('participants').validate(function(value) {
    return value.length >= 2;
}, 'A chat must have at least two participants');

chatSchema.virtual('populatedLastMessage', {
    ref: 'Message',
    localField: 'messages',
    foreignField: '_id',
    justOne: true,
    options: { sort: { timestamp: -1 } }
});

export const Chat = model("Chat", chatSchema);