import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function DipTable(props) {
  const [activeArr, setActiveArr] = useState([]);
  const data = props.tableContent;
  const transData = props.tableTrans;

  // TO LOWER CASE AND REMOVE THE SPACE
  const keysToLowerCase = (obj) => {
    var myKeys = Object.keys(obj);
    var n = myKeys.length;
    while (n--) {
      var key = myKeys[n]; // "cache" it, for less lookups to the array
      if (key !== key.toLowerCase()) {
        // might already be in its lower case version
        obj[
          key
            .toLowerCase()
            .replace(/\s+/g, "")
            .replace(/[^a-zA-Z0-9]/g, "")
        ] = obj[key]; // swap the value to a new lower case key
        delete obj[key]; // delete the old key
      }
    }
    // to reverse object
    obj = Object.entries(obj).reverse(); //convert obj to Arr then reverse it
    obj = Object.fromEntries(obj);
    return obj;
  };

  // TRANSDATA TO LOWERCASE
  transData.map((row) => {
    return keysToLowerCase(row);
  });

  data.map((row) => {
    // DATA TO LOWERCASE
    keysToLowerCase(row);
    // Remove RBL2 & ET
    row.dip = row.dip.replace(/RBL2|ET/gi, "");
    // keep only the number of BSC
    row.elem = row.elem.replace(/\D/g, "");
    // concatenate bsc with dip
    row.bscdip = Number(row.elem + row.dip);
    // VLOOKUP sitename from transData
    row.sitename =
      transData.length === 0
        ? "Waiting Trans. file update"
        : transData.find((elm) => elm.con == row.bscdip)?.siteid ||
          "Does not belong to Gaza sites";
  });

  const filteredData = data.filter((row) => row.sitename.startsWith("G"));
  const uasArr = filteredData.filter((row) => row.uas > 0 || row.uasr > 0);
  const sesArr = filteredData.filter((row) => row.ses > 2 || row.sesr > 2);
  const esArr = filteredData.filter((row) => row.es > 100 || row.esr > 100);

  const filteredDataHandler = () => {
    setActiveArr(filteredData);
  };
  const uasHandler = () => {
    setActiveArr(uasArr);
  };
  const sesHandler = () => {
    setActiveArr(sesArr);
  };
  const esHandler = () => {
    setActiveArr(esArr);
  };

  // Table Data
  const tData = activeArr.map((eachRow, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{eachRow.dip}</td>
      <td>{eachRow.elem}</td>
      <td>{eachRow.sitename}</td>
      <td>{eachRow.date}</td>
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
      <ButtonGroup aria-label="Basic example">
        <Button variant="secondary" onClick={filteredDataHandler}>
          Filtered sheet
        </Button>
        <Button variant="secondary" onClick={uasHandler}>
          UAS/UASR
        </Button>
        <Button variant="secondary" onClick={sesHandler}>
          SES/SESR
        </Button>
        <Button variant="secondary" onClick={esHandler}>
          ES/ESR
        </Button>
      </ButtonGroup>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>DIP</th>
            <th>BSC</th>
            <th>Site Name</th>
            <th>Date</th>
            <th>Hour</th>
            <th>SF</th>
            <th>ES</th>
            <th>SES</th>
            <th>UAS</th>
            <th>SFR</th>
            <th>ESR</th>
            <th>SESR</th>
            <th>UASR</th>
          </tr>
        </thead>
        <tbody>{tData}</tbody>
      </Table>
    </>
  );
}

export default DipTable;

// const dataShallow = [...data];
// const keysToLowerCase = (obj) => {
//   var myKeys = Object.keys(obj);
//   var n = myKeys.length;
//   while (n--) {
//     var key = myKeys[n]; // "cache" it, for less lookups to the array
//     if (key !== key.toLowerCase()) {
//       // might already be in its lower case version
//       obj[key.toLowerCase().replace(/\s+/g, "")] = obj[key]; // swap the value to a new lower case key
//       delete obj[key]; // delete the old key
//     }
//   }
//   // to reverse object
//   obj = Object.entries(obj).reverse(); //convert obj to Arr then reverse it
//   obj = Object.fromEntries(obj);
//   return obj;
// };

// const dataShallow = dataShallow.map((row) => {
//   return keysToLowerCase(row);
// });

// const headerKeysArr = dataShallow.length == 0 ? [] : Object.keys(dataShallow[0]);

// // Table Headers
// const theaders = headerKeysArr.map((headerName, index) => (
//   <th key={index}>{headerName.toUpperCase()}</th>
// ));
