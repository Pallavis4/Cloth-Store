import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = users.some((user) => user.email === formData.email);
    if (userExists) {
      alert("User already exists! Please log in.");
      navigate("/login");
      return;
    }

    // Add new user
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    navigate("/login");
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        /><br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
