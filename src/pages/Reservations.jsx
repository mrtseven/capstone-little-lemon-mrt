import React, { useState, useReducer, useEffect } from 'react';
import ReservationForm from '../components/ReservationForm';
import { fetchAPI, submitAPI } from '../bookingsAPI';
import ConfirmedReservation from '../components/ConfirmedReservation';
import { useNavigate } from 'react-router-dom';

export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES') {
    return fetchAPI(new Date(action.payload));
  }
  return state;
};

export const initializeTimes = () => {
  return fetchAPI(new Date());
};

export default function Reservations() {
  const [formData, setFormData] = useState(()=>{
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : {
      date: '',
      time: '17:00',
      guests: 1,
      occasion: 'birthday',
    };
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);

  const validateField = (name, value) => {
      switch (name) {
          case 'date':
              return value ? '' : 'Date is required.';
          case 'time':
              return value ? '' : 'Time is required.';
          case 'guests':
              const numGuests = Number(value);
              if (numGuests < 1) return 'Must be at least 1 guest.';
              if (numGuests > 10) return 'Cannot exceed 10 guests.';
              return '';
          case 'occasion':
              return value ? '' : 'Occasion is required.';
          default:
              return '';
      }
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
      if (name === 'date') {
        dispatch({ type: 'UPDATE_TIMES', payload: value });
      }
      if (submissionError) {
        setSubmissionError(null);
      }
  };

  const handleCancel = () => {
    setFormData({
      date: '',
      time: '17:00',
      guests: 1,
      occasion: 'birthday',
    });
    setErrors({});
    setSubmissionError(null);
    localStorage.removeItem('formData');
    // Optional: navigate back to home page
    // navigate('/');
  };

  const validateForm = () => {
      const newErrors = {};
      for (const key in formData) {
          const error = validateField(key, formData[key]);
          if (error) {
              newErrors[key] = error;
          }
      }
      return newErrors;
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  useEffect(() => {
    if (availableTimes && availableTimes.length > 0 && !formData.time) {
        setFormData(prev => ({ ...prev, time: availableTimes[0] }));
    }
  }, [availableTimes]);


  // Handler to update form data from inputs
  // const handleInput = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  //   if (name === 'date') {
  //     dispatch({ type: 'UPDATE_TIMES', payload: value });
  //   }
  // };
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);
  // You can also handle submit here
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const success = submitAPI(formData);
    if (success) {
      setIsSubmitted(true);
      localStorage.removeItem('formData');
    } else {
      setSubmissionError("We're sorry, but we couldn't process your reservation at this time. Please try again later.");
    }
  };

  return (
    <main className="container">
      <h1>Reservations</h1>
      {isSubmitted ? (
        <ConfirmedReservation />
      ) : (
        <ReservationForm
          formData={formData}
          availableTimes={availableTimes}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          errors={errors}
          submissionError={submissionError}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
} 