import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ContentPage = ({ classId }) => {
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState({
    class_id: classId || "",
    content_title: "",
    content_description: "",
    category: "materi",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan daftar konten
  const fetchContents = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const { username, role } = storedUser || {};

    if (!username || !role) {
      alert("User tidak valid. Silakan login kembali.");
      navigate("/login");
      return;
    }

    if (!classId) {
      setError("Class ID is required.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5006/content", {
        params: { class_id: classId },
        headers: { username, role },
        withCredentials: true,
      });
      setContents(res.data);
      setRole(role); // Set role dari user
    } catch (err) {
      console.error("Error fetching contents:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Gagal memuat konten.");
    }
  };

  // Jalankan fetchContents saat komponen dimuat atau classId berubah
  useEffect(() => {
    fetchContents();
  }, [classId, navigate]);

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fungsi untuk menyimpan konten baru
  const saveContent = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const { username, role } = storedUser || {};

    if (!username || !role) {
      alert("User tidak valid. Silakan login kembali.");
      return;
    }

    if (!newContent.class_id) {
      setError("Class ID is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("class_id", newContent.class_id);
      formData.append("content_title", newContent.content_title);
      formData.append("content_description", newContent.content_description);
      formData.append("category", newContent.category);
      if (file) formData.append("file", file);

      await axios.post("http://localhost:5006/content", formData, {
        headers: { username, role, "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setSuccess("Konten berhasil ditambahkan!");
      setNewContent({
        class_id: classId || "",
        content_title: "",
        content_description: "",
        category: "materi",
      });
      setFile(null);

      fetchContents(); // Refresh contents setelah menyimpan konten
    } catch (err) {
      console.error("Error saving content:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Gagal menambahkan konten.");
    }
  };

  const handleNavigateToSubmission = (taskId) => {
    if (!taskId) {
      alert("Task ID tidak ditemukan!");
      return;
    }
    localStorage.setItem("taskId", taskId); // Simpan taskId ke localStorage
    navigate("/submission");
  };

  // Komponen khusus mahasiswa
  const StudentContentPage = ({ contents }) => (
    <div>
      <h3>Existing Contents</h3>
      <div className="row">
        {contents.map((content) => (
          <div key={content._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{content.content_title}</h5>
                <p className="card-text">{content.content_description}</p>
                {content.content_url && (
                  <a
                    href={`http://localhost:5006${content.content_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Attachment
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render berdasarkan role
  if (role === "mahasiswa") {
    return <StudentContentPage contents={contents} />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Content Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Form create content untuk admin/dosen */}
      {(role === "admin" || role === "dosen") && (
        <form onSubmit={saveContent}>
          <div className="mb-3">
            <label htmlFor="content_title" className="form-label">
              Content Title
            </label>
            <input
              type="text"
              name="content_title"
              value={newContent.content_title}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content_description" className="form-label">
              Content Description
            </label>
            <textarea
              name="content_description"
              value={newContent.content_description}
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              value={newContent.category}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="materi">Materi</option>
              <option value="tugas">Tugas</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File Attachment
            </label>
            <input type="file" onChange={handleFileChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Content
          </button>
        </form>
      )}

      <h3 className="mt-5">Existing Contents</h3>
      <div className="row">
        {contents.map((content) => (
          <div key={content._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{content.content_title}</h5>
                <p className="card-text">{content.content_description}</p>
                {content.content_url && (
                  <a
                    href={`http://localhost:5006${content.content_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Attachment
                  </a>
                )}
                {content.category === "tugas" && (
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => handleNavigateToSubmission(content._id)}
                  >
                    Submission
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
