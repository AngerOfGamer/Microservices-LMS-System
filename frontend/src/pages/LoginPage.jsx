import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [nipNim, setNipNim] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Kirim session cookie ke backend
        body: JSON.stringify({ username, nip_nim: nipNim }), // Data login
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login berhasil:", data);

        // Simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigasi ke dashboard
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Tampilkan pesan error
      }
    } catch (err) {
      console.error("Error saat login:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="NIP/NIM"
          className="border p-2 w-full mb-4"
          value={nipNim}
          onChange={(e) => setNipNim(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
