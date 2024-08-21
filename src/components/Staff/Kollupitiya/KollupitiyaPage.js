import React from 'react';
import { useNavigate } from 'react-router-dom';
import StaffPanel from '../StaffPanel'; // Import the StaffPanel component

const KollupitiyaPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <StaffPanel /> {/* Render the StaffPanel component here */}
            <div className="button-row">
                <button onClick={() => navigate('/staff/reservationkollu')}>Party Reservation</button>
                <button onClick={() => navigate('/staff/tablekollu')}>Table Reservation</button>
            </div>
        </div>
    );
};

export default KollupitiyaPage;
