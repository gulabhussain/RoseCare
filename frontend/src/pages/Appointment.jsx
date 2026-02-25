import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <Hero
        title={
          "Book an Appointment | RoseCare Medical Institute"
        }
        subtitle={
          "Schedule your consultation with our experienced specialists quickly and securely."
        }
        imageUrl={"/signin.png"}
      />

      <div className="container" style={{ marginTop: "40px" }}>
        <p style={{ fontWeight: "600", textAlign: "center" }}>
          Choose your preferred department, doctor, and time slot to receive
          personalized medical care from our expert healthcare professionals.
        </p>

        <p style={{ textAlign: "center", marginTop: "10px", color: "gray" }}>
          For emergency cases, please contact our 24/7 emergency helpline
          immediately instead of booking an online appointment.
        </p>
      </div>

      <AppointmentForm />
    </>
  );
};

export default Appointment;