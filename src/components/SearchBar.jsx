import React, { useState } from "react";
import { useMap } from "../context/MapContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchBar.css";

export default function SearchBar({ page }) {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { handleSearch } = useMap();
    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInput(value);

        if (value.length > 2) {
            try {
                const response = await axios.get(`http://localhost:3001/map/autocomplete?input=${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching autocomplete suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.description);
        setSuggestions([]);
        handleSearch(suggestion.description);
        navigate("/mapview");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(input);
        navigate("/mapview");
    };

    return (
        <div className={`search-bar ${page === "home" ? "search-bar-home" : "search-bar-map"}`}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter suburb, postcode, or address"               
                />
                <button type="submit">Search</button>
            </form>
            {suggestions.length > 0 && (
                <ul className="autocomplete-dropdown">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};