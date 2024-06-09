import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const steps = [
  {
    step : 1
  },
  {
    step : 2
  },
  { 
    step: 3
  }]
