import React from "react";
import Form from "react-bootstrap/Form";

function DipTransFile(props) {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3 input-file-trans">
        <Form.Label>And the updated "Transmission" file here ⬇️</Form.Label>
        <Form.Control type="file" size="sm" />
        {/* onChange={props.inputHandler} */}
      </Form.Group>
    </>
  );
}

export default DipTransFile;
