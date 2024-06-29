import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import FilterElementContainer from '../FilterElementContainer';

interface PreferencesFilterProps {
  onPreferencesChange: (preferences: string[]) => void;
  onAmenitiesChange: (amenities: string[]) => void;
}

const PreferencesFilter: React.FC<PreferencesFilterProps> = ({ onPreferencesChange, onAmenitiesChange }) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev => {
      const newPreferences = prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
      onPreferencesChange(newPreferences)
      return newPreferences
    })
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => {
      const newAmenities = prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
      onAmenitiesChange(newAmenities)
      return newAmenities
    })
  }

  const preferences = ["Pets Allowed", "Smoking", "Drinking", "Only Students", "Only Working", "Only Girls", "Vegetarian", "Non-Vegetarian"]
  const amenities = ["Pool", "Gym", "Parking", "Only Working"]

  return (
    <FilterElementContainer>
      <div>Preferences</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {preferences.map(preference => (
          <Button
            key={preference}
            onClick={() => togglePreference(preference)}
            variant={selectedPreferences.includes(preference) ? "default" : "outline"}
          >
            {preference}
          </Button>
        ))}
      </div>
      <div>Amenities</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {amenities.map(amenity => (
          <Button
            key={amenity}
            onClick={() => toggleAmenity(amenity)}
            variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
          >
            {amenity}
          </Button>
        ))}
      </div>
    </FilterElementContainer>

  )
}

export default PreferencesFilter