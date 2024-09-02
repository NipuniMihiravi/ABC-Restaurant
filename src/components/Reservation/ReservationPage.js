import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoverImageSix from './CoverImageSix';
import CoverImageSeven from './CoverImageSeven';
import ReservationForm from './ReservationForm';
import ReservationPanel from './ReservationPanel';
import './Reservation.css';


const ReservationPage = () => {




    return (
        <div>
                <ReservationPanel />
            <CoverImageSix />
            <CoverImageSeven />
            <ReservationForm />

        </div>
    );
};

export default ReservationPage;