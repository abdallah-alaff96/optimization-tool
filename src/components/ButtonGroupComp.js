import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ButtonGroupComp({ ...props }) {
  const { funcArr, titleArr } = props;

  const buttonItem = funcArr?.map((pageFun, index) => {
    return (
      <Button variant="secondary" onClick={pageFun} key={index}>
        {titleArr[index]}
      </Button>
    );
  });

  return (
    <ButtonGroup
      aria-label="aria-labelledby"
      size="sm"
      className="dip-button-group"
    >
      {buttonItem}
    </ButtonGroup>
  );
}

export default ButtonGroupComp;
