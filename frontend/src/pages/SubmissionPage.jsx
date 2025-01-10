import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const SubmissionPage = () => {
  const navigate = useNavigate();
  const classId = localStorage.getItem("classId"); // Ambil class_id dari localStorage
  const [taskTitle, setTaskTitle] = useState("");
  const [file, setFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role;
  const username = storedUser?.username;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/submission`, {
          params: { class_id: classId },
          headers: { username, role },
          withCredentials: true,
        });
        setSubmissions(response.data);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
        setError("Failed to load submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (role === "dosen" || role === "admin") {
      fetchSubmissions();
    }
  }, [role, classId]);

  const submitGrade = async (submissionId, grade) => {
    try {
      await axios.post(
        `http://localhost:5004/submission/grade`,
        { submission_id: submissionId, grade },
        { headers: { username, role }, withCredentials: true }
      );
      alert("Grade assigned successfully!");
      setSubmissions((prev) =>
        prev.map((submission) =>
          submission._id === submissionId ? { ...submission, grade } : submission
        )
      );
    } catch (err) {
      console.error("Failed to assign grade:", err);
      alert("Failed to assign grade. Please try again.");
    }
  };

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
      await axios.post(`http://localhost:5004/submission`, formData, {
        headers: { username, role, "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Submission uploaded successfully!");
      navigate(`/dashboard`);
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
            <h2 className="card-title mb-4">Submission Page</h2>

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
                <button type="submit" className="btn btn-primary">
                  Submit Task
                </button>
              </form>
            )}

            {role === "dosen" || role === "admin" ? (
              <div>
                <h3>Submitted Tasks</h3>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Task Title</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>File</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission) => (
                        <tr key={submission._id}>
                          <td>{submission.task_title}</td>
                          <td>{submission.user_id?.username}</td>
                          <td>{new Date(submission.submission_date).toLocaleString()}</td>
                          <td>
                            <a
                              href={submission.submission_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </td>
                          <td>
                            <input
                              type="number"
                              placeholder="Enter grade"
                              min="0"
                              max="100"
                              onBlur={(e) => submitGrade(submission._id, e.target.value)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
//