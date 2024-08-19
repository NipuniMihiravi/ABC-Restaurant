import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Reservation.css'; // Ensure this CSS file has necessary styles

const CoverImageSeven = () => {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    fetchCovers();
  }, []);

  const fetchCovers = () => {
    axios.get('/cover')
      .then(response => {
        console.log('Fetched items:', response.data);
        if (response.data.length > 6) {
          setCover(response.data[6]); // Set the sixth item (index 5)
        }
      })
      .catch(error => console.error('Error fetching items:', error));
  };

  return (
<div className="cover-image-seven">

    {cover && (
        <div key={cover.id} className="image-seven-container">
            <div className="image-seven-image">
                <img
                    src={`data:image/jpeg;base64,${cover.image}`} // Assuming cover.image is base64 encoded
                    className="image-seven-img" // Class for the image styling
                    alt="Cover Image" // Accessibility with a descriptive alt text
                />
            </div>
            <div className="image-seven-text reveal">

                <p>{cover.description}</p>
            </div>
        </div>
    )}
</div>

  );
};

export default CoverImageSeven;
