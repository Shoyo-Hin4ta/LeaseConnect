import { setupAddressAutofill } from '@/lib/googlemaps';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

export function useGoogleMapsApi(setValue: UseFormSetValue<any>, fieldId: string, isEditMode?: boolean) {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not set');
      return;
    }
    
    if (isEditMode === undefined || isEditMode) {
      setTimeout(() => {
        setupAddressAutofill(apiKey, setValue, fieldId);
      }, 0);
    }

    return () => {
      window.setValueFunction = null;
    };
  }, [setValue, fieldId, isEditMode]);
}