import React, { useEffect, useRef, useState } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { useAuth } from '../Context/AuthContext';

const GoogleMapPicker = ({ defaultLocation, zoom, onChangeLocation }) => {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const {apiKey} = useAuth()

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: zoom,
      });

      const initialMarker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        draggable: true,
      });

      initialMarker.addListener("dragend", (e) => {
        const position = e.latLng.toJSON();
        onChangeLocation(position.lat, position.lng);
      });

      setMarker(initialMarker);
    });
  }, [defaultLocation, zoom, onChangeLocation, apiKey]);

  useEffect(() => {
    if (marker) {
      marker.setPosition(defaultLocation);
    }
  }, [defaultLocation, marker]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
};

export default GoogleMapPicker;
