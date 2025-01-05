import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const ClassPage = () => {
  const { classId } = useParams();  // Ambil classId dari URL
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    // Memeriksa apakah pengguna sudah login sebelum mengambil data kelas
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // Pengguna tidak login, arahkan ke login
    }

    // Ambil data kelas berdasarkan classId
    fetch(`http://localhost:5000/api/class/${classId}`, {
      credentials: "include",  // Kirim session cookie ke backend
    })
      .then((response) => response.json())
      .then((data) => setClassDetails(data))
      .catch((error) => console.error("Error fetching class details:", error));
  }, [classId, navigate]);  // Berjalan setiap kali classId atau navigate berubah

  return (
    <div>
      <NavBar />
      {classDetails ? (
        <div className="container">
          <h2>{classDetails.class_name}</h2>
          <p>{classDetails.description}</p>
          {/* Tambahkan tab konten atau lainnya di sini */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClassPage;
