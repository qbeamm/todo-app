import React, { useState } from "react";

import chev from "../assets/chev-down.svg";
import "./Filter.css";

export default function Filter(props) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [select, setSelect] = useState("All");

  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const selected = (e) => {
    setSelect(e.currentTarget.getAttribute("value"));
    toggleFilter();
    props.filterData(e.currentTarget.getAttribute("value"));
  };

  return (
    <div className="filter">
      <div className="filter-container" onClick={toggleFilter}>
        <div>{select}</div>
        <img src={chev} alt="chev-down" />
      </div>
      {isFiltered ? (
        <div className="dropdown">
          <div className="filter-item" value="All" onClick={selected}>
            All
          </div>
          <div className="filter-item" value="Done" onClick={selected}>
            Done
          </div>
          <div className="filter-item" value="Undone" onClick={selected}>
            Undone
          </div>
        </div>
      ) : null}
    </div>
  );
}
