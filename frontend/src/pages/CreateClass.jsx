import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// Komponen utama untuk pengelolaan kelas
const CreateClass = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Matematika", modules: ["Modul 1", "Modul 2"] },
    { id: 2, name: "Pemrograman", modules: ["Introduction", "JavaScript Basics"] },
  ]);
  const [className, setClassName] = useState("");
  const [modules, setModules] = useState("");

  // Tambah kelas baru
  const handleAddClass = () => {
    if (!className.trim()) {
      alert("Nama kelas tidak boleh kosong.");
      return;
    }
    setClasses([
      ...classes,
      { id: classes.length + 1, name: className, modules: modules.split(",") },
    ]);
    setClassName("");
    setModules("");
  };

  // Hapus kelas berdasarkan ID
  const handleDeleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ color: "#333", textAlign: "center" }}>LMS Class Management</h1>

        {/* Form Tambah Kelas */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Tambah Kelas</h2>
          <input
            type="text"
            placeholder="Nama Kelas"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="text"
            placeholder="Modul (pisahkan dengan koma)"
            value={modules}
            onChange={(e) => setModules(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={handleAddClass}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Tambah
          </button>
        </div>

        {/* Daftar Kelas */}
        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Daftar Kelas</h2>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {classes.map((cls) => (
              <li
                key={cls.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <strong>{cls.name}</strong>
                <ul style={{ margin: "10px 0 0 20px" }}>
                  {cls.modules.map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDeleteClass(cls.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Hapus
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#ffc107",
                    color: "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};



export default CreateClass;
