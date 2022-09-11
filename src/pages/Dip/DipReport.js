import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import SearchBarComp from "../../components/SearchBarComp";
import moment from "moment";

function DipTable({ ...props }) {
  const { tableContent: data, tableTrans: transData } = props;

  // states for data arrays
  const [filteredData, setFilteredData] = useState([]);
  const [uasArr, setUasArr] = useState([]);
  const [sesArr, setSesArr] = useState([]);
  const [esArr, setEsArr] = useState([]);
  const [activeArr, setActiveArr] = useState([]);

  // states for search|Extraction
  const [search, setSearch] = useState("");
  const [activateSearch, setActivateSearch] = useState(true);
  const [activeExtractButton, setActiveExtractButton] = useState(false);

  // other constants
  const dipheaderArr = [
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
    "DIP",
    "BSC",
  ];

  useEffect(() => {
    if (data.length !== 0 && transData.length !== 0) {
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
        row.date = moment(row.date).add(1, "hours")._d;
      });

      // filtering conditions the 4 sheets
      const modData = data.filter((row) => row.site_name.startsWith("G"));
      setFilteredData(modData);
      setUasArr(modData.filter((row) => row.uas > 0 || row.uasr > 0));
      setSesArr(modData.filter((row) => row.ses > 2 || row.sesr > 2));
      setEsArr(modData.filter((row) => row.es > 100 || row.esr > 100));
      setActiveArr(data.filter((row) => row.site_name.startsWith("G")));
      setActiveExtractButton(true);

      // console.log("useEffect renders");
    }
  }, [data, transData]);

  useEffect(() => {
    if (data.length !== 0 && transData.length !== 0) {
      // console.log("useEffect renders");
      setActiveArr(
        filteredData.filter((row) => row.site_name.includes(search))
      );
    }
  }, [search]);

  // Active Button Handlers
  const filteredDataHandler = () => {
    setActiveArr(filteredData);
    setActivateSearch(true);
    console.log(filteredData);
  };
  const uasHandler = () => {
    setActiveArr(uasArr);
    setActivateSearch(false);
    console.log(uasArr);
  };
  const sesHandler = () => {
    setActiveArr(sesArr);
    setActivateSearch(false);
    console.log(sesArr);
  };
  const esHandler = () => {
    setActiveArr(esArr);
    setActivateSearch(false);
    console.log(esArr);
  };

  // Seach bar handler
  const searchButtonHandler = (searchedSite) => {
    setSearch(searchedSite);
  };

  let excelData = [filteredData, uasArr, sesArr, esArr];

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
              <SearchBarComp onClickHandler={searchButtonHandler} />
            )}
            <ExportButton excelD={excelData} refReprot={"dip"} />
          </div>

          <TableComp
            dataArr={activeArr}
            dataLength={activeArr.length}
            headerArr={dipheaderArr}
            refTableName={"dip"}
          />
        </div>
      )}
    </>
  );
}

export default React.memo(DipTable);
