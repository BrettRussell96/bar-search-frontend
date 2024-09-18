import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow, LoadScript } from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_API_KEY;

export default function MapView({ center, places }) {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const mapContainerStyle = {
        width: "100%",
        height: "400px"
    };

     return (
        <div className="map-container">
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                >
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            position={place.location}
                            onClick={() => setSelectedPlace(place)} 
                        />
                    ))}

                    {selectedPlace && (
                        <InfoWindow
                            position={selectedPlace.location}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div>
                                <h3>{selectedPlace.name}</h3>
                                <p>{selectedPlace.address}</p>
                                <button onClick={() => setSelectedPlace(null)}>More Info</button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
     );
};