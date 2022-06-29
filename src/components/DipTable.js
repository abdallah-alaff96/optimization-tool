"use strict";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

import * as XLSX from "xlsx";

function DipTable({ ...props }) {
  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activeExtractButton, setActiveExtractButton] = useState(false);

  const { tableContent: data } = props;
  const { tableTrans: transData } = props;

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
    if (data.length !== 0 && transData.length !== 0) {
      setActiveArr(
        filteredData.filter((row) => row.site_name.includes(search))
      );
      setActiveExtractButton(true);
    }
  }, [data, transData, search]);

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

  // Seach bar handler
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  //Write an Excel file
  const handleExportDip = () => {
    //UpperCase Function
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
    // function to order the object keys for extraction to excel
    const orderHandler = (arr) => {
      // TO UpperCase()
      arr.map((row) => {
        keysToUpperCase(row);
      });
      // Reorder the JSON file for Exporting Excel file
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
    // call order function
    const orderedFilteredData = orderHandler(filteredData);
    const orderedUasArr = orderHandler(uasArr);
    const orderedSesArr = orderHandler(sesArr);
    const orderedEsArr = orderHandler(esArr);

    // Creact new WB
    var wb = XLSX.utils.book_new();
    // CONVERT FROM JSON TO SHEET
    var filteredDataSheet = XLSX.utils.json_to_sheet(orderedFilteredData);
    var uasSheet = XLSX.utils.json_to_sheet(orderedUasArr);
    var sesSheet = XLSX.utils.json_to_sheet(orderedSesArr);
    var esSheet = XLSX.utils.json_to_sheet(orderedEsArr);

    const widthHandler = (sheet) => {
      sheet["!cols"] = [
        { wch: 10 },
        { wch: 7 },
        { wch: 18 },
        { wch: 15 },
        { wch: 7 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
        { wch: 7 },
        { wch: 9 },
        { wch: 9 },
        { wch: 6 },
        { wch: 6 },
        { wch: 6 },
        { wch: 6 },
        { wch: 6 },
        { wch: 6 },
        { wch: 6 },
        { wch: 6 },
      ];
    };

    widthHandler(filteredDataSheet);
    widthHandler(uasSheet);
    widthHandler(sesSheet);
    widthHandler(esSheet);

    // // styling sheets (need pro version)

    // filteredDataSheet["A1"].s = {
    //   // set the style for target cell
    //   font: {
    //     sz: 24,
    //     bold: true,
    //   },
    // };

    // APPEND SHEETS TO WB

    XLSX.utils.book_append_sheet(wb, filteredDataSheet, "All affected sites");
    XLSX.utils.book_append_sheet(wb, uasSheet, "UAS-UASR");
    XLSX.utils.book_append_sheet(wb, sesSheet, "SES-SESR");
    XLSX.utils.book_append_sheet(wb, esSheet, "ES-ESR");

    XLSX.writeFile(wb, "DIP-Report.xlsx", {
      type: "buffer",
      cellStyles: true,
      cellDates: true,
      cellNF: true,
    });
  };
  // console.log(Object?.keys(activeArr[0])[0]);
  // Table Data
  const tData = activeArr?.map((eachRow, index) => (
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
      {activeExtractButton && (
        <div className="div-table-container">
          <div className="dip-buttons-container">
            <ButtonGroup
              aria-label="aria-labelledby"
              size="sm"
              className="dip-button-group"
            >
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

            <Form.Control
              size="sm"
              type="text"
              placeholder="Search..."
              className="search-input"
              onChange={searchHandler}
            />

            <Button
              variant="success"
              onClick={handleExportDip}
              className="dip-extract-button"
            >
              Extract Data
            </Button>
          </div>

          <Table striped bordered hover className="dip-table">
            <thead>
              <tr>
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
        </div>
      )}
    </>
  );
}

export default DipTable;
