import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "../components/SidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "./Sidebar.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Complaints from "../pages/Complaints";
import Dip from "../pages/Dip";
import Tch from "../pages/Tch";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  // to Toggle sidebar
  const sidebarToggle = () => setSidebar(!sidebar);

  //
  const listComponents = sidebarData.map((item, index) => {
    return (
      <li key={index} className={item.cName}>
        <Link to={item.path} className="menu-bars">
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </li>
    );
  });
  return (
    <>
      <Router>
        <IconContext.Provider value={{ color: "#ffff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={sidebarToggle} />
            </Link>
            <span className="navbar-text">RF Optimization Tool 📶</span>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={sidebarToggle}>
              <li className="nav-menu-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {listComponents}
            </ul>
            <div className="legal">
              &copy; Eng.Abdallah Alaff. All rights reserved.
            </div>
          </nav>
        </IconContext.Provider>
        <Routes>
          <Route path="/" element={<Dip />} />
          <Route path="/tch" element={<Tch />} />
          <Route path="/complaints" element={<Complaints />} />
        </Routes>
      </Router>
    </>
  );
}

export default Sidebar;
