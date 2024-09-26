import React from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import "../styles/VenueModal.css";


export default function VenueModal({ place, isOpen, onClose }) {
    return (
        <PureModal
            header={place.name}
            footer={
                <button onClick={onClose}>Close</button>
            } 
            isOpen={isOpen}
            onClose={() => {
                onClose();
                return true;
            }}
        >
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
                            <img key={index} src={url} alt={place.name} />
                        ))}
                    </div>
                )}
            </div>
        </PureModal>
    );
}