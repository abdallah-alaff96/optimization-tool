import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function SearchBarComp({ ...props }) {
  const { onClickHandler } = props;
  const [searchedSite, setSearchedSite] = useState("");

  // Seach input handler
  const searchInputHandler = (event) => {
    setSearchedSite(event.target.value);
  };

  console.log("searchedSites renders");

  return (
    <InputGroup className="col-6">
      <FormControl
        aria-label="Search"
        aria-describedby="basic-addon2"
        size="sm"
        type="text"
        placeholder="Site Name..."
        className="search-input"
        onChange={searchInputHandler}
      />
      <Button
        variant="outline-secondary"
        onClick={() => onClickHandler(searchedSite)}
      >
        Search
      </Button>
    </InputGroup>
  );
}

export default SearchBarComp;
