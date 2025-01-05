import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Validasi input
    if (!className || !description) {
      alert("Class name and description are required.");
      return;
    }

    // Membuat kelas baru dengan mengirimkan data ke backend
    const newClass = { class_name: className, description };

    fetch("http://localhost:5000/api/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClass),
      credentials: "include",  // Pastikan session dikirim
    })
      .then((response) => response.json())
      .then(() => {
        alert("Class created successfully");
        navigate("/"); // Kembali ke Dashboard setelah berhasil
      })
      .catch((error) => console.error("Error creating class:", error));
  };

  return (
    <div>
      <h1>Create New Class</h1>
      <div>
        <label>Class Name</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Enter class name"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter class description"
        ></textarea>
      </div>

      <button onClick={handleSubmit}>Create Class</button>
    </div>
  );
};

export default CreateClass;
