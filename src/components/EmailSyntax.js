import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyVerticallyCenteredModal(props) {
  const { report } = props.data;
  const { lowTchAvaCells } = props.data;
  const { downCells } = props.data;
  const { haltedCells } = props.data;
  const { uasArr } = props.data;
  const { sesArr } = props.data;
  const { esArr } = props.data;

  console.log("EmailSyntax rendered");

  const tchMail = (
    <Modal.Body>
      <h5>{`Dears in Operation / D&M`}</h5>
      <h6> Kindly, find attached today's report for this morning: </h6>
      <br />
      <p>{`- Low TCH Availability: ${lowTchAvaCells}`}</p>
      <p>{`- Morning Down Cells: ${downCells}`}</p>
      <p>{`- Halted: ${haltedCells}`}</p>
      <p>BR.</p>
    </Modal.Body>
  );

  const dipMail = (
    <Modal.Body>
      <h5>{`Dears in D&M`}</h5>
      <h6>
        Kindly, the following sites has DIP issues, please check and feedback.
      </h6>
      <br />
      <p>{`- UAS/UASR: ${uasArr}`}</p>
      <p>{`- SES/SESR: ${sesArr}`}</p>
      <p>{`- ES/ESR: ${esArr}`}</p>
      <p>BR.</p>
    </Modal.Body>
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">TCH Email</Modal.Title>
      </Modal.Header>
      {report === "tch" ? tchMail : report === "dip" ? dipMail : null}
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EmailSyntax(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <React.Fragment>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Email-Syntax
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={props}
      />
    </React.Fragment>
  );
}

export default EmailSyntax;
