import React, { useState, useEffect } from "react";
import axios from "axios";

const Notification = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [role, setRole] = useState(""); // Role pengguna
  const [notifications, setNotifications] = useState([]); // Notifikasi untuk mahasiswa
  const [error, setError] = useState(""); // Error saat mengambil data
  const [loading, setLoading] = useState(true); // Status loading
  const [isSubmitting, setIsSubmitting] = useState(false); // Status pengiriman data

  // Ambil data user dari localStorage dan fetch data sesuai role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.role) {
          alert("Anda belum login. Silakan login terlebih dahulu.");
          window.location.href = "/login"; // Redirect ke halaman login
          return;
        }

        setRole(storedUser.role);

        if (storedUser.role === "dosen") {
          const response = await axios.get("http://localhost:5000/api/classes", {
            withCredentials: true,
          });
          setClasses(response.data.classes);
        } else if (storedUser.role === "mahasiswa") {
          const response = await axios.get("http://localhost:5000/api/notifications", {
            withCredentials: true,
          });
          setNotifications(response.data.notifications);
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err.response?.data || err.message);
        setError("Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk membuat notifikasi baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validasi input
    if (!title || !content || !category || (role === "dosen" && !classId)) {
      alert("Semua field wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title,
      content,
      category,
      ...(role === "dosen" && { class_id: classId }),
    };

    console.log("Payload yang dikirim:", payload);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/notifications",
        payload,
        { withCredentials: true }
      );

      alert("Notifikasi berhasil dibuat!");
      setTitle("");
      setContent("");
      setCategory("");
      setClassId("");
    } catch (err) {
      console.error("Gagal membuat notifikasi:", err.response?.data || err.message);
      alert("Gagal membuat notifikasi. " + (err.response?.data?.message || ""));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Notifikasi</h2>
        <p>Sedang memuat data...</p>
      </div>
    );
  }

  if (role === "mahasiswa") {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Notifikasi</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {notifications.length > 0 ? (
          <ul className="list-group">
            {notifications.map((notif) => (
              <li key={notif.notification_id} className="list-group-item">
                <h5>{notif.title}</h5>
                <p>{notif.content}</p>
                <small className="text-muted">
                  {new Date(notif.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada notifikasi untuk Anda saat ini.</p>
        )}
      </div>
    );
  }

  if (role === "dosen" && classes.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Tidak Ada Kelas</h2>
        <p>Anda belum terdaftar sebagai pengajar di kelas mana pun.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Buat Notifikasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Konten</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        {role === "dosen" && (
          <div className="mb-3">
            <label className="form-label">Kelas</label>
            <select
              className="form-select"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              required
            >
              <option value="">Pilih Kelas</option>
              {classes.map((cls) => (
                <option key={cls.class_id} value={cls.class_id}>
                  {cls.class_name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Pilih Kategori</option>
            {role === "admin" && <option value="libur">Libur</option>}
            {role === "dosen" && (
              <>
                <option value="materi">Materi</option>
                <option value="tugas">Tugas</option>
                <option value="penilaian">Penilaian</option>
              </>
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Mengirim..." : "Buat Notifikasi"}
        </button>
      </form>
    </div>
  );
};

export default Notification;
