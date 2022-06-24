import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "../components/SidebarData";
import * as AiIcons from "react-icons/ai";
import "./Sidebar.css";

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  // to Toggle sidebar
  const sidebarToggle = () => setSidebar(!sidebar);

  //
  const listComponents = sidebarData.map((item, index) => {
    return (
      <li key={index} className={item.cName}>
        <Link to={item.path} className="list-icon">
          {item.icon}
          <span className="list-text">{item.title}</span>
        </Link>
      </li>
    );
  });

  return (
    <>
      <nav className={sidebar ? "nav active" : "nav"}>
        <ul className="nav-list" onClick={sidebarToggle}>
          {/* <li className="nav-menu-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li> */}
          {listComponents}
        </ul>
      </nav>
      <div className="legal">
        &copy; Eng.Abdallah Alaff. All rights reserved.
      </div>
    </>
  );
}

export default Sidebar;
