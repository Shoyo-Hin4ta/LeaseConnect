import React, { useCallback } from 'react'
import { Button } from "@/components/ui/button"

interface PreferencesFilterProps {
  onPreferencesChange: (preferences: string[]) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  preferencesValue: string[];
  amenitiesValue: string[];
}

const PreferencesFilter: React.FC<PreferencesFilterProps> = ({ 
  onPreferencesChange, 
  onAmenitiesChange, 
  preferencesValue, 
  amenitiesValue 
}) => {
  const togglePreference = useCallback((preference: string) => {
    const newPreferences = preferencesValue.includes(preference)
      ? preferencesValue.filter(p => p !== preference)
      : [...preferencesValue, preference];
    onPreferencesChange(newPreferences);
  }, [preferencesValue, onPreferencesChange]);

  const toggleAmenity = useCallback((amenity: string) => {
    const newAmenities = amenitiesValue.includes(amenity)
      ? amenitiesValue.filter(a => a !== amenity)
      : [...amenitiesValue, amenity];
    onAmenitiesChange(newAmenities);
  }, [amenitiesValue, onAmenitiesChange]);

  const preferences = ["Pets Allowed", "Smoking", "Drinking", "Only Students", "Only Working", "Only Girls", "Vegetarian", "Non-Vegetarian"];
  const amenities = ["Pool", "Gym", "Parking", "Only Working"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-3">Preferences</h3>
        <div className="grid grid-cols-2 gap-2">
          {preferences.map(preference => (
            <Button
              key={preference}
              onClick={() => togglePreference(preference)}
              variant={preferencesValue.includes(preference) ? "default" : "outline"}
              className="text-xs py-1 h-auto w-full"
            >
              <span className="truncate">{preference}</span>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-3">Amenities</h3>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map(amenity => (
            <Button
              key={amenity}
              onClick={() => toggleAmenity(amenity)}
              variant={amenitiesValue.includes(amenity) ? "default" : "outline"}
              className="text-xs py-1 h-auto w-full"
            >
              <span className="truncate">{amenity}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreferencesFilter;