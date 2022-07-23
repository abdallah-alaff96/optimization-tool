import React from "react";
import Table from "react-bootstrap/Table";
import InfiniteScroll from "react-infinite-scroll-component";

function TableComp({ ...props }) {
  const {
    dataArr,
    headerArr,
    refTableName,
    dataLength,
    next,
    hasMore,
    loader,
  } = props;

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
    tData = dataArr?.map((rowObj, index) => (
      <tr key={index}>
        <td>{rowObj.cell_name}</td>
        <td>{rowObj.date}</td>
        <td>{rowObj.hour}</td>
        <td>{rowObj.number_of_tch_s}</td>
        <td>{rowObj.tch_drop_rate__}</td>
        <td>{rowObj.subscriber_percived_tch_congestion__}</td>
        <td>{rowObj.tch_traffic_erlang}</td>
        <td>{rowObj.sdcch_availability}</td>
        <td>{rowObj.sdcch_drop_rate__}</td>
        <td>{rowObj.tch_availability__}</td>
        <td>{rowObj.cell_down_time_min}</td>
      </tr>
    ));
  }
  console.log("hasMore? ", hasMore);
  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={loader}
      >
        <Table striped bordered hover className="my_table" size="sm">
          <thead>
            <tr>{tableHeader}</tr>
          </thead>

          <tbody>{tData}</tbody>
        </Table>
      </InfiniteScroll>
    </>
  );
}

export default TableComp;
