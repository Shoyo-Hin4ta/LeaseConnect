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


export function formatValue(value: string): string {

  const specialCases: { [key: string]: string } = {
    'usd': 'USD',
    'inr': 'INR',
    'no_smoking': 'No Smoking',
    'no_drinking': 'No Drinking',
    'no_pets': 'No Pets',
    'students_only': 'Students Only',
    'working_only': 'Working Only',
    'girls_only': 'Girls Only',
    'eggeterian': 'Eggetarian',
    'couples_only' : 'Couples Only'
  };

  if (value in specialCases) {
    return specialCases[value];
  }

  // General case: capitalize each word and replace underscores with spaces
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


export const parseDateRange = (dateRangeString: string) => {
  const [from, to] = dateRangeString.split(' - ').map(date => new Date(date));
  return { from, to };
};

export const tabs = [
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State' },
  { id: 'country', label: 'Country' },
  { id: 'all', label: 'All Listings' }
];

