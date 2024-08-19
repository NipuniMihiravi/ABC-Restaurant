import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { reservationSchema, tableSchema } from './Validation/validationSchemas';
import './Reservation.css';
import ConfirmationDialog from './ConfirmationDialog'; // Import the confirmation dialog

const ReservationForm = () => {
  const [activeForm, setActiveForm] = useState('reservation');
  const [showDialog, setShowDialog] = useState(false);
  const [submitHandler, setSubmitHandler] = useState(() => () => {});
  const [dialogMessage, setDialogMessage] = useState('');

  const { register: registerReservation, handleSubmit: handleReservationSubmit, formState: { errors: reservationErrors } } = useForm({
    resolver: yupResolver(reservationSchema),
  });

  const { register: registerTable, handleSubmit: handleTableSubmit, formState: { errors: tableErrors } } = useForm({
    resolver: yupResolver(tableSchema),
  });

  const onReservationSubmit = (data) => {
    setDialogMessage('Are you sure you want to submit the party reservation?');
    setSubmitHandler(() => async () => {
      try {
        await axios.post('/reservation', data);
        alert('Party reservation submitted successfully!');
        window.location.reload(); // Refresh the page after successful submission
      } catch (error) {
        console.error('Error submitting party reservation:', error);
      }
    });
    setShowDialog(true);
  };

  const onTableSubmit = (data) => {
    setDialogMessage('Are you sure you want to submit the table reservation?');
    setSubmitHandler(() => async () => {
      try {
        await axios.post('/table', data);
        alert('Table reservation submitted successfully!');
        window.location.reload(); // Refresh the page after successful submission
      } catch (error) {
        console.error('Error submitting table reservation:', error);
      }
    });
    setShowDialog(true);
  };

  const handleConfirm = async () => {
    setShowDialog(false);
    if (submitHandler) {
      await submitHandler();
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <div className="full-reservation-container">
      <div className="reservation-container">
        <div className="button-group">
          <button
            onClick={() => setActiveForm('reservation')}
            className={`form-toggle-button ${activeForm === 'reservation' ? 'active' : ''}`}
          >
            PARTY RESERVATION
          </button>
          <button
            onClick={() => setActiveForm('table')}
            className={`form-toggle-button ${activeForm === 'table' ? 'active' : ''}`}
          >
            RESERVE TABLE
          </button>
        </div>

        {activeForm === 'reservation' && (
          <form className="reservation-form" onSubmit={handleReservationSubmit(onReservationSubmit)}>
            <h1>PARTY RESERVATION</h1>
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" {...registerReservation('name')} placeholder="Enter your name" />
                {reservationErrors.name && <p>{reservationErrors.name.message}</p>}
              </div>
              <div className="form-group">
                <label>Contact No:</label>
                <input type="text" {...registerReservation('contactNo')} placeholder="Enter contact number" />
                {reservationErrors.contactNo && <p>{reservationErrors.contactNo.message}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date:</label>
                <input type="date" {...registerReservation('date')} />
                {reservationErrors.date && <p>{reservationErrors.date.message}</p>}
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input type="time" {...registerReservation('time')} />
                {reservationErrors.time && <p>{reservationErrors.time.message}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Guests:</label>
              <input type="number" {...registerReservation('guests')} placeholder="Number of guests" />
              {reservationErrors.guests && <p>{reservationErrors.guests.message}</p>}
            </div>

            <div className="form-group">
              <label>Special Note:</label>
              <textarea {...registerReservation('specialNote')} placeholder="Any special requests or notes"></textarea>
            </div>

            <button type="submit" className="submit-button">Submit Reservation</button>
          </form>
        )}

        {activeForm === 'table' && (
          <form className="reservation-form" onSubmit={handleTableSubmit(onTableSubmit)}>
            <h1>RESERVE TABLE</h1>
            <div className="form-row">
              <div className="form-group">
                              <label>Name:</label>
                              <input type="text" {...registerTable('name')} placeholder="Enter your name" />
                              {tableErrors.name && <p>{tableErrors.name.message}</p>}
                            </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date:</label>
                <input type="date" {...registerTable('date')} />
                {tableErrors.date && <p>{tableErrors.date.message}</p>}
              </div>
              <div className="form-group">
                <label>Time:</label>
                <input type="time" {...registerTable('time')} />
                {tableErrors.time && <p>{tableErrors.time.message}</p>}
              </div>
            </div>

            <div className="form-row">
            <div className="form-group">
                            <label>Number of Guests:</label>
                            <input type="number" {...registerTable('guests')} placeholder="Number of guests" />
                            {tableErrors.guests && <p>{tableErrors.guests.message}</p>}
                          </div>

              <div className="form-group">
                <label>Contact Number:</label>
                <input type="text" {...registerTable('contactNo')} placeholder="Enter contact number" />
                {tableErrors.contactNo && <p>{tableErrors.contactNo.message}</p>}
              </div>
            </div>

            <button type="submit" className="submit-button">Submit Table Reservation</button>
          </form>
        )}

        <ConfirmationDialog
          isOpen={showDialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          message={dialogMessage}
        />
      </div>
    </div>
  );
};

export default ReservationForm;
