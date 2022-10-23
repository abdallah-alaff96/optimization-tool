import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import * as XLSX from "xlsx";
import LoadingSpinner from "./LoadingSpinner";

function InputFileComp({ ...props }) {
  const { onHandler, refSheetNumber, fileName } = props;

  // loading spinner
  const [activeSpinner, setActiveSpinner] = useState(false);

  // File Handler Function
  const fileHandle = (e) => {
    console.log("start read fileHandler");
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
      console.log("start onloading data");
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
        cellStyles: true,
        cellDates: true,
        cellNF: true,
        cellFormula: true,
      });
      const wsName = workbook.SheetNames[refSheetNumber];
      const ws = workbook.Sheets[wsName];
      const wsData = XLSX.utils.sheet_to_json(ws);

      onHandler(wsData);
      console.log("finish onloading data");
      setActiveSpinner(false);
    };
    setActiveSpinner(true);
    reader.readAsArrayBuffer(file);
    console.log("finish read fileHandler");
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3 input-file-dip">
        <Form.Label>{`Select your "${fileName}" file ⬆️`}</Form.Label>
        <Form.Control type="file" onChange={fileHandle} size="sm" />
        <br />
        {activeSpinner && <LoadingSpinner />}
      </Form.Group>
    </>
  );
}

export default InputFileComp;
