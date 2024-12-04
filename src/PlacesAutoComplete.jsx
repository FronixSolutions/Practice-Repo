import React, { useRef } from "react";
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api';

// Google Maps API libraries to load
const libraries = ['places'];

const PlaceComponent = ({ setAddress }) => {
  const inputRef = useRef();

  // This function is triggered when a place is selected
  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      // Log the address and coordinates for debugging
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      // Pass the selected address back to the parent component
      setAddress(place.formatted_address);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyADWkHebsKttRyczeAio9LdgISz-r5rIAg" // Replace with your own API key
      libraries={libraries}
    >
      <StandaloneSearchBox
        onLoad={ref => (inputRef.current = ref)} // Initialize input reference
        onPlacesChanged={handlePlaceChanged} // Call on place change
      >
        <input
          type="text"
          className="form-control"
          placeholder="Enter Location"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default PlaceComponent;
