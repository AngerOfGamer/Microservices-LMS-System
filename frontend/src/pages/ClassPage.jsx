import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ContentPage from "./ContentsPage";
import AttendancePage from "./AttendancePage";

const ClassPage = () => {
  const [activeTab, setActiveTab] = useState("contents");

  return (
    <div>
      <NavBar />
      {/* Tabs Navigation */}
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

      {/* Tab Contents */}
      <div>
        {activeTab === "contents" && <ContentPage />}
        {activeTab === "attendance" && <AttendancePage />}
      </div>
    </div>
  );
};

export default ClassPage;