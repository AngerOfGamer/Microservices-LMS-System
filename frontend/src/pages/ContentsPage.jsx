const ContentPage = ({ role, classId }) => {
  const [contents, setContents] = useState([]);
  const [newContent, setNewContent] = useState({
    class_id: classId || "",
    content_title: "",
    content_description: "",
    category: "materi",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!classId) {
      console.error("classId tidak diberikan!");
      return;
    }

    const fetchContents = async () => {
      try {
        const res = await axios.get(`/api/content?class_id=${classId}`, { withCredentials: true });
        setContents(res.data);
      } catch (err) {
        console.error("Error fetching contents:", err);
      }
    };
    fetchContents();
  }, [classId]);

  useEffect(() => {
    setNewContent((prevContent) => ({
      ...prevContent,
      class_id: classId || "",
    }));
  }, [classId]);

  const saveContent = async () => {
    if (!newContent.class_id || !newContent.content_title || !newContent.content_description) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      await axios.post("/api/content", newContent, { withCredentials: true });
      alert("Konten berhasil disimpan!");
      setNewContent({
        class_id: classId || "",
        content_title: "",
        content_description: "",
        category: "materi",
      });
      const updatedContents = await axios.get(`/api/content?class_id=${classId}`, { withCredentials: true });
      setContents(updatedContents.data);
    } catch (err) {
      console.error("Error saving content:", err);
      alert("Gagal menyimpan konten.");
    }
  };

  const deleteContent = async (contentId) => {
    try {
      await axios.delete(`/api/content/${contentId}`, { withCredentials: true });
      alert("Konten berhasil dihapus!");
      const updatedContents = await axios.get(`/api/content?class_id=${classId}`, { withCredentials: true });
      setContents(updatedContents.data);
    } catch (err) {
      console.error("Error deleting content:", err.response?.data?.message || err.message);
      alert("Gagal menghapus konten: " + (err.response?.data?.message || "Internal server error."));
    }
  };

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Content Management</h1>
      {role !== "mahasiswa" && (
        <div className="mb-4">
          <h3>Add New Content</h3>
          <form>
            {/* Form inputs */}
            <button type="button" onClick={saveContent} className="btn btn-primary">
              Save Content
            </button>
          </form>
        </div>
      )}
      <h3>Content Records</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            {role !== "mahasiswa" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {contents.map((content) => (
            <tr key={content.content_id}>
              <td>{content.class_id}</td>
              <td>{content.content_title}</td>
              <td>{content.content_description}</td>
              <td>{content.category}</td>
              <td>
                {role === "mahasiswa" && content.category === "tugas" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/submission?contentId=${content.content_id}`)}
                  >
                    Submission
                  </button>
                )}
                {role !== "mahasiswa" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteContent(content.content_id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentPage;
