import { Schema, model } from "mongoose";

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  propertyType: {
    type: String,
    enum: {
      values: ['house', 'apartment', 'studio'],
      message: '{VALUE} is not a valid property type'
    },
    required: [true, 'Property type is required']
  },
  bedroom: {
    type: String,
    required: [true, 'Number of bedrooms is required']
  },
  bathroom: {
    type: String,
    required: [true, 'Number of bathrooms is required']
  },
  location: {
    streetAddress: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    zipcode: {
      type: String,
      required: [true, 'Zipcode is required'],
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true
    }
  },
  utilitiesIncludedInRent: {
    type: Boolean,
    required: [true, 'Please specify if utilities are included in rent']
  },
  utilities: [{
    type: String,
    enum: {
      values: ['water', 'electricity', 'gas', 'internet', 'trash'],
      message: '{VALUE} is not a valid utility'
    }
  }],
  amenities: [{
    type: String,
    enum: {
      values: ['parking', 'gym', 'pool', 'laundry'],
      message: '{VALUE} is not a valid amenity'
    }
  }],
  preferences: [{
    type: String,
    enum: {
      values: ['no_smoking', 'no_drinking', 'no_pets', 'students_only', 'working_only', 'vegetarian', 'eggeterian', 'girls_only', 'cleanliness'],
      message: '{VALUE} is not a valid preference'
    }
  }],
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  currency: {
    type: String,
    enum: {
      values: ['usd', 'inr'],
      message: '{VALUE} is not a supported currency'
    },
    required: [true, 'Currency is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  timePeriod: {
    type: String,
    enum: {
      values: ['day', 'week', 'month'],
      message: '{VALUE} is not a valid time period'
    },
    required: [true, 'Time period is required']
  },
  dailyRate: {
    type: Number,
    required: [true, 'Daily rate is required'],
    min: [0, 'Daily rate cannot be negative']
  },
  subleaseDuration: {
    from: { 
      type: Date, 
      required: [true, 'Start date is required']
    },
    to: { 
      type: Date, 
      required: [true, 'End date is required']
    }
  },
  numberOfDays: { 
    type: Number, 
    required: [true, 'Number of days is required'],
    min: [1, 'Number of days must be at least 1']
  },
  images: {
    type: [{
      type: String,
      required: [true, 'Image URL is required']
    }],
    validate: {
      validator: function(v : String[]) {
        return v.length > 0;
      },
      message: 'At least one image is required'
    }
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User reference is required']
  }
}, { timestamps: true });

interface DurationType{
  from : Date
  to : Date
}

listingSchema.path('subleaseDuration')?.validate(function(value: DurationType) {
  return value.from < value.to;
}, 'End date must be after start date');

export const Listing = model('Listing', listingSchema);


