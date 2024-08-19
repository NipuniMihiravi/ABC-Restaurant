import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reservation.css'; // Ensure this CSS file has necessary styles

const CoverImageSix = () => {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    fetchCovers();
  }, []);

  const fetchCovers = () => {
    axios.get('/cover')
      .then(response => {
        console.log('Fetched items:', response.data);
        if (response.data.length > 5) {
          setCover(response.data[5]); // Set the sixth item (index 5)
        }
      })
      .catch(error => console.error('Error fetching items:', error));
  };

  return (
<div className="cover-image-six">

    {cover && (
        <div key={cover.id} className="image-six-container">
            <div className="image-six-image">
                <img
                    src={`data:image/jpeg;base64,${cover.image}`} // Assuming cover.image is base64 encoded
                    className="image-six-img" // Class for the image styling
                    alt="Cover Image" // Accessibility with a descriptive alt text
                />
            </div>
            <div className="image-six-text reveal">
                <h2>Its Time to Enjoy</h2>
                <h1>{cover.heading}</h1>
                <p>{cover.description}</p>
            </div>
        </div>
    )}
</div>

  );
};

export default CoverImageSix;
