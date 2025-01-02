import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard">
          <span className="text-lg font-bold">LMS</span>
        </Link>
        <Link to="/class">
          <span>Class</span>
        </Link>
        <Link to="/content">
          <span>Content</span>
        </Link>
        <Link to="/attendance">
          <span>Attendance</span>
        </Link>
        <Link to="/submission">
          <span>Submission & Grading</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          Notification
          <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </button>
        <button>Profile</button>
      </div>
    </nav>
  );
};

export default NavBar;
