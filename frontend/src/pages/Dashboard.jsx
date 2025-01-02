import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      </main>
    </div>
  );
};

export default Dashboard;