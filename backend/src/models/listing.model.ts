import {Schema, model} from "mongoose";


const listingSchema = new Schema({
    title: { type: String, required: true },
    location: {
      streetAddress: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, required: true }
    },
    utilities: [String],
    amenities: [String],
    preferences: [String],
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    subleaseDuration: { type: String, required: true },
    images: [{
      type: String,
    }],
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, {timestamps : true})


export const Listing = model("Listing", listingSchema);