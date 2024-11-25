import React from "react";
import Slider from "react-slick";
import "../styles/Testimonials.css";

// Import images
import person1 from "../assets/person1.jpg";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.png";

// Updated testimonials data with images
const testimonials = [
  {
    id: 1,
    text: `"Pharmacy Store is my go-to for over-the-counter medications and health products. They have a wide selection, and their website makes it easy to order online. The only improvement I'd suggest is expanding their beauty and skincare section."`,
    author: "Theresa J. Jones",
    age: "24 years old",
    image: person1
  },
  {
    id: 2,
    text: `"I love how efficient the Pharmacy Store team is! My prescriptions are always ready on time, and the staff is super friendly. Highly recommend their services to anyone looking for reliable pharmacy care."`,
    author: "Mark H. Lee",
    age: "30 years old",
    image: person2
  },
  {
    id: 3,
    text: `"Great service and timely delivery! Pharmacy Store has become a trusted partner in managing my family's healthcare needs. The home delivery option has been a lifesaver!"`,
    author: "Sophia R. Carter",
    age: "35 years old",
    image: person3
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true, // Added fade transition for smoother slides
    cssEase: "linear"
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <h4 className="testimonials-subtitle">Review</h4>
          <h2 className="testimonials-title">Testimonials That Inspire Us</h2>
          <p className="testimonials-description">
            Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet
            suscipit nulla. Nullam vitae sit tempus diam.
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-avatar">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.author}'s avatar`}
                  className="avatar-image"
                />
              </div>

              <div className="testimonial-content">
                <blockquote className="testimonial-text">
                  <span className="quote-icon">"</span>
                  {testimonial.text}
                </blockquote>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-age">{testimonial.age}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;