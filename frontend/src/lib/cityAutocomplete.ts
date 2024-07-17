import { UseFormSetValue } from "react-hook-form";

let autocomplete: google.maps.places.Autocomplete;

export function initCityAutocomplete(setValue: UseFormSetValue<any>, cityFieldId: string) {
  const cityField = document.getElementById(cityFieldId) as HTMLInputElement;
  
  if (!cityField) {
    console.error(`City input field with id ${cityFieldId} not found`);
    return;
  }

  autocomplete = new google.maps.places.Autocomplete(cityField, {
    types: ['(cities)'],
    fields: ['address_components'],
  });

  autocomplete.addListener("place_changed", () => fillInAddress(setValue));
}

function fillInAddress(setValue: UseFormSetValue<any>) {
  const place = autocomplete.getPlace();
  
  if (!place.address_components) {
    console.error("No address components found in place data");
    return;
  }

  let city = "";
  let state = "";
  let country = "";
  let zipcode = "";

  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    const componentType = component.types[0];

    switch (componentType) {
      case "locality":
        city = component.long_name;
        break;
      case "administrative_area_level_1":
        state = component.long_name;
        break;
      case "country":
        country = component.long_name;
        break;
      case "postal_code":
        zipcode = component.long_name;
        break;
    }
  }

  setValue("city", city);
  setValue("state", state);
  setValue("country", country);
  setValue("zipcode", zipcode);
}

// Optionally, you can still attach it to the window object if needed
declare global {
  interface Window {
    initCityAutocomplete?: typeof initCityAutocomplete;
  }
}

if (typeof window !== 'undefined') {
  window.initCityAutocomplete = initCityAutocomplete;
}