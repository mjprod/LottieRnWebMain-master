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

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const getRandomThemesArray = (numberOfCards) => {
  const themeValues = shuffleArray(Object.values(ThemeEnum));
  let themesArray = [];

  while (themesArray.length < numberOfCards) {
    for (const theme of themeValues) {
      if (themesArray.length + 3 <= numberOfCards) {
        themesArray.push(...Array(3).fill(theme));
      } else {
        themesArray.push(...Array(numberOfCards - themesArray.length).fill(theme));
        break;
      }
    }
  }

  return themesArray;
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeSequence, setThemeSequence] = useState(
    getRandomThemesArray(numberOfCards)
  );

  useEffect(() => {
    console.log("Current themeSequence:", themeSequence);
  }, [themeSequence]);

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const [gameCenterIcon, setGameCenterIcon] = useState(
    themes[themeSequence[currentThemeIndex]].gameCenterIcon
  );
  const [backgroundLoop, setBackgroundLoop] = useState(
    themes[themeSequence[currentThemeIndex]].backgroundLoop
  );
  const [backgroundScratchCard, setBackgroundScratchCard] = useState(
    themes[themeSequence[currentThemeIndex]].backgroundScratchCard
  );
  const [introChromeTheme, setIntroChromeTheme] = useState(
    themes[themeSequence[currentThemeIndex]].intro_chrome
  );
  const [introTheme, setIntroTheme] = useState(
    themes[themeSequence[currentThemeIndex]].intro
  );
  const [lottiePopBlue, setLottiePopBlue] = useState(
    themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopBlue
  );
  const [lottiePopGreen, setLottiePopGreen] = useState(
    themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopGreen
  );
  const [lottiePopOrange, setLottiePopOrange] = useState(
    themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopOrange
  );
  const [lottiePopPink, setLottiePopPink] = useState(
    themes[themeSequence[currentThemeIndex]].lottieScratchieBubblePopPink
  );

  const [soundMuteOnBackground, setSoundMuteOnBackground] = useState(
    themes[themeSequence[currentThemeIndex]].soundMuteOnBackground
  );

  const [soundMuteOffBackground, setSoundMuteOffBackground] = useState(
    themes[themeSequence[currentThemeIndex]].soundMuteOffBackground
  );

  const updateThemeSequence = (numberOfCards) => {
    console.log(`Updating theme sequence with ${numberOfCards} cards`);
    const newThemeSequence = getRandomThemesArray(numberOfCards);
    console.log("New themeSequence:", newThemeSequence);
    setThemeSequence(newThemeSequence);
    setCurrentThemeIndex(0);
  };

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
    if (themeSequence.length > 0) {
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
    () => ({
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
      updateThemeSequence,
      setCurrentThemeByIndex,
      goToNextTheme,
      setGames,
      currentThemeIndex,
    }),
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
