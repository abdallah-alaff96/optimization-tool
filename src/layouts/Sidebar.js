import React from "react";
import { Link } from "react-router-dom";
import { sidebarData } from "../components/SidebarData";
import "./Sidebar.css";

function Sidebar() {
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
      <nav className="nav">
        <ul className="nav-list">{listComponents}</ul>
      </nav>
      <div className="legal">
        &copy; Eng.Abdallah Alaff. All rights reserved.
      </div>
    </>
  );
}

export default Sidebar;
