import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './App.css';

const Facility = () => {
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = () => {
        axios.get('/facility')
            .then(response => {
                setFacilities(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

 return (
 <div>
 <div className="facility-header">

                     <h2>Immerse Yourself in Comfort With Us...</h2>
                 </div>
        <div className="facility-detail">
            <div className="facility-grid">
                {facilities.map(facility => (
                    <div key={facility._id} className="facility-card">
                        <img
                            src={`data:image/jpeg;base64,${facility.image}`}
                            alt={facility.name}
                            className="facility-image"
                        />
                        <div className="facility-info">
                            <h2>{facility.heading}</h2>
                            <p>{facility.description}</p>
                        </div>
                        <button className="facility-button ">View More...</button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
};


export default Facility;