import React, { useEffect, useState } from "react";
import TableComp from "../../components/TableComp";
import { KeysToLowerCase } from "../../handlers/KeysToLowerCase";
import Form from "react-bootstrap/Form";
import ExportButton from "../../components/ExportButton";
import ButtonGroupComp from "../../components/ButtonGroupComp";

function TchTable({ ...props }) {
  const { tableContent: data } = props;
  const [activeArr, setActiveArr] = useState([]);
  const [search, setSearch] = useState("");
  const [activeExtractButton, setActiveExtractButton] = useState(false);

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
