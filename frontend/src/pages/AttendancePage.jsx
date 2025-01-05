import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendancePage = ({ role }) => {
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch students and attendance records
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get("/api/users/students", { withCredentials: true });
        setStudents(studentsRes.data);

        const recordsRes =
          role === "mahasiswa"
            ? await axios.get("/api/attendance/records/student", { withCredentials: true })
            : await axios.get("/api/attendance/records", { withCredentials: true });

        setAttendanceRecords(recordsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [role]);

  const saveAttendance = async () => {
    try {
      await axios.post(
        "/api/attendance/create",
        { date, attendance },
        { withCredentials: true }
      );
      alert("Absensi berhasil disimpan!");
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert("Gagal menyimpan absensi.");
    }
  };

  const togglePresence = (id) => {
    setAttendance((prev) =>
      prev.some((a) => a.studentId === id)
        ? prev.map((a) =>
            a.studentId === id ? { ...a, status: a.status === "present" ? "absent" : "present" } : a
          )
        : [...prev, { studentId: id, status: "present" }]
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Attendance Management</h1>
      {role !== "mahasiswa" && (
        <div className="mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control mb-2"
          />
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                {student.name}
                <input
                  type="checkbox"
                  onChange={() => togglePresence(student.id)}
                />
              </li>
            ))}
          </ul>
          <button onClick={saveAttendance} className="btn btn-primary">
            Save Attendance
          </button>
        </div>
      )}
      <h3>Attendance Records</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Student Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.studentName}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendancePage;
