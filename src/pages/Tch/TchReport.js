/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import moment from "moment";
import SearchBarComp from "../../components/SearchBarComp";
import EmailSyntax from "../../components/EmailSyntax";

function TchReport({ ...props }) {
  const { tableContent: data } = props;

  // states for data arrays
  const [allAffectedCellsArr, setAllAffectedCellsArr] = useState([]);
  const [lowTchAvaCells, setlowTchAvaCells] = useState([]);
  const [downCells, setdownCells] = useState([]);
  const [haltedCells, setHaltedCells] = useState([]);
  const [excelData, setexcelData] = useState([]);
  const [activeArr, setActiveArr] = useState([]);

  // Email-Syntax
  const [uniqueLowTchAvaCells, setUniqueLowTchAvaCells] = useState([]);
  const [uniqueDownCells, setUniqueDownCells] = useState([]);
  const [uniqueHaltedCells, setUniqueHaltedCells] = useState([]);

  // states for search|Extraction
  const [search, setSearch] = useState("");
  const [activateSearch, setActivateSearch] = useState(true);
  const [activeExtractButton, setActiveExtractButton] = useState(false);

  // other constants
  const today = new Date().toDateString();
  const headerArr = [
    "Cell Name",
    "Date",
    "Hour",
    "# of TCH's",
    "TCH drop Rate %",
    "Sub.Per. TCH Cong %",
    "TCH traffic",
    "SDCCH ava. %",
    "SDCCH drop Rate %",
    "TCH ava. %",
    "Down Time MIN",
  ];

  useEffect(() => {
    if (data.length !== 0) {
      data?.map((row) => KeysToLowerCase(row));

      // create shallow copy of data arr for editing
      const temporaryAllAffectedCellsArr = JSON?.parse(JSON?.stringify(data));

      temporaryAllAffectedCellsArr?.map((row) => {
        for (const property in row) {
          if (
            property !== "lac" &&
            property !== "cell_name" &&
            property !== "date" &&
            property !== "hour"
          )
            row[property] = parseFloat(row?.[property])?.toFixed(2);
        }
      });

      temporaryAllAffectedCellsArr?.map((row) => {
        row.date = moment(row.date).add(1, "hours")._d;
        row.date = new Date(Date.parse(row.date)).toDateString();
      });

      const temporaryFilteredData = temporaryAllAffectedCellsArr?.filter(
        (row) => (row.hour === 6 || row.hour === 7) && today === row.date
      );

      const temporarydownCells = temporaryFilteredData?.filter(
        (row) => row.cell_down_time_min > 0 && row.cell_down_time_min < 100
      );

      const temporaryLowTchAvaCells = temporaryFilteredData?.filter(
        (row) => row.cell_down_time_min === 0 && row.tch_availability__ < 92
      );

      const temporaryHaltedCells = temporaryFilteredData?.filter(
        (row) =>
          (!row.cell_down_time_min && row.cell_down_time_min !== 0) ||
          isNaN(row.cell_down_time_min)
      );
      temporaryHaltedCells?.map((row) => (row.cell_down_time_min = "Halted"));

      const temporaryExcelData = [
        temporaryAllAffectedCellsArr,
        temporaryLowTchAvaCells,
        temporarydownCells,
        temporaryHaltedCells,
      ];

      // set new state values
      setAllAffectedCellsArr(temporaryAllAffectedCellsArr);
      setlowTchAvaCells(temporaryLowTchAvaCells);
      setdownCells(temporarydownCells);
      setHaltedCells(temporaryHaltedCells);
      setexcelData(temporaryExcelData);
      setActiveArr(temporaryAllAffectedCellsArr);
      setActiveExtractButton(true);
    }
  }, [data, today]);

  useEffect(() => {
    if (data.length !== 0) {
      setActiveArr(
        allAffectedCellsArr.filter((row) => row.cell_name.includes(search))
      );
    }
  }, [allAffectedCellsArr, data.length, search]);

  // Active Button Handlers
  const dataHandler = () => {
    setActiveArr(allAffectedCellsArr);
    setActivateSearch(true);
  };
  const lowTchHandler = () => {
    setActiveArr(lowTchAvaCells);
    setActivateSearch(false);
  };
  const downCellsHandler = () => {
    setActiveArr(downCells);
    setActivateSearch(false);
  };
  const haltedCellsHandler = () => {
    setActiveArr(haltedCells);
    setActivateSearch(false);
  };

  // Seach button handler
  const searchButtonHandler = (searchedSite) => {
    setSearch(searchedSite);
  };

  // Email Syntax
  useEffect(() => {
    let bufferLow = [];
    let bufferDown = [];
    let bufferHalted = [];

    lowTchAvaCells?.map((row) => {
      for (const property in row) {
        if (property === "cell_name") bufferLow.push(row[property]);
      }
    });

    downCells?.map((row) => {
      for (const property in row) {
        if (property === "cell_name") bufferDown.push(row[property]);
      }
    });

    haltedCells?.map((row) => {
      for (const property in row) {
        if (property === "cell_name") bufferHalted.push(row[property]);
      }
    });

    setUniqueLowTchAvaCells([...new Set(bufferLow)]);
    setUniqueDownCells([...new Set(bufferDown)]);
    setUniqueHaltedCells([...new Set(bufferHalted)]);
  }, [lowTchAvaCells, downCells, haltedCells]);

  return (
    <React.Fragment>
      {activeExtractButton && (
        <div className="table-container">
          <div className="buttons-container">
            <ButtonGroupComp
              funcArr={[
                dataHandler,
                lowTchHandler,
                downCellsHandler,
                haltedCellsHandler,
              ]}
              titleArr={[
                "All affected cells",
                "Low TCH Ava.",
                "Down Cells",
                "Halted Cells",
              ]}
            />
            {activateSearch && (
              <SearchBarComp onClickHandler={searchButtonHandler} />
            )}
            <div className="buttons-container_inner">
              <ExportButton excelD={excelData} refReprot={"tch"} />
              <EmailSyntax
                lowTchAvaCells={uniqueLowTchAvaCells}
                downCells={uniqueDownCells}
                haltedCells={uniqueHaltedCells}
                report={"tch"}
              />
            </div>
          </div>

          <TableComp
            dataArr={activeArr}
            headerArr={headerArr}
            refTableName={"tch"}
            dataLength={activeArr.length}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default React.memo(TchReport);
