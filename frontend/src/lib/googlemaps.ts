import { UseFormSetValue } from "react-hook-form";

declare global {
  interface Window {
    google: typeof google;
    initializeAutocomplete: (fieldId: string) => void;
  }
}

let isApiLoaded = false;

export function loadGoogleMapsApi(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isApiLoaded) {
      resolve();
      return;
    }
    if (document.getElementById('google-maps-script')) {
      // Script is already loading
      const checkLoaded = setInterval(() => {
        if (isApiLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initializeAutocomplete&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Failed to load Google Maps API'));
    document.head.appendChild(script);

    window.initializeAutocomplete = (fieldId: string) => {
      isApiLoaded = true;
      setupAutocomplete(fieldId);
    };
  });
}


function setupAutocomplete(fieldId: string) {
  const initializeAutocomplete = () => {
    if (!fieldId) {
      // console.warn("Field ID is undefined. Autocomplete not initialized.");
      return;
    }

    const field = document.getElementById(fieldId) as HTMLInputElement;
    
    if (!field) {
      console.warn(`${fieldId} field not found. Retrying in 100ms.`);
      setTimeout(initializeAutocomplete, 100);
      return;
    }

    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.warn("Google Maps Places library not fully loaded. Retrying in 100ms.");
      setTimeout(initializeAutocomplete, 100);
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(field, {
      componentRestrictions: { country: ["us", "ca", "in"] },
      fields: ["address_components", "geometry"],
      types: fieldId.includes('city') ? ["(cities)"] : ["address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      fillInAddress(place);
    });
  };

  initializeAutocomplete();
}

function fillInAddress(place: google.maps.places.PlaceResult) {
  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    const componentType = component.types[0];
    
    switch (componentType) {
      case "street_number":
        window.setValueFunction?.("streetAddress", component.long_name);
        break;
      case "route":
        window.setValueFunction?.("streetAddress", (prev: string) => `${prev} ${component.short_name}`.trim());
        break;
      case "locality":
        window.setValueFunction?.("city", component.long_name);
        break;
      case "administrative_area_level_1":
        window.setValueFunction?.("state", component.short_name);
        break;
      case "country":
        window.setValueFunction?.("country", component.long_name);
        break;
      case "postal_code":
        window.setValueFunction?.("zipcode", component.long_name);
        break;
    }
  }
}

export function setupAddressAutofill(apiKey: string, setValue: UseFormSetValue<any>, fieldId: string) {
  window.setValueFunction = setValue;

  if (isApiLoaded) {
    setupAutocomplete(fieldId);
  } else {
    loadGoogleMapsApi(apiKey).then(() => {
      setupAutocomplete(fieldId);
    }).catch((error) => {
      console.error('Error loading Google Maps API:', error);
    });
  }
}