import React from "react";
import Table from "react-bootstrap/Table";

function TableHandler({ ...props }) {
  const { dataArr, headerArr } = props;

  // Table Header
  const tableHeader = headerArr?.map((headerName, index) => {
    <th key={index}>{headerName}</th>;
  });

  // Table Data
  const tData = dataArr?.map((eachRow, index) => (
    <tr key={index}>
      <td>{eachRow.dip}</td>
      <td>{eachRow.elem}</td>
      <td>{eachRow.site_name}</td>
      <td>{eachRow.date.toDateString()}</td>
      <td>{eachRow.hour}</td>
      <td>{eachRow.sf}</td>
      <td>{eachRow.es}</td>
      <td>{eachRow.ses}</td>
      <td>{eachRow.uas}</td>
      <td>{eachRow.sfr}</td>
      <td>{eachRow.esr}</td>
      <td>{eachRow.sesr}</td>
      <td>{eachRow.uasr}</td>
    </tr>
  ));
  return (
    <>
      <Table striped bordered hover className="dip-table">
        <thead>
          <tr>{tableHeader}</tr>
        </thead>
        <tbody>{tData}</tbody>
      </Table>
    </>
  );
}

export default TableHandler;
