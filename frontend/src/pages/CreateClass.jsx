import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const [className, setClassName] = useState("");  // Nama kelas
  const [modules, setModules] = useState("");      // Modul-modul
  const [selectedUsers, setSelectedUsers] = useState([]); // Pengguna yang dipilih (mahasiswa dan dosen)
  const [users, setUsers] = useState([]);          // Daftar pengguna (mahasiswa & dosen)
  const navigate = useNavigate();                  // Hook untuk navigasi

  // Ambil data users (mahasiswa & dosen) dari backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users")  // Endpoint untuk mendapatkan daftar users
      .then((response) => response.json())
      .then((data) => setUsers(data))  // Set data users ke state
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Fungsi untuk menambahkan kelas
  const handleAddClass = () => {
    if (!className.trim()) {
      alert("Nama kelas tidak boleh kosong.");
      return; // Jika nama kelas kosong, keluar dari fungsi
    }

    const newClass = {
      name: className,
      modules: modules.split(",").map((module) => module.trim()), // Memisahkan modul berdasarkan koma
      users: selectedUsers, // Menambahkan pengguna yang dipilih (mahasiswa/dosen)
    };

    console.log("Data yang akan dikirim:", newClass); // Debugging log

    // Mengirim data ke server (backend)
    fetch("http://localhost:5000/api/class", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Menyatakan bahwa data yang dikirim adalah JSON
      },
      body: JSON.stringify(newClass),  // Mengirim data dalam format JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();  // Parsing respons ke JSON
      })
      .then((data) => {
        console.log("Data response dari server:", data); // Debugging log
        navigate("/");  // Navigasi kembali ke halaman Dashboard setelah sukses
      })
      .catch((error) => {
        console.error("Error adding class:", error);  // Menangani error jika ada
        alert("Terjadi kesalahan saat menambahkan kelas. Silakan coba lagi.");
      });
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
        <h1 style={{ color: "#333", textAlign: "center" }}>Tambah Kelas</h1>

        {/* Input Nama Kelas */}
        <input
          type="text"
          placeholder="Nama Kelas"
          value={className}
          onChange={(e) => setClassName(e.target.value)}  // Menangani perubahan input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* Input Modul Kelas */}
        <input
          type="text"
          placeholder="Modul (pisahkan dengan koma)"
          value={modules}
          onChange={(e) => setModules(e.target.value)}  // Menangani perubahan input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {/* Pilihan User (Mahasiswa atau Dosen) */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Pilih Pengguna (Mahasiswa/Dosen)</h3>
          <select
            multiple
            value={selectedUsers}
            onChange={(e) =>
              setSelectedUsers(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {/* Tombol Tambah */}
        <button
          onClick={handleAddClass}  // Menangani klik tombol
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
    </div>
  );
};

export default CreateClass;
