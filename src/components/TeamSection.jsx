import React from "react";
import Slider from "react-slick";
import "../styles/TeamSection.css";

import "../assets/emily.jpg";


// Sample team data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Emily Roberts, PharmD",
    position: "Chief Pharmacist",
    experience: "Work experience - 15 years",
    image: "../assets/emily.jpg", // Replace with actual image path
  },
  {
    id: 2,
    name: "Dr. Michael Chang, MD",
    position: "Medical Advisor",
    experience: "Work experience - 12 years",
    image: "vite.svg", // Replace with actual image path
  },
  {
    id: 3,
    name: "Lisa Davis, RN, BSN",
    position: "Director of Health Services",
    experience: "Work experience - 8 years",
    image: "vite.svg", // Replace with actual image path
  },
  {
    id: 4,
    name: "John Williams, PharmD",
    position: "Pharmacy Supervisor",
    experience: "Work experience - 10 years",
    image: "vite.svg", // Replace with actual image path
  },
  {
    id: 5,
    name: "Sarah Miller, MD",
    position: "Healthcare Specialist",
    experience: "Work experience - 9 years",
    image: "vite.svg", // Replace with actual image path
  },
];

const TeamSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Number of visible slides
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time in milliseconds (3 seconds)
    pauseOnHover: true, // Pause autoplay when hovered
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="team-section">
      <div className="team-container">
        {/* Header */}
        <div className="team-header">
          <h4 className="team-subtitle">Team</h4>
          <h2 className="team-title">The Heart of Our Pharmacy</h2>
          <p className="team-description">
            Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit nulla. Nullam vitae sit tempus diam.
          </p>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image-container">
                <img src={member.image} alt={member.name} className="team-image" />
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-experience">{member.experience}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TeamSection;
