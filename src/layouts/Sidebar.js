import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "../pages/Dip/SidebarData";
import "./Sidebar.css";

function Sidebar() {
  const [activeBar, setActiveBar] = useState("");
  const activeBarHandler = (title) => {
    setActiveBar(title);
  };

  const listComponents = sidebarData.map((item, index) => {
    return (
      <li
        key={index}
        onClick={() => {
          activeBarHandler(item.title);
        }}
        className={
          item.title === activeBar ? item.cName + " active" : item.cName
        }
      >
        <NavLink to={item.path} className="list-icon">
          {item.icon}
          <span className="list-text">{item.title}</span>
        </NavLink>
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
