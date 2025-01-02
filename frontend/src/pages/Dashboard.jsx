import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/class`); // Navigasi ke halaman kelas dengan ID 1
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
            <div className="card-body">
              <h5 className="card-title">Mathematics 101</h5>
              <p className="card-text">Click to view contents, attendance, and submissions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
