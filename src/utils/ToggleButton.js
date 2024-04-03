import React, { useState } from "react";
import { useDeathMode } from "../contexts/DeathModeContext";

const ToggleButton = () => {
  const {isDeathMode, toggleDeathMode} = useDeathMode()
  const handleToggle = () => {
    toggleDeathMode();
  };

  return (
    <div className="toggle-btn">
      <button onClick={handleToggle} style={{
          fontSize: '20px',
          borderRadius: '5px',
          padding: '1px 15px',
          boxShadow: isDeathMode ? '2px 4px 5px red' : '2px 4px 5px green',
        }} >{isDeathMode ? "ON" : "OFF"}</button>
    </div>
  );
};

export default ToggleButton;
