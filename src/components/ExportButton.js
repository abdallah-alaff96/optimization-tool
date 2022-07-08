import React from "react";
import * as XLSX from "xlsx";
import KeysToUpperCase from "../handlers/KeysToUpperCase";
import Button from "react-bootstrap/Button";

function ExportButton({ ...props }) {
  const { excelD, refReprot } = props;

  //Write an Excel file
  const handleExport = (excelData, refReprot) => {
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
      const orderArr = orderHandler(arr, refReprot);
      // CONVERT FROM JSON TO SHEET
      var sheet = XLSX.utils.json_to_sheet(orderArr);
      // 2
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
      onClick={() => handleExport(excelD, refReprot)}
      className="dip-extract-button"
    >
      Extract Data
    </Button>
  );
}

export default ExportButton;

// Reorder the JSON file for Exporting Excel file
// if (refReprot === "dip") {
//   const newArr = arr.map(
//     ({
//       UASR,
//       SESR,
//       ESR,
//       SFR,
//       UAS,
//       SES,
//       ES,
//       SF,
//       DIPFUAV,
//       DIPNUAV,
//       HOUR,
//       DATE,
//       DIP,
//       NE_VERSION,
//       DATA_AVAILABILITY,
//       ELEM,
//       OSS_ID,
//       BSC_DIP,
//       SITE_NAME,
//     }) => ({
//       OSS_ID,
//       ELEM,
//       DATA_AVAILABILITY,
//       NE_VERSION,
//       DIP,
//       BSC_DIP,
//       SITE_NAME,
//       DATE,
//       HOUR,
//       DIPNUAV,
//       DIPFUAV,
//       SF,
//       ES,
//       SES,
//       UAS,
//       SFR,
//       ESR,
//       SESR,
//       UASR,
//     })
//   );
//   return newArr;
// } else return arr;

// else if (refReprot === "tch") {
//   const newArr = arr.map(
//     ({
//       call_setup_success_rate,
//       cell_down_time_min,
//       cell_name,
//       date,
//       hour,
//       lac,
//       number_of_accumulated_disabled_trx_by_btsps,
//       number_of_sdcch_s,
//       number_of_tch_s,
//       sdcch_availability,
//       sdcch_congestion_rate,
//       sdcch_drop_rate__,
//       sdcch_mean_holding_time_sec,
//       sdcch_time_congestion,
//       sdcch_traffic__erlang_,
//       subscriber_percived_tch_congestion__,
//       tch_assignment_success_rate__,
//       tch_avail_with_ps__,
//       tch_availability__,
//       tch_drop_rate__,
//       tch_traffic_erlang,
//       tch_traffic_fr_erlang,
//       tch_traffic_hr_erlang,
//     }) => ({
//       cell_name,
//       date,
//       hour,
//       call_setup_success_rate,
//       sdcch_availability,
//       number_of_sdcch_s,
//       sdcch_traffic__erlang_,
//       sdcch_time_congestion,
//       sdcch_congestion_rate,
//       sdcch_drop_rate__,
//       sdcch_mean_holding_time_sec,
//       tch_availability__,
//       number_of_tch_s,
//       tch_traffic_erlang,
//       tch_traffic_fr_erlang,
//       tch_traffic_hr_erlang,
//       subscriber_percived_tch_congestion__,
//       tch_drop_rate__,
//       tch_assignment_success_rate__,
//       tch_avail_with_ps__,
//       number_of_accumulated_disabled_trx_by_btsps,
//       cell_down_time_min,
//       lac,
//     })
//   );
