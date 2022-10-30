import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from "react-icons/gr";
import "./Header.css";

function Header({ ...props }) {
  const { toggleFun } = props;
  return (
    <>
      <div className="header">
        <Link to="#" className="toggle-icon">
          <FaIcons.FaBars onClick={toggleFun} />
        </Link>

        <div className="title">
          <div>RF Optimization Tool</div>
          <span>
            <GrIcons.GrOptimize />
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
