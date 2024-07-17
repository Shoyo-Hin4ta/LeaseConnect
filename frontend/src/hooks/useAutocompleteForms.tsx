// in useAutocompleteForms.ts
import { useLocation } from 'react-router-dom';
import { useGoogleMapsApi } from './useGoogleMapsApi';
import { UseFormSetValue } from 'react-hook-form';

const AUTOCOMPLETE_ROUTES = [
  '/listingForm',
  '/editlisting',
  '/profilepage',
  '/register'
];

export function useAutocompleteForms(setValue: UseFormSetValue<any>) {
  const location = useLocation();
  const shouldEnableAutocomplete = AUTOCOMPLETE_ROUTES.some(route => 
    location.pathname.startsWith(route)
  );

  // console.log('Current path:', location.pathname);
  // console.log('Autocomplete enabled:', shouldEnableAutocomplete);

  useGoogleMapsApi(setValue, 'streetAddress', shouldEnableAutocomplete);
  useGoogleMapsApi(setValue, 'city', shouldEnableAutocomplete);
}