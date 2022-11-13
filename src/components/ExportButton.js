import React from "react";
import * as XLSX from "xlsx";
import KeysToUpperCase from "../handlers/KeysToUpperCase";
import Button from "react-bootstrap/Button";

function ExportButton({ ...props }) {
  const { excelD, refReprot } = props;
  const excelDMod = JSON?.parse(JSON?.stringify(excelD));

  //Write an Excel file
  const handleExport = (excelData) => {
    // function to order the object keys for extraction to excel
    const orderHandler = (arr) => {
      arr.map((row) => {
        KeysToUpperCase(row);
      });
      return arr;
    };

    // Creact new WB
    var wb = XLSX.utils.book_new();

    // create excelData
    excelData.map((arr, index) => {
      // call order function
      const orderArr = orderHandler(arr);
      // CONVERT FROM JSON TO SHEET
      var sheet = XLSX.utils.json_to_sheet(orderArr);
      // 2
      const widthHandler = (sheet, refReprot) => {
        if (refReprot === "dip") {
          sheet["!cols"] = [
            { wch: 10 },
            { wch: 7 },
            { wch: 10 },
            { wch: 6 },
            { wch: 12 },
            { wch: 11 },
            { wch: 5 },
            { wch: 15 },
            { wch: 6 },
            { wch: 8 },
            { wch: 8 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
            { wch: 5 },
          ];
        } else if (refReprot === "tch") {
          sheet["!cols"] = [
            { wch: 10 },
            { wch: 15 },
            { wch: 5 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
          ];
        }
      };
      widthHandler(sheet, refReprot);
      // 3
      const namingHandler = (index, refReprot) => {
        if (refReprot === "dip") {
          const dipSheetName = {
            0: "All affected sites",
            1: "UAS-UASR",
            2: "SES-SESR",
            3: "ES-ESR",
          };
          return dipSheetName[index];
        } else if (refReprot === "tch") {
          const tchSheetName = {
            0: "All affected cells",
            1: "Low TCH Availability",
            2: "Down Cells",
            3: "Halted Cells",
          };
          return tchSheetName[index];
        }
      };

      XLSX.utils.book_append_sheet(wb, sheet, namingHandler(index, refReprot));
    });

    XLSX.writeFile(
      wb,
      refReprot === "dip" ? "DIP-Report.xlsx" : "TCH-Report.xlsx",
      {
        type: "binary",
        cellStyles: true,
        cellDates: true,
        cellNF: true,
      }
    );
  };

  return (
    <Button
      variant="success"
      onClick={() => handleExport(excelDMod, refReprot)}
      className="dip-extract-button"
    >
      Download Excel
    </Button>
  );
}

export default ExportButton;
