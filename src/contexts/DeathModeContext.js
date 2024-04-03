// DeathModeContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Death Mode Context
const DeathModeContext = createContext();

// Create the Death Mode Provider
export const DeathModeProvider = ({ children }) => {
  const [isDeathMode, setIsDeathMode] = useState(true);

  const toggleDeathMode = () => {
    setIsDeathMode(prevMode => !prevMode);
    console.log("Value Changed")
  };

  return (
    <DeathModeContext.Provider value={{ isDeathMode, toggleDeathMode }}>
      {children}
    </DeathModeContext.Provider>
  );
};

export const useDeathMode = () => {
  return useContext(DeathModeContext);
};
