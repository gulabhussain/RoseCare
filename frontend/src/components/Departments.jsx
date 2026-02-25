import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      id: 1,
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      id: 2,
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      id: 3,
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      id: 4,
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      id: 5,
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      id: 6,
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      id: 7,
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      id: 8,
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      id: 9,
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="container departments">
      <div className="departments-header">
        <h2>Our Medical Departments</h2>
        <p>Explore our specialized healthcare services</p>
        <br/>
        <br/>

      </div>

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        showDots={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {departmentsArray.map((department) => (
          <div key={department.id} className="card">
            <div className="depart-name">{department.name}</div>

            <img
              src={department.imageUrl}
              alt={department.name}
              className="depart-image"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Departments;