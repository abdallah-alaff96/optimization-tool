import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "../components/SidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "./Sidebar.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Sidebar({ ...props }) {
  const { handleCurrentPath } = props;

  const [sidebar, setSidebar] = useState(false);

  // to Toggle sidebar
  const sidebarToggle = () => setSidebar(!sidebar);

  const generateList = () => {
    const listComponents = sidebarData?.map((item, index) => {
      return (
        <li key={index} className={item.cName}>
          <Router>
            <Link to={item.path} className="menu-bars">
              {item.icon}
              <span onClick={() => handleCurrentPath(item.path)}>
                {item.title}
              </span>
            </Link>
          </Router>
        </li>
      );
    });

    return listComponents;
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#ffff" }}>
        {/* <div className="home-button">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={sidebarToggle} />
            </Link>
          </div> */}
        {/* <div className="navbar-text">RF Optimization Tool 📶</div> */}
        <nav className={sidebar ? "nav active" : "nav"}>
          <ul className="nav-list" onClick={sidebarToggle}>
            {/* <li className="nav-menu-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li> */}
            {generateList()}
          </ul>
        </nav>
        <div className="legal">
          &copy; Eng.Abdallah Alaff. All rights reserved.
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
