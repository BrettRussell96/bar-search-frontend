import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import VenueModal from "./VenueModal";
import { useMap } from "../context/MapContext";
import SearchBar from "./SearchBar";
import "../styles/MapView.css";


const apiKey = import.meta.env.VITE_API_KEY;
const mapId = import.meta.env.VITE_MAP_ID;

const libraries = ["marker"];

export default function MapView() {
    const { center, places, searchedLocation } = useMap()
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [map, setMap] = useState(null);
    const [mapContainerStyle, setMapContainerStyle] = useState({});

    const updateMapContainerStyle = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768) {
            setMapContainerStyle({
                width: "100vw",
                height: "70vh",
                position: "absolute",
                left: "0",
                bottom: "0",
                marginTop: "1rem"
            });
        } else {
            setMapContainerStyle({
                width: "99vw",
                height: "80vh",
                position: "absolute",
                right: "0.5vw",
                left:"0.5vw",
                bottom: "1vh"
            });
        }
    };

    useEffect(() => {
        updateMapContainerStyle();

        window.addEventListener("resize", updateMapContainerStyle);

        return () => {
            window.removeEventListener("resize", updateMapContainerStyle);
        }
    }, []);

    useEffect(() => {
        if (map && window.google && window.google.maps.marker) {
            map.markers?.forEach(marker => marker.setMap(null));
            map.markers = [];

            places.forEach((place) => {
                if (!place.location || !place.location.lat || !place.location.lng) return;

                const customMarker = document.createElement('div');
                customMarker.className = 'custom-marker';
                customMarker.style.backgroundColor = '#8b68e0';
                customMarker.style.width = '1rem';
                customMarker.style.height = '1rem';
                customMarker.style.border = '1px solid transparent';
                customMarker.style.borderRadius = '50%';
                customMarker.style.borderColor = '#1d1d1d';
                customMarker.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.5)';
                

                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    map: map,
                    position: { lat: place.location.lat, lng: place.location.lng },
                    title: place.name,
                    content: customMarker
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
            <SearchBar page="map" />
            <h5>Showing results for {searchedLocation}</h5>
            <LoadScript 
                googleMapsApiKey={apiKey}
                libraries={libraries}
            >
                {center && (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={15}
                        options={{
                            disableDefaultUI: true,
                            mapId: mapId
                        }}
                        onLoad={handleMapLoad}
                    >                
                    </GoogleMap>

                )}
                
            </LoadScript>

            {selectedPlace && (
                <VenueModal
                    place={selectedPlace}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedPlace(null);
                    }} 
                />
            )}
        </div>
     );
};