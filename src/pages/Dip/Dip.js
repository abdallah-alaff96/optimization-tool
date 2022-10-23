import React, { useEffect, useState } from "react";
import InputFileComp from "../../components/InputFileComp";
import DipReport from "./DipReport";
import "./Dip.css";

function Dip() {
  const [myFile, setMyFile] = useState([]);
  const [transFile, setTransFile] = useState([]);
  const [filesToggle, setFilesToggle] = useState(true);
  const [transToggle, setTransToggle] = useState(false);

  // Dip file Handler
  const dipInputFileHandler = (data) => {
    // console.log("start setting data into state");
    setMyFile(data);
    // console.log("finish setting data into state");
  };

  // Trans file Handler
  const transInputFileHandler = (data) => {
    setTransFile(data);
  };

  useEffect(() => {
    if (myFile.length !== 0 && transFile.length !== 0) {
      setFilesToggle(false);
    } else if (transFile.length !== 0) {
      setTransToggle(true);
    }
  }, [myFile, transFile]);

  return (
    <>
      <div className="page-title"> ➡️ DIP Report</div>
      <div className="content dip">
        <div className="input-files-container">
          {filesToggle && (
            <InputFileComp
              onHandler={transInputFileHandler}
              refSheetNumber={1}
              fileName={"Transmission update"}
            />
          )}
          {filesToggle && transToggle && (
            <InputFileComp
              onHandler={dipInputFileHandler}
              refSheetNumber={0}
              fileName={"DIP"}
            />
          )}
        </div>
        <DipReport tableContent={myFile} tableTrans={transFile} />
      </div>
    </>
  );
}

export default React.memo(Dip);
