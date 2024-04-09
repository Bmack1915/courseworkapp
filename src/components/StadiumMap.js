import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const StadiumMap = ({ lat, lng }) => (
  <APIProvider apiKey={"AIzaSyDMBA9gmhjNuaXWW3T71okAtXIlYwTpgyU"}>
    <Map
      style={{ width: "100vw", height: "100vh" }}
      defaultCenter={{ lat: lat, lng: lng }}
      defaultZoom={3}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default StadiumMap;
