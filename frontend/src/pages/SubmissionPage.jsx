import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const SubmissionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classId = location.state?.classId || localStorage.getItem("classId");
  const [taskTitle, setTaskTitle] = useState("");
  const [file, setFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role;
  const username = storedUser?.username;

  // Fetch submissions jika role adalah dosen atau admin
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/submissions`, {
          params: { class_id: classId },
          headers: { username, role },
          withCredentials: true,
        });
        setSubmissions(response.data);
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (role === "dosen" || role === "admin") {
      fetchSubmissions();
    }
  }, [role, classId, username]);

  // Submit nilai ke backend
  const submitGrade = async (submissionId, grade) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/submissions/grade`,
        { submission_id: submissionId, grade },
        { headers: { username, role }, withCredentials: true }
      );
      alert("Grade assigned successfully!");
      // Update grade pada state submissions
      setSubmissions((prev) =>
        prev.map((submission) =>
          submission.submission_id === submissionId
            ? { ...submission, grade }
            : submission
        )
      );
    } catch (err) {
      console.error("Failed to assign grade:", err);
      alert("Failed to assign grade. Please try again.");
    }
  };

  // Handle file upload untuk mahasiswa
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
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/submissions`, formData, {
        headers: { username, role, "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Submission uploaded successfully!");
      navigate(`/dashboard`, { state: { classId } });
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

            {/* Jika role adalah mahasiswa, tampilkan form upload */}
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

            {/* Jika role adalah dosen atau admin, tampilkan daftar submission */}
            {(role === "dosen" || role === "admin") && (
              <>
                <h3 className="mt-4">Submitted Tasks</h3>
                {loading ? (
                  <p>Loading submissions...</p>
                ) : submissions.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Task Title</th>
                        <th>Username</th>
                        <th>Submission Date</th>
                        <th>File</th>
                        <th>Grade</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission) => (
                        <tr key={submission.submission_id}>
                          <td>{submission.task_title}</td>
                          <td>{submission.username}</td>
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
                          <td>{submission.grade ?? "Not graded"}</td>
                          <td>
                            <input
                              type="number"
                              placeholder="Enter grade"
                              min="0"
                              max="100"
                              className="form-control"
                              onBlur={(e) =>
                                submitGrade(submission.submission_id, e.target.value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No submissions found for this class.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPage;
