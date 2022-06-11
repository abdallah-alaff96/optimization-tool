import React from "react";
import Form from "react-bootstrap/Form";

function DipInputFile(props) {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3 input-file-dip">
        <Form.Label>Enter the "DIP" file here ⬇️</Form.Label>
        <Form.Control type="file" onChange={props.inputHandler} size="sm" />
      </Form.Group>
    </>
  );
}

export default DipInputFile;
