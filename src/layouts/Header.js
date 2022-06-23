import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./Header.css";

function Header() {
  const [sidebar, setSidebar] = useState(false);

  // to Toggle sidebar
  const sidebarToggle = () => setSidebar(!sidebar);

  return (
    <>
      <div className="header">
        <Link to="#" className="list-button">
          <FaIcons.FaBars onClick={sidebarToggle} />
        </Link>

        <div className="title">RF Optimization Tool 📶</div>
      </div>
    </>
  );
}

export default Header;
