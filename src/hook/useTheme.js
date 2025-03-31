import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { numberOfCards } from "../global/Settings";
import themes from "../global/themeConfig";

export const ThemeEnum = Object.freeze({
  EGYPT: "egypt",
  MYTHOLOGY: "mythology",
  INTERNATIONAL: "international",
  COWBOY: "cowboy",
});

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeSequence, setThemeSequence] = useState();

  useEffect(() => {
    console.log("Current themeSequence:", themeSequence);
  }, [themeSequence]);

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [gameCenterIcon, setGameCenterIcon] = useState();
  const [backgroundLoop, setBackgroundLoop] = useState();
  const [backgroundScratchCard, setBackgroundScratchCard] = useState();
  const [introChromeTheme, setIntroChromeTheme] = useState();
  const [introTheme, setIntroTheme] = useState();
  const [lottiePopBlue, setLottiePopBlue] = useState();
  const [lottiePopGreen, setLottiePopGreen] = useState();
  const [lottiePopOrange, setLottiePopOrange] = useState();
  const [lottiePopPink, setLottiePopPink] = useState();
  const [soundMuteOnBackground, setSoundMuteOnBackground] = useState();
  const [soundMuteOffBackground, setSoundMuteOffBackground] = useState();

  const setGames = (games) => {
    const themeSequence = games.map(game => {
      switch(game.theme_id) {
        case 1: return ThemeEnum.EGYPT
        case 2: return ThemeEnum.MYTHOLOGY
        case 3: return ThemeEnum.INTERNATIONAL
        case 4: return ThemeEnum.COWBOY
      }
    });
    setThemeSequence(themeSequence)
    setCurrentThemeIndex(0);
  }

  const setCurrentThemeByIndex = (index) => {
    if (index >= 0 && index < themeSequence.length) {
      setCurrentThemeIndex(index);
    } else {
      console.error("Invalid theme index");
    }
  };

  const goToNextTheme = useCallback(() => {
    console.log("Going to the next theme");
    if (currentThemeIndex < themeSequence.length - 1) {
      setCurrentThemeIndex(currentThemeIndex + 1);
      console.log(`New theme index: ${currentThemeIndex + 1}`);
    } else {
      console.log("You are already on the last theme");
    }
  }, [currentThemeIndex, themeSequence]);

  useEffect(() => {
    if (themeSequence && themeSequence.length > 0) {
      setGameCenterIcon(
        themes[themeSequence[currentThemeIndex]].gameCenterIcon
      );
      setBackgroundLoop(
        themes[themeSequence[currentThemeIndex]].backgroundLoop
      );
      setBackgroundScratchCard(
        themes[themeSequence[currentThemeIndex]].backgroundScratchCard
      );
      setIntroChromeTheme(
        themes[themeSequence[currentThemeIndex]].intro_chrome
      );
      setIntroTheme(themes[themeSequence[currentThemeIndex]].intro);
      setLottiePopBlue(
        themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopBlue
      );
      setLottiePopGreen(
        themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopGreen
      );
      setLottiePopOrange(
        themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopOrange
      );
      setLottiePopPink(
        themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopPink
      );
      setSoundMuteOnBackground(
        themes[themeSequence[currentThemeIndex]].soundMuteOnBackground
      );
      setSoundMuteOffBackground(
        themes[themeSequence[currentThemeIndex]].soundMuteOffBackground
      );
    }
  }, [currentThemeIndex, themeSequence]);

  const contextValue = useMemo(
    () => {
      if(themeSequence) {
        return ({
          themeSequence,
          currentTheme: themeSequence[currentThemeIndex],
          nextTheme: currentThemeIndex + 1 < themeSequence.length
            ? themeSequence[currentThemeIndex + 1]
            : null,
          gameCenterIcon,
          backgroundLoop,
          backgroundScratchCard,
          introChromeTheme,
          introTheme,
          introThemeNext:
            currentThemeIndex + 1 < themeSequence.length
              ? themes[themeSequence[currentThemeIndex + 1]].intro_default
              : null,
          introChromeThemeNext:
            currentThemeIndex + 1 < themeSequence.length
              ? themes[themeSequence[currentThemeIndex + 1]].intro_chrome
              : null,
          lottiePopBlue,
          lottiePopGreen,
          lottiePopOrange,
          lottiePopPink,
          soundMuteOnBackground,
          soundMuteOffBackground,
          setCurrentThemeByIndex,
          goToNextTheme,
          setGames,
          currentThemeIndex,
        });
      }else {
        return ({
          themeSequence,
          currentTheme: null,
          nextTheme: null,
          gameCenterIcon,
          backgroundLoop,
          backgroundScratchCard,
          introChromeTheme,
          introTheme,
          introThemeNext: null,
          introChromeThemeNext: null,
          lottiePopBlue,
          lottiePopGreen,
          lottiePopOrange,
          lottiePopPink,
          soundMuteOnBackground,
          soundMuteOffBackground,
          setCurrentThemeByIndex,
          goToNextTheme,
          setGames,
          currentThemeIndex,
        });
      }
    },
    [
      themeSequence,
      currentThemeIndex,
      gameCenterIcon,
      backgroundLoop,
      backgroundScratchCard,
      introChromeTheme,
      introTheme,
      lottiePopBlue,
      lottiePopGreen,
      lottiePopOrange,
      lottiePopPink,
      soundMuteOnBackground,
      soundMuteOffBackground,
    ]
  );
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to consume the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
