"use strict";
import React, { useEffect, useState } from "react";
import InputFileComp from "../../components/InputFileComp";
import DipTable from "./DipTable";
import "./Dip.css";

function Dip() {
  const [myFile, setMyFile] = useState([]);
  const [transFile, setTransFile] = useState([]);
  const [filesToggle, setFilesToggle] = useState(true);

  // Dip file Handler
  const dipInputFileHandler = (data) => {
    setMyFile(data);
  };

  // Trans file Handler
  const transInputFileHandler = (data) => {
    setTransFile(data);
  };

  useEffect(() => {
    if (myFile.length !== 0 && transFile.length !== 0) {
      setFilesToggle(false);
    }
  }, [myFile, transFile]);

  return (
    <>
      <div className="page-title"> ➡️ DIP Report</div>
      <div className="content dip">
        <div className="input-files-container">
          {filesToggle && (
            <InputFileComp
              onHandler={dipInputFileHandler}
              refSheetNumber={0}
            />
          )}
          {filesToggle && (
            <InputFileComp
              onHandler={transInputFileHandler}
              refSheetNumber={1}
            />
          )}
        </div>
        <DipTable tableContent={myFile} tableTrans={transFile} />
      </div>
    </>
  );
}

export default Dip;
