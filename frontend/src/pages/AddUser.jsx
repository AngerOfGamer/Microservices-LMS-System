import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

const AddUserPage = () => {
  const [formData, setFormData] = useState({ username: "", nip_nim: "", role: "" });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");

      const response = await axios.get("http://localhost:5005/users", {
        headers: { username, role },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Gagal memuat daftar pengguna.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.username || !formData.nip_nim || !formData.role) {
      setError("Semua field harus diisi.");
      return;
    }

    try {
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");

      const response = await axios.post("http://localhost:5005/users", formData, {
        headers: { username, role },
      });
      setMessage(response.data.message);
      fetchUsers();
      setFormData({ username: "", nip_nim: "", role: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Gagal menambahkan pengguna.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");

      await axios.delete(`http://localhost:5005/users/${userId}`, {
        headers: { username, role },
      });
      setMessage("Pengguna berhasil dihapus.");
      fetchUsers();
    } catch (err) {
      setError("Gagal menghapus pengguna.");
    }
  };

  return (
    <div>
    <NavBar />
    <div className="container mt-5">
      <h2>Tambah Pengguna</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Masukkan Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nip_nim" className="form-label">NIP/NIM</label>
          <input
            type="text"
            className="form-control"
            id="nip_nim"
            name="nip_nim"
            value={formData.nip_nim}
            onChange={handleChange}
            placeholder="Masukkan NIP/NIM"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="dosen">Dosen</option>
            <option value="mahasiswa">Mahasiswa</option>
          </select>
        </div>
        <button className="btn btn-primary w-100">Tambahkan</button>
      </form>

      <h3>Daftar Pengguna</h3>
      {isLoading ? (
        <div className="text-center">Memuat...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Username</th>
                <th>NIP/NIM</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.nip_nim}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default AddUserPage;