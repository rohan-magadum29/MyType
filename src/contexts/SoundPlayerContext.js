import React, { createContext, useContext, useState } from 'react';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [correctSound] = useState(new Audio('/path/to/correct-sound.mp3'));
  const [wrongSound] = useState(new Audio('/audio/wrong-47985.mp3'));

  const playCorrectSound = () => {
    correctSound.currentTime = 0;
    correctSound.play();
  };

  const playWrongSound = () => {
    wrongSound.currentTime = 0;
    wrongSound.play();
  };

  return (
    <SoundContext.Provider value={{ playCorrectSound, playWrongSound }}>
      {children}
    </SoundContext.Provider>
  );
};
