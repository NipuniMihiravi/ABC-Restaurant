import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Footer from './Footer';

const Gallery = () => {
  const [activeForm, setActiveForm] = useState('Food');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/gallery/gallery`, { params: { name: activeForm } });
        console.log(response.data); // Debugging: Check the structure of response

        // Check if response.data.images is an array of base64 image strings
        if (Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          console.error('Unexpected response format:', response.data);
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching gallery images', error);
      }
    };

    fetchImages();
  }, [activeForm]);

  return (
<div>
  <div className="heading-gallery">
  <h1> Gallery </h1>
  <h2> Check Out Our Snaps </h2>
  <h2> From Kitchen and Restaurant </h2>

  </div>

    <div className="full-gallery-container">
      <div className="galleries-container">
        <div className="galleries-button-group">
          <button
            onClick={() => setActiveForm('Food')}
            className={`galleries-form-toggle-button ${activeForm === 'Food' ? 'active' : ''}`}
          >
            Food
          </button>
          <button
            onClick={() => setActiveForm('Restaurant')}
            className={`galleries-form-toggle-button ${activeForm === 'Restaurant' ? 'active' : ''}`}
          >
            Restaurant
          </button>
          <button
            onClick={() => setActiveForm('Other')}
            className={`galleries-form-toggle-button ${activeForm === 'Other' ? 'active' : ''}`}
          >
            Other
          </button>
        </div>

        <div className="galleries-images">
          {images.length > 0 ? (
            images.map((imageData, index) => (
              <li key={index} className="galleries-image">
                <img
                  src={`data:image/jpeg;base64,${imageData}`} // Make sure imageData is just the base64 string
                  alt={`${activeForm} Gallery Image`}
                  className="galleries-image"
                />
              </li>
            ))
          ) : (
            <p>No images available for {activeForm}</p>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Gallery;
