import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/class`); // Navigasi ke halaman kelas (atau tambahkan logika sesuai kebutuhan)
  };

  const handleAddClassClick = () => {
    navigate(`/createClass`); // Path sesuai dengan yang didefinisikan di classRoutes.js
  };

  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          >
          </div>
        </div>
      </div>

      {/* Tombol Tambah */}
      <button
        onClick={handleAddClassClick}
        className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;
