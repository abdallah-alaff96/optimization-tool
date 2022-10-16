import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./SidebarData";
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
      >
        <NavLink to={item.path}>
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </NavLink>
      </li>
    );
  });

  return (
    <>
      <nav className="nav">
        <ul className="nav-links">{listComponents}</ul>
      </nav>
      <div className="legal">
        &copy; Eng.Abdallah Alaff. All rights reserved.
      </div>
    </>
  );
}

export default Sidebar;
