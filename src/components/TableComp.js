import React, { createContext, forwardRef } from "react";
import Table from "react-bootstrap/Table";
import { FixedSizeList as List } from "react-window";

function TableComp({ ...props }) {
  const { dataArr, headerArr, refTableName, dataLength } = props;
  let tData;

  // // Table Header
  // const tableHeader = headerArr?.map((headerName, index) => {
  //   return <th key={index}>{headerName}</th>;
  // });

  const StickyListContext = createContext();
  StickyListContext.displayName = "StickyListContext";

  // ItemWrapper renders only the non-sticky rows using the method passed in the main render function(ie- {Row}). This takes care of rendering the table data.
  const ItemWrapper = ({ data, index, style }) => {
    const { ItemRenderer, stickyIndices } = data;
    if (stickyIndices && stickyIndices.includes(index)) {
      return null;
    }
    return <ItemRenderer index={index} style={style} />;
  };

  // We will need two simple elements to render StickyRow and Row elements. You can add td elements here.
  const Row = ({ index, style }) => (
    <tr key={index} style={style} className="row_data">
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

  const StickyRow = ({ index, style }) => (
    <thead>
      <tr style={style} className="row_header">
        {headerArr?.map((headerName, index) => {
          return <th key={index}>{headerName}</th>;
        })}
      </tr>
    </thead>
  );

  // To render the table headers, we need a custom innerElementType.
  const innerElementType = forwardRef(({ children, ...rest }, ref) => (
    <StickyListContext.Consumer>
      {({ stickyIndices }) => (
        <Table
          ref={ref}
          {...rest}
          striped
          bordered
          hover
          className="my_table"
          size="sm"
        >
          {stickyIndices.map((index) => (
            <StickyRow
              index={index}
              key={index}
              style={{ top: index * 35, left: 0, width: "100%", height: 60 }}
            />
          ))}

          <tbody>{children}</tbody>
        </Table>
      )}
    </StickyListContext.Consumer>
  ));

  // We wrap the FixedSizeList in a Context that contains the sticky rows. In this case only the first row would be sticky.
  const StickyList = ({ children, stickyIndices, ...rest }) => (
    <StickyListContext.Provider
      value={{ ItemRenderer: children, stickyIndices }}
    >
      <List itemData={{ ItemRenderer: children, stickyIndices }} {...rest}>
        {ItemWrapper}
      </List>
    </StickyListContext.Provider>
  );

  // // Table Data
  // if (refTableName === "dip") {
  //   tData = dataArr?.map((rowObj, index) => (
  //     <tr key={index}>
  //       <td>{rowObj.dip}</td>
  //       <td>{rowObj.elem}</td>
  //       <td>{rowObj.site_name}</td>
  //       <td>{rowObj?.date?.toDateString()}</td>
  //       <td>{rowObj.hour}</td>
  //       <td>{rowObj.sf}</td>
  //       <td>{rowObj.es}</td>
  //       <td>{rowObj.ses}</td>
  //       <td>{rowObj.uas}</td>
  //       <td>{rowObj.sfr}</td>
  //       <td>{rowObj.esr}</td>
  //       <td>{rowObj.sesr}</td>
  //       <td>{rowObj.uasr}</td>
  //     </tr>
  //   ));
  // } else if (refTableName === "tch") {
  //   tData = ({ index, key }) => (
  //     <tr key={key}>
  //       <td>{dataArr[index].cell_name}</td>
  //       <td>{dataArr[index].date}</td>
  //       <td>{dataArr[index].hour}</td>
  //       <td>{dataArr[index].number_of_tch_s}</td>
  //       <td>{dataArr[index].tch_drop_rate__}</td>
  //       <td>{dataArr[index].subscriber_percived_tch_congestion__}</td>
  //       <td>{dataArr[index].tch_traffic_erlang}</td>
  //       <td>{dataArr[index].sdcch_availability}</td>
  //       <td>{dataArr[index].sdcch_drop_rate__}</td>
  //       <td>{dataArr[index].tch_availability__}</td>
  //       <td>{dataArr[index].cell_down_time_min}</td>
  //     </tr>
  //   );
  // }

  // console.log("hasMore? ", hasMore);
  return (
    <StickyList
      height={500}
      innerElementType={innerElementType}
      itemCount={dataLength}
      itemSize={50}
      stickyIndices={[0]}
      width={1200}
    >
      {Row}
    </StickyList>
  );
}

export default TableComp;
