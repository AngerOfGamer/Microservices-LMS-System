import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AttendancePage() {
  const [date, setDate] = useState(""); // Menyimpan tanggal absensi
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", present: false },
    { id: 2, name: "Jane Smith", present: false },
    { id: 3, name: "Alice Brown", present: false },
  ]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const saveAttendance = () => {
    if (!date) {
      alert("Tanggal harus diisi!");
      return;
    }

    const records = students.map((student) => ({
      date,
      studentName: student.name,
      status: student.present ? "present" : "absent",
    }));

    setAttendanceRecords([...attendanceRecords, ...records]);
    resetForm();
  };

  const togglePresence = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const resetForm = () => {
    setDate("");
    setStudents(students.map((student) => ({ ...student, present: false })));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Attendance Management</h1>

      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <h2>Manage Attendance</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveAttendance();
            }}
            className="mb-4"
          >
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <h3>Student List</h3>
            <ul className="list-group mb-3">
              {students.map((student) => (
                <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {student.name}
                  <input
                    type="checkbox"
                    checked={student.present}
                    onChange={() => togglePresence(student.id)}
                  />
                </li>
              ))}
            </ul>

            <button type="submit" className="btn btn-primary">
              Save Attendance
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
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
      </div>
    </div>
  );
}

export default AttendancePage;
