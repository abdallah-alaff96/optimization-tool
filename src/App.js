import React from "react";
import Sidebar from "./layouts/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Complaints from "./pages/Complaints";
import Dip from "./pages/Dip";
import Tch from "./pages/Tch";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layouts/Header";

function App() {
  return (
    <>
      <div className="wrapper">
        <Router>
          <div className="left_block">
            <Sidebar />
          </div>

          <div className="right_block">
            <Header />
            <Routes>
              <Route path="/" element={<Dip />} />
              <Route path="/tch" element={<Tch />} />
              <Route path="/complaints" element={<Complaints />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
