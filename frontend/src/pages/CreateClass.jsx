import React, { useState, useEffect } from "react";

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Buat Kelas Baru</h1>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nama Kelas"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Deskripsi Kelas"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        ></textarea>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Pilih Dosen dan Mahasiswa</h2>
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
            <button
              key={user.user_id}
              onClick={() => handleSelectUser(user)}
              className="border p-2 rounded"
            >
              {user.username} ({user.role})
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Anggota Terpilih</h2>
        {selectedUsers.map((user) => (
          <div key={user.user_id} className="flex items-center justify-between">
            <span>
              {user.username} ({user.role})
            </span>
            <button
              onClick={() => handleRemoveUser(user.user_id)}
              className="text-red-500"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleCreateClass}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Buat Kelas
      </button>
    </div>
  );
};

export default CreateClass;
