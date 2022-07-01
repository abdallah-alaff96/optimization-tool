import React, { useEffect, useState } from "react";
import InputFileComp from "../../components/InputFileComp";
import TchReport from "./TchReport";
import "./Tch.css";

function Tch() {
  const [myFile, setMyFile] = useState([]);
  const [filesToggle, setFilesToggle] = useState(true);

  // Tch file Handler
  const tchInputFileHandler = (data) => {
    setMyFile(data);
  };

  useEffect(() => {
    if (myFile.length !== 0) {
      setFilesToggle(false);
    }
  }, [myFile]);

  return (
    <>
      <div className="page-title"> ➡️ TCH Report</div>
      <div className="content tch">
        <div className="input-files-container">
          {filesToggle && (
            <InputFileComp
              onHandler={tchInputFileHandler}
              refSheetNumber={0}
              fileName={"TCH"}
            />
          )}
        </div>
        <TchReport tableContent={myFile} />
      </div>
    </>
  );
}

export default Tch;
