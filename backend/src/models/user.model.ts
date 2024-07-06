import {Schema, model} from "mongoose";


const userSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    gender: { 
        type: String 
    },
    phone: { 
        type: String, 
        required: true 
    },
    profileImage: {
      type: String,
      required: true
    },
    address: {
      city: { 
        type: String 
        },
      state: { 
        type: String 
        },
      country: { 
        type: String 
        },
      postcode: { 
        type: String 
        }
    }
  })


export const User = model("User", userSchema);