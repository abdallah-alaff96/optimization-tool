import React from "react";
import Table from "react-bootstrap/Table";

function DipTable(props) {
  const uasArr = props.tableContent.filter((row) => row.Dip > 0);
  const headerKeysArr = uasArr.length == 0 ? [] : Object.keys(uasArr[0]);
  console.log(headerKeysArr);

  // header map
  const theaders = headerKeysArr.map((headerName, index) => (
    <th key={index}>{headerName}</th>
  ));

  // data map
  const tData = uasArr.map((eachRow, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{eachRow.Name}</td>
      <td>{eachRow.Hour}</td>
      <td>{eachRow.Dip}</td>
    </tr>
  ));

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>{theaders}</tr>
        </thead>
        <tbody>{tData}</tbody>
      </Table>
    </>
  );
}

export default DipTable;
