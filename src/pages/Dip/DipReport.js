/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import SearchBarComp from "../../components/SearchBarComp";
import EmailSyntax from "../../components/EmailSyntax";
import moment from "moment";

function DipTable({ ...props }) {
  const { tableContent: data, tableTrans: transData } = props;

  // states for data arrays
  const [filteredData, setFilteredData] = useState([]);
  const [uasArr, setUasArr] = useState([]);
  const [sesArr, setSesArr] = useState([]);
  const [esArr, setEsArr] = useState([]);
  const [activeArr, setActiveArr] = useState([]);

  // Email-Syntax
  const [uniqueUasArr, setUniqueUasArr] = useState([]);
  const [uniqueSesArr, setUniqueSesArr] = useState([]);
  const [uniqueEsArr, setUniqueEsArr] = useState([]);

  // states for search|Extraction
  const [search, setSearch] = useState("");
  const [activateSearch, setActivateSearch] = useState(true);
  const [activeExtractButton, setActiveExtractButton] = useState(false);

  // other constants
  const today = new Date().toDateString();
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

  function mainProcess() {
    return new Promise((resolve, reject) => {
      // Edit trans Arr
      transData.map((row) => {
        return KeysToLowerCase(row);
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
        row.date = new Date(Date.parse(row.date)).toDateString();
      });

      // filtering conditions the 4 sheets
      const modData = data
        .filter((row) => row.site_name.startsWith("G"))
        ?.filter(
          (row) => row.date === today || (row.date !== today && row.hour >= 8)
        );
      setFilteredData(modData);
      setUasArr(modData.filter((row) => row.uas > 0 || row.uasr > 0));
      setSesArr(
        modData.filter(
          (row) =>
            (row.ses > 2 || row.sesr > 2) && row.uas === 0 && row.uasr === 0
        )
      );
      setEsArr(
        modData.filter(
          (row) =>
            (row.es > 500 || row.esr > 500) && row.uas === 0 && row.uasr === 0
        )
      );
      setActiveArr(data.filter((row) => row.site_name.startsWith("G")));

      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong");
      }
    });
  }

  useEffect(() => {
    if (data.length && transData.length) {
      const init = async () => {
        // call the promise
        await mainProcess();

        // show table
        setActiveExtractButton(true);
      };

      init().catch((error) => {
        console.log(error.message);
      });
    }
  }, [data, transData]);

  useEffect(() => {
    if (data.length && transData.length) {
      console.log("Search useEffect renders");
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

  // Email Syntax
  useEffect(() => {
    let bufferUas = [];
    let bufferSes = [];
    let bufferEs = [];

    uasArr?.map((row) => {
      for (const property in row) {
        if (property === "site_name") bufferUas.push(row[property]);
      }
    });

    sesArr?.map((row) => {
      for (const property in row) {
        if (property === "site_name") bufferSes.push(row[property]);
      }
    });

    esArr?.map((row) => {
      for (const property in row) {
        if (property === "site_name") bufferEs.push(row[property]);
      }
    });

    setUniqueUasArr([...new Set(bufferUas)]);
    setUniqueSesArr([...new Set(bufferSes)]);
    setUniqueEsArr([...new Set(bufferEs)]);
    console.log("Email-Syntx useEffect rendered");
  }, [uasArr, sesArr, esArr]);

  let excelData = [filteredData, uasArr, sesArr, esArr];
  console.log(data);
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
            <div className="buttons-container_inner">
              <ExportButton excelD={excelData} refReprot={"dip"} />
              <EmailSyntax
                uasArr={uniqueUasArr}
                sesArr={uniqueSesArr}
                esArr={uniqueEsArr}
                report={"dip"}
              />
            </div>
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
