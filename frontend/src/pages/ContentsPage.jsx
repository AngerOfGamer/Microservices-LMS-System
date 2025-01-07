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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const { username, role } = storedUser || {};

      if (!username || !role) {
        alert("User tidak valid. Silakan login kembali.");
        return;
      }

      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/content`, {
          params: { class_id: classId },
          headers: { username, role },
          withCredentials: true,
        });
        setContents(res.data);
      } catch (err) {
        console.error("Error fetching contents:", err);
      }
    };

    fetchContents();
  }, [classId]);

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const saveContent = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const { username, role } = storedUser || {};

    if (!username || !role) {
      alert("User tidak valid. Silakan login kembali.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("class_id", newContent.class_id);
      formData.append("content_title", newContent.content_title);
      formData.append("content_description", newContent.content_description);
      formData.append("category", newContent.category);
      if (file) {
        formData.append("file", file);
      }

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/content`, formData, {
        headers: { username, role, "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Konten berhasil ditambahkan!");

      // Refresh data
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/content`, {
        params: { class_id: classId },
        headers: { username, role },
        withCredentials: true,
      });
      setContents(res.data);
    } catch (err) {
      console.error("Error saving content:", err.response?.data || err.message);
      alert("Gagal menambahkan konten.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Content Management</h2>

      {localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role !== "mahasiswa" && (
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Add New Content</h5>
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
                    placeholder="Enter title"
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
                    placeholder="Enter description"
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
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Content
                </button>
              </form>
            </div>
          </div>
        )}

      <h3 className="mb-4">Existing Contents</h3>
      <div className="row">
        {contents.map((content) => (
          <div key={content.content_id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{content.content_title}</h5>
                <p className="card-text text-muted">
                  {content.content_description}
                </p>
                {content.content_url && (
                  <a
                    href={`${process.env.REACT_APP_BACKEND_URL}/${content.content_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link"
                  >
                    View Attachment
                  </a>
                )}
                {content.category === "tugas" && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate("/submission", { state: { classId } })
                    }
                  >
                    Go to Submission
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
