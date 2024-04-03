// GameCountContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const GameCountContext = createContext();

// Custom hook to use the context
export const useGameCount = () => useContext(GameCountContext);

// Provider component to wrap the application with
export const GameCountProvider = ({ children }) => {
  const [gameCount, setGameCount] = useState(0);

  const incrementGameCount = () => {
    setGameCount((prevCount) => prevCount + 1);
  };

  const resetGameCount = () => {
    setGameCount(0);
  };

  return (
    <GameCountContext.Provider value={{ gameCount, incrementGameCount, resetGameCount }}>
      {children}
    </GameCountContext.Provider>
  );
};
