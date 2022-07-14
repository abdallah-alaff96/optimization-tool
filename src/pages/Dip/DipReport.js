import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import Form from "react-bootstrap/Form";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import LoadingSpinner from "../../components/LoadingSpinner";

function DipTable({ ...props }) {
  const { tableContent: data, tableTrans: transData } = props;
  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSpinner, setActiveSpinner] = useState(false);
  const [activateSearch, setActivateSearch] = useState(true);
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

  // Edit trans Arr
  transData.map((row) => {
    KeysToLowerCase(row);
  });

  // Edit data Arr
  data.map((row) => {
    // Keys TO LOWERCASE
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
    setActiveSpinner(true);
    setActiveArr(filteredData);
    setActivateSearch(true);
  };
  const uasHandler = () => {
    setActiveSpinner(true);
    setActiveArr(uasArr);
    setActivateSearch(false);
  };
  const sesHandler = () => {
    setActiveSpinner(true);
    setActiveArr(sesArr);
    setActivateSearch(false);
  };
  const esHandler = () => {
    setActiveSpinner(true);
    setActiveArr(esArr);
    setActivateSearch(false);
  };

  // Seach bar handler
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  let excelData = [filteredData, uasArr, sesArr, esArr];
  console.log("DIP renders");
  return (
    <>
      {activeExtractButton && (
        <div className="table-container">
          <div className="buttons-container">
            <ButtonGroupComp
              funcArr={[filteredDataHandler, uasHandler, sesHandler, esHandler]}
              titleArr={["Filtered sheet", "UAS/UASR", "SES/SESR", "ES/ESR"]}
            />
            {activateSearch && (
              <Form.Control
                size="sm"
                type="text"
                placeholder="Site Name..."
                className="search-input"
                onChange={searchHandler}
              />
            )}
            {activeSpinner && <LoadingSpinner />}
            <ExportButton excelD={excelData} refReprot={"dip"} />
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
