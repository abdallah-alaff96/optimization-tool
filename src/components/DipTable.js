import React from "react";
import Table from "react-bootstrap/Table";

function DipTable(props) {
  const uasArr = props.tableContent.filter((row) => row.dip > 0);

  const tData = uasArr.map((eachRow, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{eachRow.name}</td>
      <td>{eachRow.hour}</td>
      <td>{eachRow.dip}</td>
    </tr>
  ));

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Hour</th>
            <th>DIP</th>
          </tr>
        </thead>
        <tbody>{tData}</tbody>
      </Table>
    </>
  );
}

export default DipTable;
