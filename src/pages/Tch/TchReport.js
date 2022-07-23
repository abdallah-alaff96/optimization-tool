import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import moment from "moment";
import SearchBarComp from "../../components/SearchBarComp";

function TchReport({ ...props }) {
  const { tableContent: data } = props;

  // states for data arrays
  const [allAffectedCellsArr, setAllAffectedCellsArr] = useState([]);
  const [lowTchAvaCells, setlowTchAvaCells] = useState([]);
  const [downCells, setdownCells] = useState([]);
  const [haltedCells, setHaltedCells] = useState([]);
  const [excelData, setexcelData] = useState([]);

  // states for active|search|Extraction
  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activateSearch, setActivateSearch] = useState(true);
  const [activeExtractButton, setActiveExtractButton] = useState(false);

  // states for Infinite scroll
  const [count, setCount] = useState({
    prev: 0,
    next: 20,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);

  // other constants
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
      setlowTchAvaCells(temporaryLowTchAvaCells);
      setdownCells(temporarydownCells);
      setHaltedCells(temporaryHaltedCells);
      setexcelData(temporaryExcelData);
      setActiveArr(temporaryAllAffectedCellsArr);
      setCurrent(temporaryAllAffectedCellsArr.slice(count.prev, count.next));

      console.log("useEffect renders", temporaryExcelData);

      setActiveExtractButton(true);
    }
  }, [data]);

  useEffect(() => {
    if (data.length !== 0) {
      setActiveArr(
        allAffectedCellsArr.filter((row) => row.cell_name.includes(search))
      );
      // console.log("useEffect Search");
    }
  }, [search]);

  const getMoreData = () => {
    // console.log("getMoreData()");
    if (current.length === activeArr.length) {
      console.log("no more data");
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      // console.log("timeout function runs");
      setCurrent(
        current.concat(activeArr.slice(count.prev + 10, count.next + 10))
      );
    }, 3000);
    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };

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

  // console.log("component rendered", excelData, current);

  // Seach button handler
  const searchButtonHandler = (searchedSite) => {
    setSearch(searchedSite);
  };

  console.log("current.length:", current.length);
  console.log("active.length:", activeArr.length);

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
            dataArr={current}
            headerArr={dipheaderArr}
            refTableName={"tch"}
            dataLength={current.length}
            next={getMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          />
        </div>
      )}
    </>
  );
}

export default TchReport;
