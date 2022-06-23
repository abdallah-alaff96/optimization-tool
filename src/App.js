import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Content from "./layouts/Content";

function App() {
  return (
    <>
      <div className="wrapper">
        <div className="left_block">
          <Sidebar />
        </div>
        <div className="right_block">
          <Header />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App;
