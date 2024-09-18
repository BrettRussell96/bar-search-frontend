import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
import axios from "axios";

export default function HomePage() {
    const [center, setCenter] = useState(null);
    const [places, setPlaces] = useState([]);

    const handleSearch = async (location) => {
        try {
            const response = await axios.get(`http://localhost:3001/map?location=${location}`);
            setCenter(response.data.center);
            setPlaces(response.data.places);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    return (
        <div className="home-page">
            <SearchBar onSearch={handleSearch} />
            {center && <MapView center={center} places={places} />}
        </div>
    );
};