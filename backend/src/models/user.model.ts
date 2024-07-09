import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

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
    },
    accessToken: {
      type: String
    },
    refreshToken: {
      type: String
    }
  }, {timestamps : true})


userSchema.pre("save", async function(next) {
  if (this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 4);
      next();
  }
  return next();
});

userSchema.methods.isPasswordCorrect = async function(password: string){
    return await bcrypt.compare(password, this.password);
};

export const User = model("User", userSchema);