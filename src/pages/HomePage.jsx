import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
import axios from "axios";
// import "../styles/HomePage.css";

export default function HomePage() {
    const [center, setCenter] = useState(null);
    const [places, setPlaces] = useState([]);

    const handleSearch = async (location) => {
        try {
            const response = await axios.get(`http://localhost:3001/map?location=${location}`);
            const { center, places } = response.data

            console.log("center:", center);
            console.log("places", places);

            setCenter(center);
            setPlaces(places);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    return (
        <div className="home-page">
            <div className="search-bar-container">
                <SearchBar onSearch={handleSearch} />
            </div>
            {center && <MapView center={center} places={places} />}
        </div>
    );
};