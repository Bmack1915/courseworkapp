import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const StadiumMap = ({ lat, lng }) => (
  <APIProvider apiKey={"AIzaSyDMBA9gmhjNuaXWW3T71okAtXIlYwTpgyU"}>
    <Map
      style={{ width: "50vw", height: "50vh" }}
      defaultCenter={{ lat: lat, lng: lng }}
      defaultZoom={17}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default StadiumMap;
