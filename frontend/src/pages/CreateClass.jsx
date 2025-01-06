import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]); // Data dosen dan mahasiswa
  const [selectedUsers, setSelectedUsers] = useState([]); // Pengguna yang dipilih
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Ambil daftar dosen dan mahasiswa dari backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/roles", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          setError("Gagal memuat data pengguna");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    };

    fetchUsers();
  }, []);

  // Fungsi untuk menangani pembuatan kelas
  const handleCreateClass = async () => {
    if (!className || selectedUsers.length === 0) {
      setError("Nama kelas dan anggota wajib diisi.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          class_name: className,
          description,
          selectedUsers,
        }),
      });

      if (response.ok) {
        setSuccess("Kelas berhasil dibuat!");
        setClassName("");
        setDescription("");
        setSelectedUsers([]);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Gagal membuat kelas");
      }
    } catch (err) {
      console.error("Error creating class:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  // Fungsi untuk menangani pilihan anggota kelas
  const handleSelectUser = (user) => {
    if (!selectedUsers.some((selected) => selected.user_id === user.user_id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Fungsi untuk menghapus pengguna dari daftar anggota
  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.user_id !== userId));
  };

  return (
    <div>
    <NavBar />
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Buat Kelas Baru</h1>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        <label htmlFor="className" className="form-label">
          Nama Kelas
        </label>
        <input
          id="className"
          type="text"
          placeholder="Nama Kelas"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="form-label">
          Deskripsi Kelas
        </label>
        <textarea
          id="description"
          placeholder="Deskripsi Kelas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        ></textarea>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Pilih Dosen dan Mahasiswa</h5>
        <div className="row">
          {users.map((user) => (
            <div
              key={user.user_id}
              className="col-md-6 mb-3"
            >
              <button
                onClick={() => handleSelectUser(user)}
                className="btn btn-outline-primary w-100 text-start"
              >
                {user.username} ({user.role})
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h5 className="mb-3">Anggota Terpilih</h5>
        {selectedUsers.length === 0 ? (
          <p className="text-muted">Belum ada anggota yang dipilih.</p>
        ) : (
          <ul className="list-group">
            {selectedUsers.map((user) => (
              <li
                key={user.user_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {user.username} ({user.role})
                <button
                  onClick={() => handleRemoveUser(user.user_id)}
                  className="btn btn-danger btn-sm"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleCreateClass}
        className="btn btn-primary w-100"
      >
        Buat Kelas
      </button>
    </div>
    </div>
  );
};

export default CreateClass;
