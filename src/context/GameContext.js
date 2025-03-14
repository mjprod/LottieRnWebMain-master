import React, { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [scratchStarted, setScratchStarted] = useState(false);
  const [luckySymbolCount, setLuckySymbolCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  return (
    <GameContext.Provider
      value={{
        user,
        setUser,
        score,
        setScore,
        gameOver,
        setGameOver,
        scratchStarted,
        setScratchStarted,
        luckySymbolCount,
        setLuckySymbolCount,
        ticketCount,
        setTicketCount,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
