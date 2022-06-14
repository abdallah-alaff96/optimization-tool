import React from "react";
import Table from "react-bootstrap/Table";

function DipTable(props) {
  // my trans
  const transdata = props.tableTrans;
  console.log(transdata);

  // my data
  const data = props.tableContent;
  const dataShallow = [...data];

  // TO LOWER CASE
  const keysToLowerCase = (obj) => {
    var myKeys = Object.keys(obj);
    var n = myKeys.length;
    while (n--) {
      var key = myKeys[n]; // "cache" it, for less lookups to the array
      if (key !== key.toLowerCase()) {
        // might already be in its lower case version
        obj[key.toLowerCase().replace(/\s+/g, "")] = obj[key]; // swap the value to a new lower case key
        delete obj[key]; // delete the old key
      }
    }
    // to reverse object
    obj = Object.entries(obj).reverse(); //convert obj to Arr then reverse it
    obj = Object.fromEntries(obj);
    return obj;
  };

  const newData = dataShallow.map((row) => {
    return keysToLowerCase(row);
  });
  console.log(newData);

  // Table Data
  const tData = newData.map((eachRow, index) => (
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

// const newData = dataShallow.map((row) => {
//   return keysToLowerCase(row);
// });

// const headerKeysArr = newData.length == 0 ? [] : Object.keys(newData[0]);

// // Table Headers
// const theaders = headerKeysArr.map((headerName, index) => (
//   <th key={index}>{headerName.toUpperCase()}</th>
// ));
