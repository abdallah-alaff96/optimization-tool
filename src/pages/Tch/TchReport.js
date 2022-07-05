import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import Form from "react-bootstrap/Form";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";
import moment from "moment";

function TchTable({ ...props }) {
  const { tableContent: data } = props;
  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activeExtractButton, setActiveExtractButton] = useState(false);
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
    // "# of Acc.Dis. TRX by BTSPS",
    "Down Time MIN",
  ];

  data?.map((row) => KeysToLowerCase(row));

  // filtering conditions the 4 sheets
  const today = new Date().toDateString();

  data?.map((row) => {
    row.date = moment(row.date).add(1, "hours")._d;
    row.sdcch_traffic__erlang_ = +row.sdcch_traffic__erlang_.toFixed(2);
    row.call_setup_success_rate = +row.call_setup_success_rate.toFixed(2);
    row.tch_traffic_erlang = +row.tch_traffic_erlang.toFixed(2);
    row.tch_drop_rate__ = +row.tch_drop_rate__.toFixed(2);
    row.subscriber_percived_tch_congestion__ =
      +row.subscriber_percived_tch_congestion__.toFixed(2);
  });

  const shallowData = JSON.parse(JSON.stringify(data));
  shallowData.map((row) => {
    row.date = new Date(Date.parse(row.date)).toDateString();
  });

  const filteredData = shallowData
    ?.filter((row) => row.date === today)
    ?.filter((row) => row.hour === 6 || row.hour === 7);

  const downCells = filteredData?.filter(
    (row) => row.cell_down_time_min > 0 && row.cell_down_time_min < 100
  );

  const lowTchAvaCells = filteredData?.filter(
    (row) => row.cell_down_time_min === 0 && row.tch_availability__ < 92
  );

  const haltedCells = filteredData?.filter(
    (row) => !row.cell_down_time_min && row.cell_down_time_min !== 0
  );
  haltedCells?.map((row) => (row.cell_down_time_min = "Halted"));
  const futureDate = new Date();

  useEffect(() => {
    if (data.length !== 0) {
      setActiveArr(shallowData);
      setActiveExtractButton(true);
    }
  }, [data, search]);

  // Active Button Handlers
  const dataHandler = () => {
    setActiveArr(shallowData);
  };
  const lowTchHandler = () => {
    setActiveArr(lowTchAvaCells);
  };
  const downCellsHandler = () => {
    setActiveArr(downCells);
  };
  const haltedCellsHandler = () => {
    setActiveArr(haltedCells);
  };

  // Seach bar handler
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  let excelData = [shallowData, lowTchAvaCells, downCells, haltedCells];
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
            <Form.Control
              size="sm"
              type="text"
              placeholder="Site Name..."
              className="search-input"
              onChange={searchHandler}
            />
            <ExportButton excelD={excelData} />
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
