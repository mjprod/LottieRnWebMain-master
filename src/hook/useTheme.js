import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import themes from "../global/themeConfig";
import PropTypes from "prop-types";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";

export const ThemeEnum = Object.freeze({
  EGYPT: "egypt",
  MYTHOLOGY: "mythology",
  INTERNATIONAL: "international",
  COWBOY: "cowboy",
});

const ThemeContext = createContext();

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function ThemeProvider({ children }) {
  const [themeSequence, setThemeSequence] = useState();

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const updateThemeUsingGames = useCallback((games) => {
    const themeSequence = games.map(game => {
      switch (game.theme_id) {
        case 1: return ThemeEnum.EGYPT;
        case 2: return ThemeEnum.MYTHOLOGY;
        case 3: return ThemeEnum.INTERNATIONAL;
        case 4: return ThemeEnum.COWBOY;
        default: return ThemeEnum.COWBOY;
      }
    });
    setThemeSequence(themeSequence);
    setCurrentThemeIndex(0);
  }, []);

  const setCurrentThemeByIndex = useCallback((index) => {
    if (index >= 0 && index < themeSequence.length) {
      setCurrentThemeIndex(index);
    } else {
      showConsoleError("Invalid theme index");
    }
  }, [themeSequence]);

  const goToNextTheme = useCallback(() => {
    showConsoleMessage("Going to the next theme");
    if (currentThemeIndex < themeSequence.length - 1) {
      setCurrentThemeIndex(currentThemeIndex + 1);
      showConsoleMessage(`New theme index: ${currentThemeIndex + 1}`);
    } else {
      showConsoleMessage("You are already on the last theme");
    }
  }, [currentThemeIndex, themeSequence]);

  const currentAssets = useMemo(() => {
    if (themeSequence && themeSequence.length > 0) {
      return themes[themeSequence[currentThemeIndex]];
    }
    return {};
  }, [themeSequence, currentThemeIndex]);

  const nextAssets = useMemo(() => {
    if (themeSequence && currentThemeIndex + 1 < themeSequence.length) {
      return themes[themeSequence[currentThemeIndex + 1]];
    }
    return {};
  }, [themeSequence, currentThemeIndex]);

  // Preload assets for the next theme
  useEffect(() => {
    if (themeSequence && currentThemeIndex + 1 < themeSequence.length) {
      const nextKey = themeSequence[currentThemeIndex + 1];
      const nextAssets = themes[nextKey];
      const assetUrls = [
        nextAssets.gameCenterIcon,
        nextAssets.backgroundLoop,
        nextAssets.backgroundScratchCard,
        nextAssets.intro_chrome,
        nextAssets.intro,
        nextAssets.lottieScratchieBubblePopBlue,
        nextAssets.lottieScratchieBubblePopGreen,
        nextAssets.lottieScratchieBubblePopOrange,
        nextAssets.lottieScratchieBubblePopPink,
        nextAssets.soundMuteOnBackground,
        nextAssets.soundMuteOffBackground,
      ].filter(Boolean);
      assetUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    }
  }, [themeSequence, currentThemeIndex]);

  const contextValue = useMemo(
    () => {
      if (themeSequence) {
        return ({
          themeSequence,
          currentTheme: themeSequence[currentThemeIndex],
          nextTheme: currentThemeIndex + 1 < themeSequence.length
            ? themeSequence[currentThemeIndex + 1]
            : null,
          gameCenterIcon: currentAssets.gameCenterIcon,
          backgroundLoop: currentAssets.backgroundLoop,
          backgroundScratchCard: currentAssets.backgroundScratchCard,
          introChromeTheme: currentAssets.intro_chrome,
          introTheme: currentAssets.intro,
          introThemeNext: nextAssets.intro_default,
          introChromeThemeNext: nextAssets.intro_chrome,
          lottiePopBlue: currentAssets.lottieScratchieBubblePopBlue,
          lottiePopGreen: currentAssets.lottieScratchieBubblePopGreen,
          lottiePopOrange: currentAssets.lottieScratchieBubblePopOrange,
          lottiePopPink: currentAssets.lottieScratchieBubblePopPink,
          soundMuteOnBackground: currentAssets.soundMuteOnBackground,
          soundMuteOffBackground: currentAssets.soundMuteOffBackground,
          setCurrentThemeByIndex,
          goToNextTheme,
          updateThemeUsingGames,
          currentThemeIndex,
        });
      } else {
        return ({
          themeSequence,
          currentTheme: null,
          nextTheme: null,
          gameCenterIcon: undefined,
          backgroundLoop: undefined,
          backgroundScratchCard: undefined,
          introChromeTheme: undefined,
          introTheme: undefined,
          introThemeNext: undefined,
          introChromeThemeNext: undefined,
          lottiePopBlue: undefined,
          lottiePopGreen: undefined,
          lottiePopOrange: undefined,
          lottiePopPink: undefined,
          soundMuteOnBackground: undefined,
          soundMuteOffBackground: undefined,
          setCurrentThemeByIndex,
          goToNextTheme,
          updateThemeUsingGames,
          currentThemeIndex,
        });
      }
    },
    [
      themeSequence,
      currentThemeIndex,
      currentAssets,
      nextAssets,
      setCurrentThemeByIndex,
      goToNextTheme,
      updateThemeUsingGames,
    ],
  );
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};