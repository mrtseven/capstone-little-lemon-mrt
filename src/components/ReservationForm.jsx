import React from 'react';

const ReservationForm = ({ formData, onInputChange, availableTimes, onSubmit, errors, submissionError, onCancel }) => {
  const today = new Date().toISOString().split('T')[0];

  const isFormValid = formData.date &&
                      formData.time &&
                      formData.guests >= 1 &&
                      formData.guests <= 10 &&
                      formData.occasion;

  return (
    <form className="reservation-form" onSubmit={onSubmit}>
      <div className="input-group">
        <label htmlFor="res-date" className="form-label" id="res-date-label">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          className={`form-input ${errors.date ? 'input-error' : ''}`}
          required
          min={today}
          aria-describedby="res-date-label"
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="res-time" className="form-label" id="res-time-label">Choose time</label>
        <select
          id="res-time"
          name="time"
          value={formData.time}
          onChange={onInputChange}
          className={`form-input ${errors.time ? 'input-error' : ''}`}
          required
          aria-describedby="res-time-label"
          aria-live="polite"
        >
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {errors.time && <span className="error-message">{errors.time}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="guests" className="form-label" id="guests-label">Number of guests</label>
        <input
          type="number"
          name="guests"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={formData.guests}
          onChange={onInputChange}
          className={`form-input ${errors.guests ? 'input-error' : ''}`}
          required
          aria-describedby="guests-label"
        />
        {errors.guests && <span className="error-message">{errors.guests}</span>}
      </div>

      <div className="input-group">
        <label htmlFor="occasion" className="form-label" id="occasion-label">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={onInputChange}
          className={`form-input ${errors.occasion ? 'input-error' : ''}`}
          required
          aria-describedby="occasion-label"
        >
          <option value='birthday'>Birthday</option>
          <option value='anniversary'>Anniversary</option>
        </select>
        {errors.occasion && <span className="error-message">{errors.occasion}</span>}
      </div>

      {submissionError && <div className="error-message submission-error">{submissionError}</div>}

      <div className="form-actions">
        <button type="button" className="form-cancel" onClick={onCancel}>Cancel</button>
        <button type="submit"  className="form-submit" disabled={!isFormValid}>Book Now</button>
      </div>
    </form>
  );
};

export default ReservationForm