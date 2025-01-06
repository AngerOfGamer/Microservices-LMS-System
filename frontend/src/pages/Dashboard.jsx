import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);

        try {
          const response = await fetch(
            `http://localhost:5000/api/classes?user_id=${userData.user_id}`,
            { method: "GET", credentials: "include" }
          );

          if (response.ok) {
            const data = await response.json();
            setClasses(data.classes || []);
          } else {
            const errorData = await response.json();
            setError(errorData.message || "Gagal memuat kelas");
          }
        } catch (err) {
          console.error("Error fetching classes:", err);
          setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  if (!user) return null;
  
  const handleCardClick = (classId) => {
    navigate(`/class/${classId}`);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        {loading && <p className="text-center">Memuat data kelas...</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && (
          <>
            {user.role === "admin" && (
              <button
                className="btn btn-primary mb-4"
                onClick={() => navigate("/createClass")}
              >
                Buat Kelas
              </button>
            )}

            <div className="row">
              {classes.length === 0 ? (
                <p className="text-center">Tidak ada kelas yang tersedia.</p>
              ) : (
                classes.map((classItem) => (
                  <div
                    key={classItem.class_id}
                    className="col-md-4 mb-4"
                  >
                    <div
                      className="card shadow-sm h-100"
                      onClick={() => handleCardClick(classItem.class_id)}
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="card-img-top"
                        style={{
                          height: "150px",
                          background: `url('https://via.placeholder.com/300x150') no-repeat center center`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                      <div className="card-body">
                        <h5 className="card-title fw-bold">
                          {classItem.class_name}
                        </h5>
                        <p className="card-text text-muted">
                          {classItem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
