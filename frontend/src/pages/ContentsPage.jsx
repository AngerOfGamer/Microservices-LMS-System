import React from "react";
import { useNavigate } from "react-router-dom";

const ContentPage = () => {
  const navigate = useNavigate();

  const handleSubmissionClick = () => {
    navigate("/submission"); // Navigate to the Submission Page
  };

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      <p className="mb-4">Upload and manage learning materials here.</p>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Learning Material 1</h5>
          <p className="card-text">This is a brief description of the learning material.</p>
          <button
            className="btn btn-primary"
            onClick={handleSubmissionClick}
          >
            Go to Submissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;