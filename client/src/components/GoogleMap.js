import { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { useAuth } from '../Context/AuthContext';

const GoogleMap = ({ lat, lng, zoom }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const { apiKey } = useAuth()
    //   console.log(process)


    useEffect(() => {
        const loader = new Loader({
            apiKey: apiKey,
            version: "weekly",
        });

        loader.load().then(() => {
            const google = window.google;
            const center = { lat, lng };

            const map = new google.maps.Map(mapRef.current, {
                center: center,
                zoom: zoom,
            });

            markerRef.current = new google.maps.Marker({
                position: center,
                map: map,
            });
        });
    }, [zoom]);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setPosition(new window.google.maps.LatLng(lat, lng));
        }
    }, [lat, lng]);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default GoogleMap;
