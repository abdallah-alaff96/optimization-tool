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

  data?.map((row) => KeysToLowerCase(row));

  // filtering conditions the 4 sheets
  const today = new Date();

  data?.map((row) => {
    row.date = moment(row.date).add(1, "hours")._d;
  });

  const filteredData = data
    ?.filter((row) => row.date.toDateString() === today.toDateString())
    ?.filter((row) => row.hour === 6 || row.hour === 7);

  const downCells = filteredData?.filter(
    (row) => row.cell_down_time_min > 0 && row.cell_down_time_min < 100
  );

  const lowTchAvaCells = filteredData?.filter(
    (row) => row.cell_down_time_min === 0 && row.tch_availability__ < 92
  );

  // console.log(filteredData);
  console.log(lowTchAvaCells);

  return (
    <>
      {/* {activeExtractButton && (
        <div className="div-table-container">
          <div className="dip-buttons-container">
            <ButtonGroupComp
              funcArr={[filteredDataHandler, uasHandler, sesHandler, esHandler]}
              titleArr={["Filtered sheet", "UAS/UASR", "SES/SESR", "ES/ESR"]}
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
            refTableName={"dip"}
          />
        </div>
      )} */}
    </>
  );
}

export default TchTable;
