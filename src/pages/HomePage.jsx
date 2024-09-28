import React from "react";
import MapView from "../components/MapView";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
    return (
        <div>
            <h1>Bar Search</h1>
            <SearchBar page="home" />
        </div>
    );
}