import { UseFormSetValue } from "react-hook-form";

declare global {
  interface Window {
    initAutocomplete: () => void;
    setValueFunction: UseFormSetValue<any> | null;
  }
}

let autocomplete: google.maps.places.Autocomplete;
let addressField: HTMLInputElement;
let postalField: HTMLInputElement;

export function loadGoogleMapsApi(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('google-maps-script')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete&loading=async`;
    script.async = true;
    script.onerror = () => reject(new Error('Failed to load Google Maps API'));
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

function initAutocomplete() {
  addressField = document.querySelector("#streetAddress") as HTMLInputElement;
  postalField = document.querySelector("#zipcode") as HTMLInputElement;

  if (addressField) {
    autocomplete = new google.maps.places.Autocomplete(addressField, {
      componentRestrictions: { country: ["us", "ca", "in"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    });
    addressField.focus();

    autocomplete.addListener("place_changed", fillInAddress);
  }
}

function fillInAddress() {
  const place = autocomplete.getPlace();
  let address1 = "";
  let zipcode = "";

  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    const componentType = component.types[0];
    
    switch (componentType) {
      case "street_number":
        address1 = `${component.long_name} ${address1}`;
        break;
      case "route":
        address1 += component.short_name;
        break;
      case "postal_code":
        zipcode = `${component.long_name}${zipcode}`;
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
    }
  }

  window.setValueFunction?.("streetAddress", address1);
  window.setValueFunction?.("zipcode", zipcode);

  // Update the input fields
  if (addressField) addressField.value = address1;
  if (postalField) postalField.value = zipcode;
}

export function setupAddressAutofill(apiKey: string, setValue: UseFormSetValue<any>) {
  window.setValueFunction = setValue;
  window.initAutocomplete = initAutocomplete;

  loadGoogleMapsApi(apiKey)
    .then(() => {
      window.initAutocomplete();
    })
    .catch((error) => {
      console.error('Error loading Google Maps API:', error);
    });
}