// SideBar.js
import React from "react";
import "../style/SideBar.css";

const SideBar = ({ handleNameClick }) => {
  const names = ["Name 1", "Name 2", "Name 3", "Name 4", "Name 5", "Name 6"];

  return (
    <div className="side-bar">
        <div className="text-wrapper">Active Miners</div>
        <p className="names">
          {names.map((name, index) => (
            <span
              key={index}
              onClick={() => handleNameClick(name)}
              className="name-link"
            >
              {name}
              <br />
            </span>
          ))}
        </p>
    </div>
  );
};

export default SideBar;
