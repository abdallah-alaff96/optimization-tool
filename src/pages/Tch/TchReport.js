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
    "Number of TCH's",
    "TCH drop Rate %",
    "Subscriber Percived TCH Congestion %",
    "TCH traffic Erlang",
    "SDCCH availability",
    "SDCCH drop Rate %",
    "TCH availability %",
    "No of Accumulated Disabled TRX by BTSPS",
    "Cell Down Time Min",
  ];

  data?.map((row) => KeysToLowerCase(row));

  // filtering conditions the 4 sheets
  const today = new Date().toDateString();

  data?.map((row) => {
    row.date = moment(row.date).add(1, "hours")._d;
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

  // console.log(data);
  // console.log(new Date(Date.parse(shallowData[0]?.date)).toDateString(), today);
  // console.log(shallowData);
  // console.log(filteredData);
  // console.log(downCells);
  // console.log(lowTchAvaCells);
  // console.log(haltedCells);

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
        <div className="div-table-container">
          <div className="dip-buttons-container">
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
