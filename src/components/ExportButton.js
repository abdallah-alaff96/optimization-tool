import React from "react";
import * as XLSX from "xlsx";
import KeysToUpperCase from "../handlers/KeysToUpperCase";
import Button from "react-bootstrap/Button";

function ExportButton({ ...props }) {
  const { excelD } = props;

  //Write an Excel file
  const handleExport = (excelData) => {
    // function to order the object keys for extraction to excel
    const orderHandler = (arr) => {
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
    excelData.map((arr, index) => {
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
      type: "binary",
      cellStyles: true,
      cellDates: true,
      cellNF: true,
    });
  };

  return (
    <Button
      variant="success"
      onClick={() => handleExport(excelD)}
      className="dip-extract-button"
    >
      Extract Data
    </Button>
  );
}

export default ExportButton;
