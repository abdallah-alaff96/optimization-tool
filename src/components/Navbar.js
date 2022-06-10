import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "./SidebarData";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  // to Toggle sidebar
  const sidebarToggle = () => setSidebar(!sidebar);

  //
  const listComponents = sidebarData.map((item, index) => (
    <li key={index}>
      <Link to={item.path} className="menu-bars">
        {item.icon}
        <span className={item.cName}>{item.title}</span>
      </Link>
    </li>
  ));
  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={sidebarToggle} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="nav-menu-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={sidebarToggle} />
            </Link>
          </li>
          {listComponents}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
