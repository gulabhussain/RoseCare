import React from "react";

const Biography = ({
  imageUrl,
  heading = "Who We Are",
  text,
  mission,
  vision,
}) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>

      <div className="banner">
        <p style={{ color: "#9083d5", fontWeight: "600" }}>
          About RoseCare
        </p>

        <h3>{heading}</h3>

        <p>
          {text ||
            "RoseCare Medical Institute is a trusted multi-specialty healthcare center dedicated to providing advanced medical treatment with compassion and integrity. Our experienced doctors, modern facilities, and patient-first approach ensure safe and effective care for individuals and families."}
        </p>

        <p>
          We combine medical excellence with cutting-edge technology to deliver
          accurate diagnosis, personalized treatment plans, and continuous
          support throughout every stage of recovery.
        </p>

        {mission && (
          <>
            <h4 style={{ marginTop: "15px" }}>Our Mission</h4>
            <p>{mission}</p>
          </>
        )}

        {vision && (
          <>
            <h4 style={{ marginTop: "15px" }}>Our Vision</h4>
            <p>{vision}</p>
          </>
        )}

        <p>
          With a commitment to quality, safety, and innovation, RoseCare
          Medical Institute continues to serve the community with dedication
          and excellence in healthcare services.
        </p>
      </div>
    </div>
  );
};

export default Biography;