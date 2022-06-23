import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "../components/SidebarData";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import "./Sidebar.css";

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
      <IconContext.Provider value={{ color: "#ffff" }}>
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
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
