import React, { useEffect } from "react";
import "./Content.css";
import Dip from "../pages/DIP/DIP";
import Tch from "../pages/TCH/TCH";
import Complaints from "../pages/Complaints/Complaints";

function Content({ ...props }) {
  const { currentPath } = props;

  return (
    <>
      <div className="content">Content</div>
      {(currentPath.length || !currentPath) <= 1 && <Dip />}
      {currentPath.includes("tch") && <Tch />}
      {currentPath.includes("complaints") && <Complaints />}
    </>
  );
}

export default Content;
