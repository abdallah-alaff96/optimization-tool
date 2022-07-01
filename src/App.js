"use strict";
import React, { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Complaints from "./pages/Complaints/Complaints";
import Dip from "./pages/Dip/Dip";
import Tch from "./pages/Tch/Tch";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layouts/Header";

function App() {
  const [sidebar, setSidebar] = useState(true);
  // to Toggle sidebar
  const sidebarToggle = () => setSidebar(!sidebar);

  return (
    <>
      <div className="wrapper">
        <Router>
          <div className={sidebar ? "left_block" : "left_block hide"}>
            <Sidebar />
          </div>

          <div className="right_block">
            <Header toggleFun={sidebarToggle} />
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
