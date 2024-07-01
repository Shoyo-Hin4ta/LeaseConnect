import React from 'react';
import { Label } from "@/components/ui/label"

interface BathAndFilterProps {
  onBedChange: (bedCount: string) => void;
  onBathChange: (bathCount: string) => void;
  bedValue: string;
  bathValue: string;
}

const BathAndFilter: React.FC<BathAndFilterProps> = ({ onBedChange, onBathChange, bedValue, bathValue }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-violet-800 dark:text-violet-200">Beds & Baths</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block text-sm font-medium">Beds</Label>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3", "4+"].map((value) => (
              <button
                key={value}
                onClick={() => onBedChange(value)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                  bedValue === value
                    ? "bg-violet-600 text-white border-violet-600"
                    : "border-violet-200 bg-white text-gray-900 hover:bg-violet-100"
                } cursor-pointer transition-colors`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="mb-2 block text-sm font-medium">Baths</Label>
          <div className="flex flex-wrap gap-2">
            {["1", "2", "3+"].map((value) => (
              <button
                key={value}
                onClick={() => onBathChange(value)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                  bathValue === value
                    ? "bg-violet-600 text-white border-violet-600"
                    : "border-violet-200 bg-white text-gray-900 hover:bg-violet-100"
                } cursor-pointer transition-colors`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BathAndFilter;