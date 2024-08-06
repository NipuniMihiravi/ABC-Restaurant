import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your CSS file

const CoverImageThird = () => {
    const [cover, setCover] = useState(null);

    useEffect(() => {
        fetchCovers();
    }, []);

    const fetchCovers = () => {
        axios.get('/cover')
            .then(response => {
                console.log('Fetched items:', response.data);
                if (response.data.length > 2) {
                    setCover(response.data[2]); // Set the third item
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    };

    return (
        <div className="coverr-image3">
            {cover && (
                <div key={cover.id} className="image-containerr">
                    <img
                        src={`data:image/jpeg;base64,${cover.image}`} // Assuming cover.image is base64 encoded
                        className="image-containerr img" // Class for the image styling
                        alt="Cover Image" // Accessibility with a descriptive alt text
                    />
                    <div className="image3-text reveal">
                        <h1>{cover.heading}</h1>
                        <p>{cover.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoverImageThird;
