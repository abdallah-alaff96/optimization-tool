"use strict";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import * as XLSX from "xlsx";

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
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z0-9]/g, "_")
        ] = obj[key]; // swap the value to a new lower case key
        delete obj[key]; // delete the old key
      }
    }
    return obj;
  };

  transData.map((row) => {
    // TRANSDATA TO LOWERCASE
    keysToLowerCase(row);
  });

  data.map((row) => {
    // DATA TO LOWERCASE
    keysToLowerCase(row);
    // Remove RBL2 & ET
    row.dip = row.dip.replace(/RBL2|ET/gi, "");
    // keep only the number of BSC
    row.elem = row.elem.replace(/\D/g, "");
    // concatenate bsc with dip
    row.bsc_dip = Number(row.elem + row.dip);
    // VLOOKUP site_name from transData
    row.site_name =
      transData.length === 0
        ? "Waiting Trans. file update"
        : transData.find((elm) => elm.con_ == row.bsc_dip)?.site_id ||
          "Does not belong to Gaza sites";
  });

  // filtering conditions the 4 sheets
  const filteredData = data.filter((row) => row.site_name.startsWith("G"));
  const uasArr = filteredData.filter((row) => row.uas > 0 || row.uasr > 0);
  const sesArr = filteredData.filter((row) => row.ses > 2 || row.sesr > 2);
  const esArr = filteredData.filter((row) => row.es > 100 || row.esr > 100);

  useEffect(() => {
    setActiveArr(filteredData);
  }, [data, transData]);

  // Active Button Handlers
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

  //Write an Excel file
  const handleExportDip = () => {
    const keysToUpperCase = (obj) => {
      var keysArr = Object.keys(obj);
      var n = keysArr.length;
      while (n--) {
        var key = keysArr[n]; // "cache" it, for less lookups to the array
        if (key !== key.toUpperCase()) {
          // might already be in its lower case version
          obj[key.toUpperCase()] = obj[key]; // swap the value to a new lower case key
          delete obj[key]; // delete the old key
        }
      }
      return obj;
    };
    // Reorder the JSON file for Exporting Excel file
    const orderHandler = (arr) => {
      arr.map((row) => {
        // TRANSDATA TO UpperCase()
        keysToUpperCase(row);
      });

      const newArr = arr.map(
        ({
          UASR,
          SESR,
          ESR,
          SFR,
          UAS,
          SES,
          ES,
          SF,
          DIPFUAV,
          DIPNUAV,
          HOUR,
          DATE,
          DIP,
          NE_VERSION,
          DATA_AVAILABILITY,
          ELEM,
          OSS_ID,
          BSC_DIP,
          SITE_NAME,
        }) => ({
          OSS_ID,
          ELEM,
          DATA_AVAILABILITY,
          NE_VERSION,
          DIP,
          BSC_DIP,
          SITE_NAME,
          DATE,
          HOUR,
          DIPNUAV,
          DIPFUAV,
          SF,
          ES,
          SES,
          UAS,
          SFR,
          ESR,
          SESR,
          UASR,
        })
      );
      return newArr;
    };

    const orderedFilteredData = orderHandler(filteredData);
    const orderedUasArr = orderHandler(uasArr);
    const orderedSesArr = orderHandler(sesArr);
    const orderedEsArr = orderHandler(esArr);

    // console.log(filteredData);
    // console.log(orderedFilteredData);

    var wb = XLSX.utils.book_new();
    // CONVERT FROM JSON TO SHEET
    var filteredDataSheet = XLSX.utils.json_to_sheet(orderedFilteredData);
    var uasSheet = XLSX.utils.json_to_sheet(orderedUasArr);
    var sesSheet = XLSX.utils.json_to_sheet(orderedSesArr);
    var esSheet = XLSX.utils.json_to_sheet(orderedEsArr);
    // APPEND SHEETS TO WB
    XLSX.utils.book_append_sheet(wb, filteredDataSheet, "All affected sites");
    XLSX.utils.book_append_sheet(wb, uasSheet, "UAS-UASR");
    XLSX.utils.book_append_sheet(wb, sesSheet, "SES-SESR");
    XLSX.utils.book_append_sheet(wb, esSheet, "ES-ESR");

    XLSX.writeFile(wb, "DIP-Report.xlsx");
  };

  // Table Data
  const tData = activeArr.map((eachRow, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{eachRow.dip}</td>
      <td>{eachRow.elem}</td>
      <td>{eachRow.site_name}</td>
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
      <Button variant="success" onClick={handleExportDip}>
        Extract Data
      </Button>

      <ButtonGroup aria-label="aria-labelledby" size="sm">
        <Button variant="primary" onClick={filteredDataHandler}>
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
