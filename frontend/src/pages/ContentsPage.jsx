import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContentPage = ({ role }) => {
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState({
    class_id: "",
    content_title: "",
    content_description: "",
    category: "materi",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contents
    const fetchContents = async () => {
      try {
        const res = await axios.get("/api/content", { withCredentials: true });
        setContents(res.data);
      } catch (err) {
        console.error("Error fetching contents:", err);
      }
    };
    fetchContents();
  }, []);

  const saveContent = async () => {
    try {
      await axios.post("/api/content", newContent, { withCredentials: true });
      alert("Konten berhasil disimpan!");
      setNewContent({
        class_id: "",
        content_title: "",
        content_description: "",
        category: "materi",
      });
      const updatedContents = await axios.get("/api/content", { withCredentials: true });
      setContents(updatedContents.data);
    } catch (err) {
      console.error("Error saving content:", err);
      alert("Gagal menyimpan konten.");
    }
  };

  const deleteContent = async (contentId) => {
    try {
      await axios.delete(`/api/content/${contentId}`, { withCredentials: true });
      alert("Konten berhasil dihapus!");
      const updatedContents = await axios.get("/api/content", { withCredentials: true });
      setContents(updatedContents.data);
    } catch (err) {
      console.error("Error deleting content:", err);
      alert("Gagal menghapus konten.");
    }
  };

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Content Management</h1>
      {role !== "mahasiswa" && (
        <div className="mb-4">
          <h3>Add New Content</h3>
          <form>
            <div className="mb-3">
              <label className="form-label">Class ID</label>
              <input
                type="text"
                name="class_id"
                value={newContent.class_id}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content Title</label>
              <input
                type="text"
                name="content_title"
                value={newContent.content_title}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content Description</label>
              <textarea
                name="content_description"
                value={newContent.content_description}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
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
            <button type="button" onClick={saveContent} className="btn btn-primary">
              Save Content
            </button>
          </form>
        </div>
      )}
      <h3>Content Records</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            {role !== "mahasiswa" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.content_id}>
              <td>{content.class_id}</td>
              <td>{content.content_title}</td>
              <td>{content.content_description}</td>
              <td>{content.category}</td>
              {role !== "mahasiswa" && (
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => deleteContent(content.content_id)}
                  >
                    Delete
                  </button>
                  {content.category === "tugas" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/submission")}
                    >
                      Submission
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentPage;
