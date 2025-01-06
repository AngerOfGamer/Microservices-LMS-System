import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClassPage from "./pages/ClassPage";
import ContentPage from "./pages/ContentsPage";
import AttendancePage from "./pages/AttendancePage";
import SubmissionPage from "./pages/SubmissionPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationsPage";
import CreateClass from "./pages/CreateClass";
import AddUser from "./pages/AddUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class/:class_id" element={<ClassPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="createClass" element={<CreateClass />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
