import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateClass from "./pages/CreateClass";

const ClassRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rute untuk Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Rute untuk CreateClass */}
        <Route path="/create-class" element={<CreateClass />} />

        {/* Rute lainnya jika ada */}
      </Routes>
    </Router>
  );
};

export default ClassRoutes;
