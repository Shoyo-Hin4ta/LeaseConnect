import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const steps = [
  {
    step : 1,
    stepDesc : "Basic Information",
  },
  {
    step : 2,
    stepDesc : "Profile Image",
  },
  { 
    step: 3,
    stepDesc : "Your City",
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
      stepDesc : "Set Price and Date",
    },{
      step : 4,
      stepDesc : "Upload Images",
    }]