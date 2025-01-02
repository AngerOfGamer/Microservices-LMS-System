import NavBar from "../components/NavBar";

const ContentPage = () => {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <p>Upload and manage learning materials here.</p>
      </main>
    </div>
  );
};

export default ContentPage;