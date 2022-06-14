import React from "react";
import Table from "react-bootstrap/Table";

function DipTable(props) {
  // converter function
  const data = props.tableContent;
  const dataShallow = [...data];

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

  const headerKeysArr = newData.length == 0 ? [] : Object.keys(newData[0]);

  // Table Headers
  const theaders = headerKeysArr.map((headerName, index) => (
    <th key={index}>{headerName.toUpperCase()}</th>
  ));

  // Table Data
  const tData = data.map((eachRow, index) => (
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
            {theaders}
          </tr>
        </thead>
        <tbody>{tData}</tbody>
      </Table>
    </>
  );
}

export default DipTable;
