import { UseFormSetValue } from "react-hook-form";

let autocomplete: google.maps.places.Autocomplete;

declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}

export function initAutocomplete(setValue: UseFormSetValue<any>) {
  const streetAddressField = document.querySelector("#streetAddress") as HTMLInputElement | null;
  
  if (!streetAddressField) {
    console.error("Street address input field not found");
    return;
  }

  if (!(streetAddressField instanceof HTMLInputElement)) {
    console.error("Street address element is not an input field");
    return;
  }

  autocomplete = new google.maps.places.Autocomplete(streetAddressField, {
    componentRestrictions: { country: ["us", "ca", "in"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", () => fillInAddress(setValue));
}

function fillInAddress(setValue: UseFormSetValue<ListingTypes>) {
  const place = autocomplete.getPlace();
  
  if (!place.address_components) {
    console.error("No address components found in place data");
    return;
  }

  let streetNumber = "";
  let route = "";

  for (const component of place.address_components) {
    const componentType = component.types[0];

    switch (componentType) {
      case "street_number":
        streetNumber = component.long_name;
        break;
      case "route":
        route = component.short_name;
        break;
      case "postal_code":
        setValue("zipcode", component.long_name);
        break;
      case "locality":
        setValue("city", component.long_name);
        break;
      case "administrative_area_level_1":
        setValue("state", component.short_name);
        break;
      case "country":
        setValue("country", component.long_name);
        break;
    }
  }

  const streetAddress = `${streetNumber} ${route}`.trim();
  if (streetAddress) {
    setValue("streetAddress", streetAddress);
  }
}

// This is a placeholder that will be overwritten in the React component
window.initAutocomplete = () => {
  console.warn("initAutocomplete should be called with setValue from React component.");
};