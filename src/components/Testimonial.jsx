import React from 'react';
import PropTypes from 'prop-types';

export default function Testimonial({ rating, image, name, text }) {
  return (
    <div className="testimonial-card rounded-16">
      <div className="testimonial-rating">{rating}</div>
      <div className="testimonial-row">
        <img src={image} alt={name} className="testimonial-img" />
        <span className="testimonial-name">{name}</span>
      </div>
      <p className="testimonial-text">{text}</p>
    </div>
  );
}

Testimonial.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}; 