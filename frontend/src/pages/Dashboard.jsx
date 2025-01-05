import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Data user dari localStorage
  const [classes, setClasses] = useState([]); // Data kelas
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(""); // Pesan error

  // Ambil data user dari localStorage dan data kelas
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchClasses(parsedUser.role);
    } else {
      navigate("/login"); // Arahkan ke halaman login jika belum login
    }
  }, [navigate]);

  // Fungsi fetch kelas berdasarkan role user
  const fetchClasses = async (role) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes`, {
        method: "GET",
        credentials: "include", // Kirim session cookie
      });

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
      setLoading(false); // Matikan loading
    }
  };

  // Fungsi logout
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user"); // Hapus data user di localStorage
      navigate("/login"); // Arahkan ke halaman login
    } catch (err) {
      console.error("Error saat logout:", err);
      setError("Gagal logout. Silakan coba lagi.");
    }
  };

  if (!user) return null; // Tampilkan kosong jika user belum ada

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Selamat Datang, {user.username} ({user.role})
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {loading && <p>Memuat data kelas...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <>
          {/* Fitur Admin: Buat Kelas */}
          {user.role === "admin" && (
            <div>
              <button
                onClick={() => navigate("/create-class")}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              >
                Buat Kelas
              </button>
            </div>
          )}

          {/* Fitur Dosen/Mahasiswa: Tampilkan Kelas */}
          <h2 className="text-xl font-bold mb-4">
            {user.role === "admin" ? "Semua Kelas" : "Kelas yang Anda Ikuti"}
          </h2>
          {classes.length === 0 ? (
            <p>Tidak ada kelas yang tersedia.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((classItem) => (
                <div
                  key={classItem.class_id}
                  className="bg-white shadow-lg rounded-lg p-4"
                >
                  <h3 className="text-lg font-bold">{classItem.class_name}</h3>
                  <p>{classItem.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardPage;
