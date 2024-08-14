// CoverImageFour.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderApp.css'; // Assuming your CSS file

const CoverImageFive = () => {
    const [cover, setCover] = useState(null);

    useEffect(() => {
        fetchCovers();
    }, []);

    const fetchCovers = () => {
        axios.get('/cover')
            .then(response => {
                console.log('Fetched items:', response.data);
                if (response.data.length > 4) {
                    setCover(response.data[4]); // Set the fourth item
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    };

    return (

        <div className="coverr-image5">
            {cover && (
                <div key={cover.id} className="image5-containerr">
                    <img
                        src={`data:image/jpeg;base64,${cover.image}`} // Assuming cover.image is base64 encoded
                        className="image5-containerr img" // Class for the image styling
                        alt="Cover Image" // Accessibility with a descriptive alt text
                    />
                     <div className="image5-text reveal">
                                            <h1>{cover.heading}</h1>
                                            <p>{cover.description}</p>
                                        </div>
                </div>
            )}
        </div>

    );
};

export default CoverImageFive;