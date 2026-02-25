import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={
          "About RoseCare Medical Institute | Excellence in Healthcare & Patient Care"
        }
        subtitle={
          "Committed to delivering compassionate, innovative, and reliable medical services for every patient."
        }
        imageUrl={"/about.png"}
      />

      <Biography
        imageUrl={"/whoweare.png"}
        heading={"Who We Are"}
        text={
          "RoseCare Medical Institute is a multi-specialty healthcare center dedicated to providing high-quality medical services with integrity and compassion. Our experienced doctors, modern facilities, and patient-first approach ensure that every individual receives personalized and effective treatment."
        }
        mission={
          "To provide accessible, affordable, and advanced healthcare services while maintaining the highest standards of medical excellence and ethical practice."
        }
        vision={
          "To become a trusted healthcare leader recognized for innovation, patient satisfaction, and continuous medical advancement."
        }
      />
    </>
  );
};

export default AboutUs;