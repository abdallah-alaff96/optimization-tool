import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./Header.css";

function Header({ ...props }) {
  const { toggleFun } = props;
  return (
    <>
      <div className="header">
        <Link to="#" className="icon">
          <FaIcons.FaBars onClick={toggleFun} />
        </Link>

        <div className="title">RF Optimization Tool 📶</div>
      </div>
    </>
  );
}

export default Header;
