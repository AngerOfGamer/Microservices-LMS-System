import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentPage from "./ContentsPage";
import AttendancePage from "./AttendancePage";

const ClassPage = () => {
  const { class_id } = useParams(); // Ambil class_id dari URL
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Tambahkan state untuk error handling
  const [activeTab, setActiveTab] = useState("contents");

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classes/${class_id}`, {
          credentials: "include",
        });

        // Periksa apakah respons adalah JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Respons bukan JSON");
        }

        if (response.ok) {
          const data = await response.json();
          setClassDetails(data.class); // Pastikan struktur data cocok
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Gagal memuat data kelas");
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
        setError("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [class_id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : classDetails ? (
        <div>
          <h2>{classDetails.class_name}</h2>
          <p>{classDetails.description}</p>

          {/* Tabs Navigation */}
          <div>
            <button onClick={() => setActiveTab("contents")}>Contents</button>
            <button onClick={() => setActiveTab("attendance")}>Attendance</button>
          </div>

          {/* Render Tab Content */}
          {activeTab === "contents" && <ContentPage classId={class_id} />}
          {activeTab === "attendance" && <AttendancePage classId={class_id} />}
        </div>
      ) : (
        <p>No class found.</p>
      )}
    </div>
  );
};

export default ClassPage;
