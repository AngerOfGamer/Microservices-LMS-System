import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentPage from "./ContentsPage";
import AttendancePage from "./AttendancePage";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

const ClassPage = () => {
  const { class_id } = useParams(); 
  const navigate = useNavigate();
  
  const [role, setRole] = useState(null); 
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 
  const [activeTab, setActiveTab] = useState("contents");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRole(user.role); 
    } else {
      navigate("/login");
    }

    const fetchClassData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classes/${class_id}`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setClassDetails(data.class); 
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
  }, [class_id, navigate]);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : classDetails ? (
          <div>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h2 className="card-title fw-bold">{classDetails.class_name}</h2>
                <p className="card-text text-muted">{classDetails.description}</p>
              </div>
            </div>

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "contents" ? "active" : ""}`}
                  onClick={() => setActiveTab("contents")}
                >
                  Contents
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "attendance" ? "active" : ""}`}
                  onClick={() => setActiveTab("attendance")}
                >
                  Attendance
                </button>
              </li>
            </ul>

            <div className="tab-content">
              {activeTab === "contents" && (
                <div className="tab-pane fade show active">
                  <ContentPage role={role} classId={class_id} />
                </div>
              )}
              {activeTab === "attendance" && (
                <div className="tab-pane fade show active">
                  <AttendancePage role={role} classId={class_id} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center">No class found.</p>
        )}
      </div>
    </div>
  );
};

export default ClassPage;
