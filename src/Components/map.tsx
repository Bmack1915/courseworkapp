import React from "react";
import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

const GOOGLE_MAPS_API_KEY = "AIzaSyD3_F4A1TSlJUAiLV7y7msB7fFW6NyqZ-s";

const CustomMap = () => (
  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
    <GoogleMap zoom={10} center={{ lat: 53.54992, lng: 10.00678 }} />
  </APIProvider>
);

export default CustomMap;
