import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const steps = [
  {
    step : 1,
    stepDesc : "Step 1",
  },
  {
    step : 2,
    stepDesc : "Step 2",
  },
  { 
    step: 3,
    stepDesc : "Step 3",
  }]

export const listingPropertySteps = [
    {
      step : 1,
      stepDesc : "Property Details",
    },
    {
      step : 2,
      stepDesc : "Additional Information",
    },
    { 
      step: 3,
      stepDesc : "Select Preference",
    },{
      step : 4,
      stepDesc : "Upload Image",
    }]