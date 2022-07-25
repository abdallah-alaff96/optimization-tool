import React from "react";
import Table from "react-bootstrap/Table";
import { FixedSizeList as List } from "react-window";

function TableComp({ ...props }) {
  const { dataArr, headerArr, refTableName, dataLength } = props;

  let tData;
  // Table Header
  const tableHeader = headerArr?.map((headerName, index) => {
    return <th key={index}>{headerName}</th>;
  });

  // Table Data
  if (refTableName === "dip") {
    tData = dataArr?.map((rowObj, index) => (
      <tr key={index}>
        <td>{rowObj.dip}</td>
        <td>{rowObj.elem}</td>
        <td>{rowObj.site_name}</td>
        <td>{rowObj?.date?.toDateString()}</td>
        <td>{rowObj.hour}</td>
        <td>{rowObj.sf}</td>
        <td>{rowObj.es}</td>
        <td>{rowObj.ses}</td>
        <td>{rowObj.uas}</td>
        <td>{rowObj.sfr}</td>
        <td>{rowObj.esr}</td>
        <td>{rowObj.sesr}</td>
        <td>{rowObj.uasr}</td>
      </tr>
    ));
  } else if (refTableName === "tch") {
    tData = ({ index, key }) => (
      <tr key={key}>
        <td>{dataArr[index].cell_name}</td>
        <td>{dataArr[index].date}</td>
        <td>{dataArr[index].hour}</td>
        <td>{dataArr[index].number_of_tch_s}</td>
        <td>{dataArr[index].tch_drop_rate__}</td>
        <td>{dataArr[index].subscriber_percived_tch_congestion__}</td>
        <td>{dataArr[index].tch_traffic_erlang}</td>
        <td>{dataArr[index].sdcch_availability}</td>
        <td>{dataArr[index].sdcch_drop_rate__}</td>
        <td>{dataArr[index].tch_availability__}</td>
        <td>{dataArr[index].cell_down_time_min}</td>
      </tr>
    );
  }
  // console.log("hasMore? ", hasMore);
  return (
    <React.Fragment>
      <Table striped bordered hover className="my_table" size="sm">
        <thead>
          <tr>{tableHeader}</tr>
        </thead>

        <tbody>
          <List width={900} height={700} itemCount={dataLength} itemSize={120}>
            {tData}
          </List>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default TableComp;
