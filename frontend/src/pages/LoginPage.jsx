
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [nip_nim, setNipNim] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Kirim session cookie ke backend
        body: JSON.stringify({ username, nip_nim }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login berhasil:", data);

        // Simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Arahkan pengguna ke halaman yang sesuai
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.error || errorData.message); // Tampilkan pesan error
      }
    } catch (err) {
      console.error("Error saat login:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Login</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Masukkan Username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nipNim" className="form-label">
            NIP/NIM
          </label>
          <input
            id="nipNim"
            type="text"
            placeholder="Masukkan NIP/NIM"
            className="form-control"
            value={nip_nim}
            onChange={(e) => setNipNim(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="btn btn-primary w-100"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
