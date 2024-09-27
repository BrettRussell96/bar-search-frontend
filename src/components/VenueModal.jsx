import React, { useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "../styles/VenueModal.css";


export default function VenueModal({ place, isOpen, onClose }) {
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <PureModal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                return true;
            }}
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h2>{place.name}</h2>
                </div>
            
                <div className="modal-content">
                    <p>{place.address}</p>
                    <p>Rating: {place.rating}</p>
                    <p>
                        Opening Hours: {place.openingHours ? place.openingHours.join(', ') : "Not available"}
                    </p>
                    {place.website && (
                        <a href={place.website} target="_blank" rel="noopener noreferrer">
                            Website
                        </a>
                    )}
                    {place.images && place.images.length > 0 && (
                        <div className="images">
                            {place.images.map((url, index) => (
                                <img 
                                    key={index} 
                                    src={url} 
                                    alt={place.name}
                                    onClick={() => setSelectedImage(url)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>

            {selectedImage && (
                <PureModal
                    isOpen={!!selectedImage}
                    onClose={() => {
                        setSelectedImage(null);
                        return true;
                    }}
                >
                    <div className="image-full-view">
                        <img src={selectedImage} alt="Selected view" />

                    </div>

                </PureModal>
            )}
        </PureModal>
    );
}