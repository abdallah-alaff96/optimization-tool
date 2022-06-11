import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Complaints from "./pages/Complaints";
import Dip from "./pages/Dip";
import Tch from "./pages/Tch";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dip />} />
          <Route path="/tch" element={<Tch />} />
          <Route path="/complaints" element={<Complaints />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
