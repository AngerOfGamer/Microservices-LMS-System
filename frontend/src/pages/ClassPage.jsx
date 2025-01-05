import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentPage from "./ContentsPage";
import AttendancePage from "./AttendancePage";

const ClassPage = () => {
  const { class_id } = useParams(); // Ambil class_id dari URL
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("contents");

  useEffect(() => {
    // Fetch data kelas berdasarkan class_id
    fetch(`http://localhost:5000/api/class/${class_id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setClassDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching class details:", error);
        setLoading(false);
      });
  }, [class_id]); // Pastikan hanya class_id yang ada di dependency array

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : classDetails ? (
        <div>
          <h2>{classDetails.class_name}</h2>
          <p>{classDetails.description}</p>

          {/* Tabs Navigation */}
          <div>
            <button onClick={() => setActiveTab("contents")}>
              Contents
            </button>
            <button onClick={() => setActiveTab("attendance")}>
              Attendance
            </button>
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
