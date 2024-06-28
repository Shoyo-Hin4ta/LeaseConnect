import { ListingTypes } from "@/components/ListingForm/ListingForm1";
import { UseFormSetValue } from "react-hook-form";


// Simplified to match the option where initAutocomplete is called with setValue
declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}

// Assigning initAutocomplete to window, but noting that it should be called with setValue
window.initAutocomplete = () => {
  console.warn("initAutocomplete should be called with setValue from React component.");
};




let autocomplete: google.maps.places.Autocomplete;
let address1Field: HTMLInputElement;
// let address2Field: HTMLInputElement;
let postalField: HTMLInputElement;

// export function loadGoogleMapsApi(apiKey: string): void {
//   if (document.getElementById('google-maps-script')) return; // Prevents loading the script multiple times

//   const script = document.createElement('script');
//   script.id = 'google-maps-script';
//   script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
//   script.async = true;
//   script.defer = true;
//   document.body.appendChild(script);
// }

// export interface AddressComponentType{
//   city:string | undefined,
//   state:string | undefined,
//   country : string | undefined,
//   zipcode : string | undefined
// }

// export const defaultAddress: AddressComponentType = {
//     city : '',
//     state : '',
//     country : '',
//     zipcode : '',
// }



export function initAutocomplete(
  setValue: UseFormSetValue<ListingTypes>
){
  address1Field = document.querySelector("#streetAddress") as HTMLInputElement;
//   address2Field = document.querySelector("#address2") as HTMLInputElement;
  postalField = document.querySelector("#zipcode") as HTMLInputElement;

  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us", "ca", "in"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  // address1Field.focus();

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", () => fillInAddress(setValue));

  // address1Field.focus();

}

function fillInAddress(
  setValue: UseFormSetValue<ListingTypes>
) {
  // Get the place details from the autocomplete object.
  const place = autocomplete.getPlace();
  let address1 = "";
  let zipcode = "";

  // const addressDetails: AddressComponentType = { ...defaultAddress };


  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // place.address_components are google.maps.GeocoderAddressComponent objects
  // which are documented at http://goo.gle/3l5i5Mr
  console.log(place.address_components);
  for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore remove once typings fixed
    const componentType = component.types[0];
    
    switch (componentType) {
      case "street_number": {
        address1 = `${component.long_name} ${address1}`;
        break;
      }

      case "route": {
        address1 += component.short_name;
        break;
      }

      case "postal_code": {
        zipcode = `${component.long_name}${zipcode}`;
        break;
      }

      // case "postal_code_suffix": {
      //   zipcode = `${zipcode}-${component.long_name}`;
      //   break;
      // }

      case "locality":
        console.log("printing localtiy");
        (document.querySelector("#city") as HTMLInputElement).value =
          component.long_name;
          // addressDetails.city = component.long_name;
          setValue("city", component.long_name);
        break;

      case "administrative_area_level_1": {
        (document.querySelector("#state") as HTMLInputElement).value =
          component.short_name;
          // addressDetails.state = component.short_name;
          setValue("state", component.short_name);
        break;
      }

      case "country":
        (document.querySelector("#country") as HTMLInputElement).value =
          component.long_name;
          // addressDetails.country = component.long_name;
          setValue("country", component.long_name);
        break;
    }
  }

  address1Field.value = address1;
  // console.log(address1)
  setValue("streetAddress", address1Field.value)
  
  postalField.value = zipcode;
  // addressDetails.zipcode = zipcode;
  setValue("zipcode", postalField.value);


  // After filling the form with address components from the Autocomplete
  // prediction, set cursor focus on the second address line to encourage
  // entry of subpremise information such as apartment, unit, or floor number.
  // address2Field.focus();

}




// declare global {
//   interface Window {
//     initAutocomplete: () => void;
//   }
// }
// window.initAutocomplete = initAutocomplete;
// export { initAutocomplete }