import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import ContentPage from "./ContentsPage";
import AttendancePage from "./AttendancePage";
import "bootstrap/dist/css/bootstrap.min.css";

const ClassPage = () => {
  const { class_id } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("contents");

  useEffect(() => {
    const fetchClassDetails = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5002/class/${class_id}`, {
          headers: {
            username: user.username,
            role: user.role,
          },
        });
        setClassDetails(response.data.class);
        setMembers(response.data.members || []);
      } catch (err) {
        console.error("Error fetching class details:", err);
        setError("Gagal memuat detail kelas.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [class_id, navigate]);

  if (loading) return <p>Memuat data kelas...</p>;

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2>{classDetails.class_name}</h2>
        <p>{classDetails.description}</p>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "contents" ? "active" : ""}`}
              onClick={() => setActiveTab("contents")}
            >
              Konten
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "attendance" ? "active" : ""}`}
              onClick={() => setActiveTab("attendance")}
            >
              Kehadiran
            </button>
          </li>
        </ul>

        <div className="mt-4">
          {activeTab === "contents" && <ContentPage classId={class_id} />}
          {activeTab === "attendance" && <AttendancePage classId={class_id} />}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
