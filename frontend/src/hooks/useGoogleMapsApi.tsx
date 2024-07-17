// in useGoogleMapsApi.ts
import { useEffect, useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { setupAddressAutofill } from '@/lib/googlemaps';

export function useGoogleMapsApi(
  setValue: UseFormSetValue<any>,
  fieldId: string,
  isActive: boolean = true
) {
  const initializeAutocomplete = useCallback(() => {
    if (!isActive) return;

    const field = document.getElementById(fieldId);
    if (field && window.google && window.google.maps && window.google.maps.places) {
      // console.log(`Initializing autocomplete for ${fieldId}`);
      setupAddressAutofill(setValue, fieldId);
    } else {
      // console.log(`Field ${fieldId} not found or Google Maps API not ready, retrying in 1000ms`);
      setTimeout(initializeAutocomplete, 1000);
    }
  }, [setValue, fieldId, isActive]);

  useEffect(() => {
    // console.log(`useGoogleMapsApi for ${fieldId}, isActive: ${isActive}`);
    const timer = setTimeout(initializeAutocomplete, 0);

    return () => {
      clearTimeout(timer);
      if (window.google && window.google.maps && window.google.maps.event) {
        const field = document.getElementById(fieldId) as HTMLInputElement | null;
        if (field) {
          google.maps.event.clearInstanceListeners(field);
        }
      }
      window.setValueFunction = undefined;
    };
  }, [initializeAutocomplete, fieldId, isActive]);
}