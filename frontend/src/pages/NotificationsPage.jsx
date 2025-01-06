import React, { useState, useEffect } from "react";
import axios from "axios";

const Notification = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [recipientIds, setRecipientIds] = useState("");

  const [role, setRole] = useState(""); // Role pengguna

  useEffect(() => {
    // Fetch role pengguna dan daftar kelas
    const fetchData = async () => {
      try {
        // Ambil role pengguna dari session atau localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setRole(storedUser.role);

        // Hanya dosen yang perlu daftar kelas
        if (storedUser.role === "dosen") {
          const response = await axios.get("http://localhost:5000/api/classes", {
            withCredentials: true,
          });
          setClasses(response.data.classes);
        }
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        alert("Gagal mengambil data.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        content,
        category,
        class_id: role === "dosen" ? classId : null, // Hanya dosen yang mengirim ke kelas tertentu
        recipientIds: recipientIds ? JSON.parse(recipientIds) : null,
      };

      await axios.post("http://localhost:5000/api/notifications", payload, {
        withCredentials: true,
      });

      alert("Notifikasi berhasil dibuat!");
      setTitle("");
      setContent("");
      setCategory("");
      setClassId("");
      setRecipientIds("");
    } catch (err) {
      console.error("Gagal membuat notifikasi:", err);
      alert("Gagal membuat notifikasi.");
    }
  };

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
        {role !== "mahasiswa" && (
          <div className="mb-3">
            <label className="form-label">Penerima (JSON Array)</label>
            <input
              type="text"
              className="form-control"
              value={recipientIds}
              onChange={(e) => setRecipientIds(e.target.value)}
              placeholder='Contoh: ["1", "2", "3"]'
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Buat Notifikasi
        </button>
      </form>
    </div>
  );
};

export default Notification;
