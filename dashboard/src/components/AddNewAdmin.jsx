import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";
import "./AddNewAdmin.css"

const AddNewAdmin = () => {
  const { isAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adhar: "",
    dob: "",
    gender: "",
    password: "",
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();

    try {
     const { data } = await API.post(
          "/api/v1/user/admin/addnew",
          formData
        );

      toast.success(data.message);
      navigateTo("/");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        adhar: "",
        dob: "",
        gender: "",
        password: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">Add New Admin</h1>

        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="adhar"
              placeholder="Aadhar Number"
              value={formData.adhar}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              placeholder="DOB"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
