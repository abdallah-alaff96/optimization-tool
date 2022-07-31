import React, { createContext, forwardRef } from "react";
import Table from "react-bootstrap/Table";
import { FixedSizeList as List } from "react-window";

function TableComp({ ...props }) {
  const { dataArr, headerArr, refTableName, dataLength } = props;

  const StickyListContext = createContext();
  StickyListContext.displayName = "StickyListContext";

  // ItemWrapper renders only the non-sticky rows using the method passed in the main render function(ie- {Row}). This takes care of rendering the table data.
  const ItemWrapper = ({ data, index, style }) => {
    const { ItemRenderer, stickyIndices } = data;
    if (stickyIndices && stickyIndices.includes(index + 1)) {
      return null;
    }
    return <ItemRenderer index={index} style={style} />;
  };

  // We will need two simple elements to render StickyRow and Row elements. You can add td elements here.
  let Row;
  if (refTableName === "tch") {
    Row = ({ index, style }) => (
      <tr key={index} style={style} className="row_data">
        <td>{dataArr[index].cell_name}</td>
        <td className="date_data">{dataArr[index].date}</td>
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
  } else if (refTableName === "dip") {
    Row = ({ index, style }) => (
      <tr key={index} style={style} className="row_data">
        <td>{dataArr[index].site_name}</td>
        <td className="date_data">{dataArr[index]?.date?.toDateString()}</td>
        <td>{dataArr[index].hour}</td>
        <td>{dataArr[index].sf}</td>
        <td>{dataArr[index].es}</td>
        <td>{dataArr[index].ses}</td>
        <td>{dataArr[index].uas}</td>
        <td>{dataArr[index].sfr}</td>
        <td>{dataArr[index].esr}</td>
        <td>{dataArr[index].sesr}</td>
        <td>{dataArr[index].uasr}</td>
        <td>{dataArr[index].dip}</td>
        <td>{dataArr[index].elem}</td>
      </tr>
    );
  }

  const StickyRow = ({ index, style }) => (
    <tr className="sticky_header" style={style}>
      {headerArr.map((header, index) => (
        <th key={index} className={index === 1 ? "date_sticky_header" : ""}>
          {header}
        </th>
      ))}
    </tr>
  );

  // To render the table headers, we need a custom innerElementType.
  const innerElementType = forwardRef(({ children, ...rest }, ref) => (
    <StickyListContext.Consumer>
      {({ stickyIndices }) => (
        <Table ref={ref} {...rest} striped bordered hover size="sm">
          <thead>
            {stickyIndices.map((index) => (
              <StickyRow
                index={index}
                key={index}
                style={{ top: index * 35, left: 0, width: "100%", height: 60 }}
              />
            ))}
          </thead>
          <tbody className="report_tbody">{children}</tbody>
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

  console.log("TableComp renders");
  return (
    <StickyList
      height={500}
      innerElementType={innerElementType}
      itemCount={dataLength}
      itemSize={30}
      stickyIndices={[0]}
      width={1200}
    >
      {Row}
    </StickyList>
  );
}

export default TableComp;
