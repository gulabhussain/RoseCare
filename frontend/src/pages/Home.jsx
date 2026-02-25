import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "RoseCare Medical Institute | Advanced Care, Trusted Doctors, Compassionate Service"
        }
        subtitle={
          "Delivering world-class healthcare with modern technology, experienced specialists, and patient-centered care."
        }
        imageUrl={"/hero.png"}
      />

      <Biography
        imageUrl={"/about.png"}
        heading={"About RoseCare Medical Institute"}
        text={
          "RoseCare Medical Institute is committed to providing high-quality medical services with a focus on safety, innovation, and compassion. Our experienced doctors and healthcare professionals ensure personalized treatment and continuous care for every patient."
        }
      />

      <Departments
        heading={"Our Specialized Departments"}
        description={
          "We offer comprehensive medical services across multiple specialties, ensuring expert diagnosis and advanced treatment under one roof."
        }
      />

      <MessageForm
        heading={"Get in Touch With Our Medical Team"}
        description={
          "Have questions or need assistance? Send us a message and our support team will respond promptly to help you with appointments, consultations, or medical guidance."
        }
      />
    </>
  );
};

export default Home;