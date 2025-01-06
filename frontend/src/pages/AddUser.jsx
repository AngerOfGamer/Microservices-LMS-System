import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUserPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    nip_nim: "",
    role: "",
  });
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Ambil role dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setRole(storedUser.role);
    }
  }, []);

  // Fetch data pengguna
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
      setMessage(response.data.message);
      setFormData({ username: "", nip_nim: "", role: "" });

      // Refresh user list
      const updatedUsers = await axios.get("http://localhost:5000/api/users");
      setUsers(updatedUsers.data);
    } catch (err) {
      setError(err.response?.data?.error || "Gagal menambahkan pengguna");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Users</h2>

      {/* Form Tambah Pengguna untuk Admin */}
      {role === "admin" && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title">Tambah Pengguna</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nip_nim" className="form-label">
                  NIP/NIM
                </label>
                <input
                  type="text"
                  id="nip_nim"
                  name="nip_nim"
                  value={formData.nip_nim}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Pilih Role</option>
                  <option value="dosen">Dosen</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Tambahkan
              </button>
            </form>
            {message && <p className="text-success mt-3">{message}</p>}
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>
      )}

      {/* Daftar Pengguna */}
      <h3 className="mb-4">Daftar Pengguna</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Username</th>
                <th>NIP/NIM</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.nip_nim}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
