import React, { useState } from 'react'
import Hero from '../components/Hero'
import DishCard from '../components/DishCard'
import Testimonial from '../components/Testimonial'

const specials = [
  {
    image: process.env.PUBLIC_URL + '/greek-salad.jpg',
    title: 'Greek salad',
    price: '$12.99',
    description: 'A refreshing mix of crispy lettuce, peppers, olives, and our signature Chicago-style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    cta: 'Order a delivery',
  },
  {
    image: process.env.PUBLIC_URL + '/bruschetta.svg',
    title: 'Bruschetta',
    price: '$5.99',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. A classic Italian appetizer.',
    cta: 'Order a delivery',
  },
  {
    image: process.env.PUBLIC_URL + '/lemon-dessert.jpg',
    title: 'Lemon Dessert',
    price: '$5.00',
    description: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
    cta: 'Order a delivery',
  },
]

const testimonials = [
  {
    rating: '★★★★★',
    image: process.env.PUBLIC_URL + '/greek-salad.jpg',
    name: 'Anna',
    text: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
  },
  {
    rating: '★★★★☆',
    image: process.env.PUBLIC_URL + '/bruschetta.svg',
    name: 'John',
    text: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
  },
  {
    rating: '★★★★★',
    image: process.env.PUBLIC_URL + '/lemon-dessert.jpg',
    name: 'Maria',
    text: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
  },
  {
    rating: '★★★★☆',
    image: process.env.PUBLIC_URL + '/restaurant.jpg',
    name: 'Luca',
    text: 'Amazing food and great service! Highly recommend the Lemon Dessert.',
  },
  {
    rating: '★★★★★',
    image: process.env.PUBLIC_URL + '/greek-salad.jpg',
    name: 'Sophia',
    text: 'Best Greek salad in town! Fresh and delicious.',
  },
]

export default function Main() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(testimonialIndex, testimonialIndex + 3);

  const handlePrev = () => {
    setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 3 : prev - 1));
  };
  const handleNext = () => {
    setTestimonialIndex((prev) => (prev + 3 >= testimonials.length ? 0 : prev + 1));
  };

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <Hero
            title="Little Lemon"
            location="Chicago"
            description="We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist."
            cta="Reserve a Table"
            image={process.env.PUBLIC_URL + '/restaurant.jpg'}
          />
        </div>
      </section>
      <section className="specials-section">
        <div className="container">
          <div className="specials-header-row">
            <h2 className="specials-title">Specials</h2>
            <button className="specials-menu-btn bg-accent-yellow">Online Menu</button>
          </div>
          <div className="specials-cards-row">
            {specials.slice(0, 3).map((dish, idx) => (
              <DishCard key={dish.title} {...dish} />
            ))}
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <div className="container">
          <h2 className="specials-title" style={{color:'#2222'}}>Testimonials</h2>
          <div className="testimonials-carousel">
            {visibleTestimonials.map((t, idx) => (
              <Testimonial key={t.name + idx} {...t} />
            ))}
          </div>
          <div className="testimonials-carousel-controls">
            <button className="testimonials-carousel-btn" onClick={handlePrev} aria-label="Previous testimonials">&#8592;</button>
            <button className="testimonials-carousel-btn" onClick={handleNext} aria-label="Next testimonials">&#8594;</button>
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="container about-container">
          <div className="about-text">
            <h2 className="about-title">Little Lemon</h2>
            <h3 className="about-subtitle">Chicago</h3>
            <p>Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. The restaurant features a locally-sourced menu with daily specials.</p>
          </div>
          <div className="about-images">
            <img src={process.env.PUBLIC_URL + '/Mario-and-Adrian-B.jpg'} alt="About 2" className="about-img about-img-bottom" />
            <img src={process.env.PUBLIC_URL + '/Mario-and-Adrian-A.jpg'} alt="About 1" className="about-img about-img-top" />
          
          </div>
        </div>
      </section>
    </main>
  )
}
