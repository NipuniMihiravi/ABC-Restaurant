import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming your CSS file

const CoverImage = () => {
    const [cover, setCover] = useState(null);

    useEffect(() => {
        fetchCovers();
    }, []);

    const fetchCovers = () => {
        axios.get('/cover')
            .then(response => {
                console.log('Fetched items:', response.data);
                if (response.data.length > 0) {
                    setCover(response.data[0]); // Set the first item
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    };

    return (
        <div className="coverr-image">
            {cover && (
                <div key={cover.id} className="image-containerr">
                    <img
                        src={`data:image/jpeg;base64,${cover.image}`} // Assuming cover.image is base64 encoded
                        className="image-containerr img" // Class for the image styling
                        alt="Cover Image" // Accessibility with a descriptive alt text
                    />
                    <div className="image-text reveal">
                        <h1>{cover.heading}</h1>
                        <p>{cover.description}</p>
                    </div>
                </div>
            )}
        </div>
    );

};

export default CoverImage;
