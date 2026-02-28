import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API_URL;

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAadhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          `${API}/api/v1/appointment/public-doctors`
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error("Failed to load doctors");
      }
    };
    fetchDoctors();
  }, []);

  // SUBMIT APPOINTMENT
  const handleAppointment = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      return toast.error("Mobile number must be 10 digits");
    }

    if (adhar.length !== 12) {
      return toast.error("Aadhaar number must be 12 digits");
    }

    if (!selectedDoctorId) {
      return toast.error("Please select a doctor");
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API}/api/v1/appointment/post`,
        {
          firstName,
          lastName,
          email,
          phone,
          adhar,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);

      // Reset Form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAadhar("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setSelectedDoctorId("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Book Your Consultation</h2>
      <p style={{ color: "gray", marginBottom: "30px" }}>
        Fill in the details below to schedule your appointment with our
        certified medical specialists.
      </p>

      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Aadhaar Number"
            maxLength={12}
            value={adhar}
            required
            onChange={(e) => setAadhar(e.target.value)}
          />
          <input
            type="date"
             placeholder="DOB"
            value={dob}
            required
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <select value={gender} required onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="date"
            placeholder="Appointment"
            value={appointmentDate}
            required
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setSelectedDoctorId("");
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>

          <select
            value={selectedDoctorId}
            required
            onChange={(e) => {
              const doctorId = e.target.value;
              setSelectedDoctorId(doctorId);

              const selectedDoctor = doctors.find(
                (doc) => doc._id === doctorId
              );

              if (selectedDoctor) {
                setDoctorFirstName(selectedDoctor.firstName);
                setDoctorLastName(selectedDoctor.lastName);
              }
            }}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter(
                (doctor) =>
                  doctor.doctorDepartment?.toLowerCase() ===
                  department.toLowerCase()
              )
              .map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>

        <textarea
          rows="5"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Full Residential Address"
        />

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p style={{ margin: 0 }}>Have you visited us before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Booking Appointment..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
