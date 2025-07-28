import React from 'react';
import PropTypes from 'prop-types';

export default function Hero({ title, location, description, cta, image }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title accent-yellow">{title}</h1>
        {location && <h2 className="hero-location">{location}</h2>}
        {description && <p className="hero-description">{description}</p>}
        <button className="hero-cta bg-accent-yellow">{cta}</button>
      </div>
      {image && (
        <div className="hero-image-wrapper">
          <img src={image} alt="Hero visual" className="hero-image rounded-16" />
        </div>
      )}
    </section>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  location: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}; 