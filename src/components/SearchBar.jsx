import React, { useState } from "react";
import axios from "axios";

export default function SearchBar() {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Function to handle form input and autocomplete
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setInput(value);

        // Fetch autocomplete suggestions from API
        if (value.length > 2) {
            try {
                const response = await axios.get(`https://localhost:3001/map/autocomplete?input=${value}`);
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
        onSearch(suggestion.description);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(input);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter suburb, postcode, or address"               
                />
                <button type="submit">Search</button>
            </form>

        </div>
    );
}