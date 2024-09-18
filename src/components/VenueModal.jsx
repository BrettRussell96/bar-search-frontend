import React from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";


export default function VenueModal({ place, isOpen, onCLose }) {
    return (
        <PureModal
            header={place.name}
            footer={
                <button onCLick={onCLose}>Close</button>
            } 
            isOpen={isOpen}
            onClose={() => {
                onCLose();
                return true;
            }}
        >
            <div className="modal-content">
                <p>{place.address}</p>
                <p>Rating: {place.rating}</p>
                <p>Opening Hours: {place.openingHours.join(', ')}</p>
                {place.website && (
                    <a href={place.website} target="_blank" rel="noopener noreferrer">
                        Website
                    </a>
                )}
                {place.images.length > 0 && (
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