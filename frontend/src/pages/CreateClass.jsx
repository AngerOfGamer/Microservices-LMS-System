import React, { useState } from "react";

const CreateClass = () => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCreateClass = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Kirim session cookie
        body: JSON.stringify({
          class_name: className,
          description,
        }),
      });

      if (response.ok) {
        setSuccess("Kelas berhasil dibuat!");
        setClassName("");
        setDescription("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Gagal membuat kelas");
      }
    } catch (err) {
      console.error("Error creating class:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
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
