import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NotificationsPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser || !storedUser.username || !storedUser.role) {
          console.error("User tidak valid.");
          setError("User tidak valid. Silakan login kembali.");
          return;
        }

        setRole(storedUser.role);

        if (storedUser.role === "dosen") {
          const response = await axios.get(`http://localhost:5003/notification/classes`, {
            headers: { username: storedUser.username, role: storedUser.role },
          });
          setClasses(response.data.classes);
        } else if (storedUser.role === "mahasiswa") {
          const response = await axios.get(`http://localhost:5003/notification`, {
            headers: { username: storedUser.username, role: storedUser.role },
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category || (role === "dosen" && !classId)) {
      alert("Judul, konten, kategori, dan ID kelas wajib diisi.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const payload = {
      title,
      content,
      category,
      class_id: classId || null,
    };

    try {
      await axios.post(`http://localhost:5003/notification`, payload, {
        headers: { username: storedUser.username, role: storedUser.role },
      });
      alert("Notifikasi berhasil dibuat!");
      setTitle("");
      setContent("");
      setCategory("");
      setClassId("");
    } catch (err) {
      console.error("Gagal membuat notifikasi:", err.response?.data || err.message);
      alert("Gagal membuat notifikasi.");
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
        {error && <p className="text-danger">{error}</p>}
        {notifications.length > 0 ? (
          <ul className="list-group">
            {notifications.map((notif) => (
              <li key={notif._id} className="list-group-item">
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
                <option key={cls._id} value={cls._id}>
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
              </>
            )}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Buat Notifikasi
        </button>
      </form>
    </div>
  );
};

export default NotificationsPage;