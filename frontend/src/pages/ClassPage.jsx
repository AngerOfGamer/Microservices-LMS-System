import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const ClassPage = () => {
  const { classId } = useParams(); // Ambil classId dari URL
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memeriksa apakah pengguna sudah login sebelum mengambil data kelas
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // Pengguna tidak login, arahkan ke login
      return; // Hentikan eksekusi lebih lanjut
    }

    // Ambil data kelas berdasarkan classId
    fetch(`http://localhost:5000/api/class/${classId}`, {
      credentials: "include", // Kirim session cookie ke backend
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login"); // Jika status 401, arahkan ke login
        }
        return response.json();
      })
      .then((data) => {
        setClassDetails(data);
        setLoading(false); // Set loading false setelah data diambil
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false); // Set loading false jika terjadi error
      });
  }, [classId, navigate]); // Berjalan setiap kali classId atau navigate berubah

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading...</p>
      ) : classDetails ? (
        <div className="container">
          <h2>{classDetails.class_name}</h2>
          <p>{classDetails.description}</p>
          {/* Tambahkan tab konten atau lainnya di sini */}
        </div>
      ) : (
        <p>No class found.</p> // Jika classDetails tidak ditemukan
      )}
    </div>
  );
};

export default ClassPage;
