import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            RoseCare Medical Institute is a modern healthcare facility dedicated
            to delivering high-quality medical services with compassion and
            excellence. Our experienced doctors and medical staff provide
            personalized treatment plans tailored to each patient's unique needs.
            We focus on ensuring comfort, safety, and a seamless healthcare
            experience for every individual who walks through our doors.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;