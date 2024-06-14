import RegisterForm from "@/components/Register/RegisterForm"
import RegisterForm2 from "@/components/Register/RegisterForm2"
import RegisterForm3 from "@/components/Register/RegisterForm3"
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
