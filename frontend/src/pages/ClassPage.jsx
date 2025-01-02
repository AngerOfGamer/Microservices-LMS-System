import NavBar from "../components/NavBar";

const ClassPage = () => {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <p>Manage your classes here.</p>
      </main>
    </div>
  );
};

export default ClassPage;