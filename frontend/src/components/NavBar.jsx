import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
      <div className="container-fluid">
        {/* Dashboard Link */}
        <Link className="navbar-brand" to="/dashboard">
          Dashboard
        </Link>

        <div className="d-flex align-items-center">
          {/* Notification Button */}
          <button
            type="button"
            className="btn btn-outline-light position-relative me-3"
            onClick={() => navigate("/notifications")}
          >
            <i className="bi bi-bell"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>

          {/* Profile and Logout */}
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: "30px", height: "30px" }}
              />
              John Doe
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
