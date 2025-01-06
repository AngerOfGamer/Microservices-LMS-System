import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const SubmissionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classId = location.state?.classId || localStorage.getItem("classId");
  const [taskTitle, setTaskTitle] = useState("");
  const [file, setFile] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role;
  const username = storedUser?.username;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitTask = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("task_title", taskTitle);
    formData.append("class_id", classId);
    if (file) formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/submissions", formData, {
        headers: { username, role, "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // Tampilkan pesan sukses dan arahkan kembali ke halaman ContentPage
      alert("Submission uploaded successfully!");
      navigate(`/content`, { state: { classId } });
    } catch (err) {
      console.error("Error submitting task:", err.response?.data || err.message);
      alert("Failed to submit task.");
    }
  };

  return (
    <div>
    <NavBar />
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">Submit Your Task</h2>
          {role === "mahasiswa" && (
            <form onSubmit={submitTask}>
              <div className="mb-3">
                <label htmlFor="taskTitle" className="form-label">
                  Task Title
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  className="form-control"
                  placeholder="Enter task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Submit Task
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubmissionPage;
