import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import Form from "react-bootstrap/Form";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import moment from "moment";
import SearchBarComp from "../../components/SearchBarComp";

function TchTable({ ...props }) {
  const { tableContent: data } = props;

  const [allAffectedCellsArr, setAllAffectedCellsArr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lowTchAvaCells, setlowTchAvaCells] = useState([]);
  const [downCells, setdownCells] = useState([]);
  const [haltedCells, setHaltedCells] = useState([]);
  const [excelData, setexcelData] = useState([]);

  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activateSearch, setActivateSearch] = useState(true);
  const [activeExtractButton, setActiveExtractButton] = useState(false);

  const today = new Date().toDateString();
  const dipheaderArr = [
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
        // to add one 1 day to the entered date (fixing sheetJS date)
        row.sdcch_traffic__erlang_ = parseFloat(
          row?.sdcch_traffic__erlang_
        )?.toFixed(2);
        row.tch_availability__ = parseFloat(row?.tch_availability__)?.toFixed(
          2
        );
        row.sdcch_drop_rate__ = parseFloat(row?.sdcch_drop_rate__)?.toFixed(2);
        row.number_of_tch_s = parseFloat(row?.number_of_tch_s)?.toFixed(2);
        row.sdcch_availability = parseFloat(row?.sdcch_availability)?.toFixed(
          2
        );
        row.call_setup_success_rate = parseFloat(
          row?.call_setup_success_rate
        )?.toFixed(2);
        row.tch_traffic_erlang = parseFloat(row?.tch_traffic_erlang)?.toFixed(
          2
        );
        row.tch_drop_rate__ = parseFloat(row?.tch_drop_rate__)?.toFixed(2);
        row.subscriber_percived_tch_congestion__ = parseFloat(
          row?.subscriber_percived_tch_congestion__
        )?.toFixed(2);
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
        (row) => !row.cell_down_time_min && row.cell_down_time_min !== 0
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
      setFilteredData(temporaryFilteredData);
      setlowTchAvaCells(temporaryLowTchAvaCells);
      setdownCells(temporarydownCells);
      setHaltedCells(temporaryHaltedCells);
      setexcelData(temporaryExcelData);
      setActiveArr(temporaryAllAffectedCellsArr);

      console.log("useEffect renders", temporaryExcelData);

      setActiveExtractButton(true);
    }
  }, [data]);

  useEffect(() => {
    if (data.length !== 0) {
      setActiveArr(
        allAffectedCellsArr.filter((row) => row.cell_name.includes(search))
      );
      console.log("useEffect Search");
    }
  }, [search]);

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

  console.log("component rendered", excelData);

  // Seach button handler
  const searchButtonHandler = (searchedSite) => {
    setSearch(searchedSite);
  };

  return (
    <>
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
            <ExportButton excelD={excelData} refReprot={"tch"} />
          </div>

          <TableComp
            dataArr={activeArr}
            headerArr={dipheaderArr}
            refTableName={"tch"}
          />
        </div>
      )}
    </>
  );
}

export default TchTable;
