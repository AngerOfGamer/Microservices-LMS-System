import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ClassPage from "./pages/ClassPage";
import ContentPage from "./pages/ContentsPage";
import AttendancePage from "./pages/AttendancePage";
import SubmissionPage from "./pages/SubmissionPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class" element={<ClassPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
