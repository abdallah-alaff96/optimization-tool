import "./HomePage.css";
import { useState } from "react";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import Content from "../../layouts/Content";

function HomePage({ ...props }) {
  const [currentPath, setCurrentPath] = useState("./");

  const getCurrentPath = (path) => {
    setCurrentPath(path);
  };

  return (
    <>
      <div className="wrapper">
        <div className="left_block">
          <Sidebar handleCurrentPath={getCurrentPath} />
        </div>
        <div className="right_block">
          <Header />
          <Content currentPath={currentPath} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
