import React from "react";
import Table from "react-bootstrap/Table";

function TableComp({ ...props }) {
  const { dataArr, headerArr, refTableName } = props;
  let tData;

  // Table Header
  const tableHeader = headerArr?.map((headerName, index) => {
    return <th key={index}>{headerName}</th>;
  });

  // Table Data
  if (refTableName === "dip") {
    tData = dataArr?.map((rowObj, index) => (
      <tr key={index}>
        <td>{rowObj.dip}</td>
        <td>{rowObj.elem}</td>
        <td>{rowObj.site_name}</td>
        <td>{rowObj?.date?.toDateString()}</td>
        <td>{rowObj.hour}</td>
        <td>{rowObj.sf}</td>
        <td>{rowObj.es}</td>
        <td>{rowObj.ses}</td>
        <td>{rowObj.uas}</td>
        <td>{rowObj.sfr}</td>
        <td>{rowObj.esr}</td>
        <td>{rowObj.sesr}</td>
        <td>{rowObj.uasr}</td>
      </tr>
    ));
  }

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

export default TableComp;
