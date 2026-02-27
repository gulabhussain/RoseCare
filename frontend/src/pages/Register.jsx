import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhar, setAdhar] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      return toast.error("Mobile number must be 10 digits");
    }

    if (adhar.length !== 12) {
      return toast.error("Aadhaar number must be 12 digits");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/api/v1/user/patient/register`,
        {
          firstName,
          lastName,
          email,
          phone,
          adhar,
          dob,
          gender,
          password,
          role: "patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAdhar("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component register-form">
      <h2>Create Patient Account 🏥</h2>
      <p style={{ fontWeight: "600" }}>
        Register to manage your healthcare digitally
      </p>
      <p>
        Create your secure account to book appointments, access medical
        records, receive prescriptions online, and stay connected with
        certified doctors anytime, anywhere.
      </p>

      <form onSubmit={handleRegistration}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Aadhaar Number"
            maxLength={12}
            value={adhar}
            onChange={(e) => setAdhar(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="D O B"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <div>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            gap: "10px",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ marginBottom: 0 }}>
            Already have an account?
          </p>
          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "#271776ca",
              fontWeight: "600",
            }}
          >
            Login Here
          </Link>
        </div>

        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
