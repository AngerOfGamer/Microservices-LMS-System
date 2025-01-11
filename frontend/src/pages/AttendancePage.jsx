import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendancePage = ({ classId }) => {
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]); 
  const [attendance, setAttendance] = useState([]); 
  const [attendanceRecap, setAttendanceRecap] = useState([]); 
  const [role, setRole] = useState(""); 

  // Fetch role pengguna dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setRole(storedUser.role);
    }
  }, []);

  // Fetch data mahasiswa dan rekap absensi
  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const { username, role } = storedUser || {};

      if (!username || !role) {
        alert("User tidak valid. Silakan login kembali.");
        return;
      }

      try {
        // Ambil rekap absensi
        const resRecap = await axios.get("http://localhost:5001/attendance/recap", {
          params: { class_id: classId },
          headers: { username, role },
          withCredentials: true,
        });
        setAttendanceRecap(resRecap.data);

        // Ambil daftar mahasiswa jika bukan role "mahasiswa"
        if (role !== "mahasiswa") {
          const resStudents = await axios.get("http://localhost:5001/attendance/mahasiswa", {
            params: { class_id: classId },
            headers: { username, role },
            withCredentials: true,
          });
          setStudents(resStudents.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
      }
    };

    fetchData();
  }, [classId]);

  // Fungsi untuk menyimpan absensi
  const saveAttendance = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const { username, role } = storedUser || {};

    if (!username || !role) {
      alert("User tidak valid. Silakan login kembali.");
      return;
    }

    if (!date) {
      alert("Pastikan tanggal dipilih.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/attendance",
        { date, class_id: classId, attendance },
        {
          headers: { username, role },
          withCredentials: true,
        }
      );

      alert("Absensi berhasil disimpan!");
      const resRecap = await axios.get("http://localhost:5001/attendance/recap", {
        params: { class_id: classId },
        headers: { username, role },
        withCredentials: true,
      });
      setAttendanceRecap(resRecap.data);
    } catch (err) {
      console.error("Error saving attendance:", err.response?.data || err.message);
      alert("Gagal menyimpan absensi.");
    }
  };

  // Fungsi untuk mengatur status absensi mahasiswa
  const toggleAttendance = (studentId) => {
    setAttendance((prev) => {
      const existing = prev.find((record) => record.studentId === studentId);
      if (existing) {
        return prev.filter((record) => record.studentId !== studentId);
      }
      return [...prev, { studentId, status: "hadir" }];
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attendance Management</h2>

      {/* Form Absensi untuk Admin/Dosen */}
      {role !== "mahasiswa" && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title">Mark Attendance</h5>
            <form onSubmit={saveAttendance}>
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <ul className="list-group">
                  {students.map((student) => (
                    <li
                      key={student.user_id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {student.name || student.username || "Nama tidak tersedia"}
                      <input
                        type="checkbox"
                        onChange={() => toggleAttendance(student.user_id)}
                        checked={attendance.some(
                          (record) => record.studentId === student.user_id
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Attendance
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Rekap Absensi */}
      <h3 className="mb-4">Attendance Recap</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                {role !== "mahasiswa" && <th>Student Name</th>}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecap.map((record, index) => (
                <tr key={index}>
                  <td>{new Date(record.date).toLocaleDateString("en-GB")}</td>
                  {role !== "mahasiswa" && (
                    <td>{record.mahasiswa_name || "Nama tidak tersedia"}</td>
                  )}
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
