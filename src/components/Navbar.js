import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "./SidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "./Navbar.css";

function Navbar() {
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
    </>
  );
}

export default Navbar;
