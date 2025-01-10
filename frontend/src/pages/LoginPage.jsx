import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", nip_nim: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5005/auth/login", formData);

      if (response.status === 200) {
        const data = response.data;
        console.log("User data stored in localStorage:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user)); 
        setMessage("Login berhasil!");
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage("Login gagal. Periksa kembali kredensial Anda.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Login</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Masukkan Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nip_nim" className="form-label">NIP/NIM</label>
          <input
            type="text"
            className="form-control"
            id="nip_nim"
            name="nip_nim"
            value={formData.nip_nim}
            onChange={handleChange}
            placeholder="Masukkan NIP/NIM"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
