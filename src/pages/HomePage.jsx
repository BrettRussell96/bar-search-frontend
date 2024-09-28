import React from "react";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
// import "../styles/HomePage.css";

export default function HomePage() {
    return (
        <div className="home-page">
            <div className="search-bar-container">
                <SearchBar />
            </div>
            <MapView />
        </div>
    );
};