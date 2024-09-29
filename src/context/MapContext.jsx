import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const MapContext = createContext();

export const useMap = () => {
    return useContext(MapContext);
};

export const MapProvider = ({ children }) => {
    const [center, setCenter] = useState(null);
    const [places, setPlaces] = useState([]);
    const [searchedLocation, setSearchedLocation] = useState("");

    const handleSearch = async (location) => {
        try {
            const response = await axios.get(`http://localhost:3001/map?location=${location}`);
            const { center, places } = response.data

            console.log("center:", center);
            console.log("places", places);

            setCenter(center);
            setPlaces(places);
            setSearchedLocation(location);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    return (
        <MapContext.Provider value={{ center, places, searchedLocation, handleSearch }}>
            {children}
        </MapContext.Provider>
    );
}