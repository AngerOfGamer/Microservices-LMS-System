import NavBar from "../components/NavBar";

const AttendancePage = () => {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <p>Track student attendance here.</p>
      </main>
    </div>
  );
};

export default AttendancePage;