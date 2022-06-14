import React, { useState } from "react";
import * as XLSX from "xlsx";
import DipInputFile from "../components/DipInputFile";
import DipTable from "../components/DipTable";
import DipTransFile from "../components/DipTransFile";
import "./Dip.css";

function Dip() {
  const [myFile, setMyFile] = useState([]);
  const [transFile, setTransFile] = useState([]);

  // File Handler Function
  const fileHandle = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
      var data = e.target.result;
      var workbook = XLSX.read(data, { type: "buffer" });
      const firstWsName = workbook.SheetNames[0];
      const firstWs = workbook.Sheets[firstWsName];
      const firstWsData = XLSX.utils.sheet_to_json(firstWs);

      // My Actions
      setMyFile(firstWsData);
    };
    reader.readAsArrayBuffer(file);
  };
  console.log(myFile);

  // Trans Handler Function
  const transHandle = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
      var data = e.target.result;
      var workbook = XLSX.read(data, { type: "buffer" });
      const secondWsName = workbook.SheetNames[1];
      const secondWs = workbook.Sheets[secondWsName];
      const secondWsData = XLSX.utils.sheet_to_json(secondWs);

      // My Actions
      setTransFile(secondWsData);
    };
    reader.readAsArrayBuffer(file);
  };
  console.log(transFile);

  return (
    <>
      <div className="dip">
        <div className="input-files-container">
          <DipInputFile inputHandler={fileHandle} />
          <DipTransFile transHandler={transHandle} />
        </div>
        <DipTable tableContent={myFile} tableTrans={transFile} />
      </div>
    </>
  );
}

export default Dip;
