import React from "react";
import Table from "react-bootstrap/Table";

function DipTable(props) {
  // my data
  const data = props.tableContent;
  const dataShallow = [...data];

  // my trans
  const transData = props.tableTrans;
  console.log(transData);

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
  // DATA TO LOWERCASE
  dataShallow.map((row) => {
    return keysToLowerCase(row);
  });
  // TRANSDATA TO LOWERCASE
  transData.map((row) => {
    return keysToLowerCase(row);
  });

  // Remove BSC word from Number
  dataShallow.map((obj) => {
    obj.elem = obj.elem.replace(/\D/g, "");
  });

  // Remove RBL2 & ET
  dataShallow.map((obj) => {
    obj.dip = obj.dip.replace(/RBL2|ET/gi, "");
    obj.bscdip = Number(obj.elem + obj.dip);
    obj.sitename = transData.find((elm) => elm.con === 14100);
  });
  console.log(dataShallow);

  // Table Data
  const tData = dataShallow.map((eachRow, index) => (
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
