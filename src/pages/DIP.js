"use strict";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import DipInputFile from "../components/DipInputFile";
import DipTable from "../components/DipTable";
import DipTransFile from "../components/DipTransFile";
import "./Dip.css";

function Dip() {
  const [myFile, setMyFile] = useState([]);
  const [transFile, setTransFile] = useState([]);
  const [filesToggle, setFilesToggle] = useState(true);

  // File Handler Function
  const fileHandle = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "buffer",
        cellStyles: true,
        cellDates: true,
        cellNF: true,
      });
      const firstWsName = workbook.SheetNames[0];
      const firstWs = workbook.Sheets[firstWsName];
      const firstWsData = XLSX.utils.sheet_to_json(firstWs);

      setMyFile(firstWsData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Trans Handler Function
  const transHandle = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "buffer",
        cellStyles: true,
        cellFormula: true,
      });
      const secondWsName = workbook.SheetNames[1];
      const secondWs = workbook.Sheets[secondWsName];
      const secondWsData = XLSX.utils.sheet_to_json(secondWs);

      setTransFile(secondWsData);
    };
    reader.readAsArrayBuffer(file);
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
          {filesToggle && <DipInputFile inputHandler={fileHandle} />}
          {filesToggle && <DipTransFile transHandler={transHandle} />}
        </div>
        <DipTable tableContent={myFile} tableTrans={transFile} />
      </div>
    </>
  );
}

export default Dip;
