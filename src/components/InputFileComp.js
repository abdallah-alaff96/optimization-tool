import React from "react";
import Form from "react-bootstrap/Form";
import * as XLSX from "xlsx";

function InputFileComp({ ...props }) {
  const { onHandler, refSheetNumber, fileName } = props;

  // File Handler Function
  const fileHandle = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = (e) => {
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
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3 input-file-dip">
        <Form.Label>{`Select your "${fileName}" file ⬆️`}</Form.Label>
        <Form.Control type="file" onChange={fileHandle} size="sm" />
      </Form.Group>
    </>
  );
}

export default InputFileComp;
