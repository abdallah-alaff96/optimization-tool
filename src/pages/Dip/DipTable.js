"use strict";
import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import * as XLSX from "xlsx";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import { KeysToUpperCase } from "../../handlers/KeysToUpperCase";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";

function DipTable({ ...props }) {
  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activeExtractButton, setActiveExtractButton] = useState(false);
  const dipheaderArr = [
    "DIP",
    "BSC",
    "Site Name",
    "Date",
    "Hour",
    "SF",
    "ES",
    "SES",
    "UAS",
    "SFR",
    "ESR",
    "SESR",
    "UASR",
  ];
  const { tableContent: data } = props;
  const { tableTrans: transData } = props;

  // Edit trans Arr
  transData.map((row) => {
    KeysToLowerCase(row);
  });

  // Edit data Arr
  data.map((row) => {
    // DATA TO LOWERCASE
    KeysToLowerCase(row);
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

  let excelData = [filteredData, uasArr, sesArr, esArr];

  /////////////Write an Excel file
  const handleExportDip = (eData) => {
    console.log(eData);
    // function to order the object keys for extraction to excel
    const orderHandler = (arr) => {
      // TO UpperCase()
      arr.map((row) => {
        KeysToUpperCase(row);
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

    // Creact new WB
    var wb = XLSX.utils.book_new();
    // create excelData
    eData.map((arr, index) => {
      // call order function
      const orderArr = orderHandler(arr);
      // CONVERT FROM JSON TO SHEET
      var sheet = XLSX.utils.json_to_sheet(orderArr);

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
      widthHandler(sheet);

      const namingHandler = (index) => {
        const dipSheetName = {
          0: "All affected sites",
          1: "UAS-UASR",
          2: "SES-SESR",
          3: "ES-ESR",
        };
        return dipSheetName[index];
      };

      XLSX.utils.book_append_sheet(wb, sheet, namingHandler(index));
    });

    XLSX.writeFile(wb, "DIP-Report.xlsx", {
      type: "buffer",
      cellStyles: true,
      cellDates: true,
      cellNF: true,
    });
  };

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
              placeholder="Site Name..."
              className="search-input"
              onChange={searchHandler}
            />

            <Button
              variant="success"
              onClick={() => handleExportDip(excelData)}
              className="dip-extract-button"
            >
              Extract Data
            </Button>
          </div>

          <TableComp
            dataArr={activeArr}
            headerArr={dipheaderArr}
            refTableName={"dip"}
          />
        </div>
      )}
    </>
  );
}

export default DipTable;
