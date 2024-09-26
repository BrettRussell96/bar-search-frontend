import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import VenueModal from "./VenueModal";

const apiKey = import.meta.env.VITE_API_KEY;
const mapId = import.meta.env.VITE_MAP_ID;

export default function MapView({ center, places }) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [map, setMap] = useState(null);

    const mapContainerStyle = {
        width: "200%",
        height: "700px"
    };

    useEffect(() => {
        if (map && window.google && window.google.maps.marker) {
            map.markers?.forEach(marker => marker.setMap(null));
            map.markers = [];

            places.forEach((place) => {
                if (!place.location || !place.location.lat || !place.location.lng) return;

                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    map: map,
                    position: { lat: place.location.lat, lng: place.location.lng },
                    title: place.name
                });

                marker.addListener('click', () => {
                    setSelectedPlace(place);
                    setIsModalOpen(true);
                });

                map.markers.push(marker);
            });
        }
    }, [map, places]);

    const handleMapLoad = (mapInstance) => {
        setMap(mapInstance);
    }

     return (
        <div className="map-container">
            <LoadScript 
                googleMapsApiKey={apiKey}
                libraries={["marker"]}
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                    options={{
                        disableDefaultUI: true,
                        mapId: mapId
                    }}
                    onLoad={handleMapLoad}
                >
                    {selectedPlace && (
                        <InfoWindow
                            position={selectedPlace.location}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div>
                                <h3>{selectedPlace.name}</h3>
                                <p>{selectedPlace.address}</p>
                                <button onClick={() => setIsModalOpen(true)}>More Info</button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>

            {selectedPlace && (
                <VenueModal
                    place={selectedPlace}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
     );
};