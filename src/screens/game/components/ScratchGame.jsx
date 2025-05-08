import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Platform,
} from "react-native";

import { totalIcons, totalPositions } from "../../../global/Settings";
import themes from "../../../global/themeConfig";
import { useTheme } from "../../../hook/useTheme";
import { useGame } from "../../../context/GameContext";
import GameGrid from "./GameGrid";
import useClickSounds from "../../../hook/useClickSounds";
import AssetPack from "../../../util/AssetsPack";
import { checkWinCondition, findBoobleColor, generateIconsArray } from "../../../util/ScratchGameHelpers";

ScratchGame.propTypes = {
  scratched: PropTypes.bool,
  reset: PropTypes.func,
  nextCard: PropTypes.func,
  onLoading: PropTypes.bool,
  timerGame: PropTypes.number,
  pauseTimer: PropTypes.func,
  setWinLuckySymbolVideo: PropTypes.func,
  clickCount: PropTypes.number,
  setClickCount: PropTypes.func,
  setComboPlayed: PropTypes.func,
  maxCombinations: PropTypes.number,
  hasLuckySymbol: PropTypes.bool,
};

function ScratchGame({
  scratched,
  reset,
  nextCard,
  onLoading,
  timerGame,
  pauseTimer,
  setWinLuckySymbolVideo,
  clickCount,
  setClickCount,
  setComboPlayed,
  maxCombinations = 4,
  hasLuckySymbol = false,
}) {
  const { setScore, luckySymbolCount } = useGame();
  const { initializeClickSounds, playClickSound } = useClickSounds();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const checkResultsTimeout = useRef(null);
  const clickResetTimeout = useRef(null);
  const [iconsArray, setIconsArray] = useState([]);
  const [winningIcons, setWinningIcons] = useState([]);
  const [clickedIcons, setClickedIcons] = useState([]);
  const [clickedCount, setClickedCount] = useState({});

  const [lastClickedIcon, setLastClickedIcon] = useState(null);
  const [soundShouldPlay, setSoundShouldPlay] = useState(1);

  const [arrayBobble, setArrayBobble] = useState();
  const [arrayIcon, setArrayIcon] = useState();
  const [luckySymbolIndex, setLuckySymbolIndex] = useState();

  const [iconComponentsDefault, setIconComponentsDefault] = useState([]);

  const {
    currentTheme,
    backgroundScratchCard,
    lottiePopBlue,
    lottiePopGreen,
    lottiePopOrange,
    lottiePopPink,
  } = useTheme();

  const lottieAnimations = useMemo(() => ({
    lottieScratchieBubbleBlue: lottiePopBlue,
    lottieScratchieBubbleGreen: lottiePopGreen,
    lottieScratchieBubblePink: lottiePopPink,
    lottieScratchieBubbleOrange: lottiePopOrange,
    lottieScratchieBubblePopError: AssetPack.lotties.SCRATCHIE_BUBBLE_POP_ERROR,
    lottieScratchieBubblePopLucky: AssetPack.lotties.COIN_SLOT,
  }), [lottiePopBlue, lottiePopGreen, lottiePopPink, lottiePopOrange]);

  useEffect(() => {
    if (currentTheme !== null) {
      initializeClickSounds(currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (themes[currentTheme] && themes[currentTheme].iconsDefault) {
      const iconComponentsDefaultNew = themes[currentTheme].iconsDefault;

      const updatedIcons = iconComponentsDefaultNew.map((icon, index) =>
        React.cloneElement(icon, { lower_opacity: scratched, key: index }),
      );
      setIconComponentsDefault(updatedIcons);
    }
  }, [scratched, currentTheme]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setClickedIcons([]);
      setClickedCount({});
      setClickCount(0);
      setLastClickedIcon(null);
      setSoundShouldPlay(1);

      setArrayIcon(hasLuckySymbol);

      const generatedArray = generateIconsArray(totalIcons, totalPositions, maxCombinations, hasLuckySymbol);
      const booblePositions = findBoobleColor(generatedArray);
      setArrayBobble(booblePositions);

      if (hasLuckySymbol) {
        const nonNullAnimations = Object.entries(booblePositions)
          .filter(([key, val]) => val !== null)
          .map(([key]) => Number(key));
        const randomKey = nonNullAnimations[Math.floor(Math.random() * nonNullAnimations.length)];
        setLuckySymbolIndex(randomKey);
      }

      setIconsArray(generatedArray);
      const winners = checkWinCondition(generatedArray, totalIcons);
      setWinningIcons(winners);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [reset, maxCombinations, hasLuckySymbol]);

  const checkResults = () => {
    pauseTimer();
    clearTimeout(checkResultsTimeout.current);
    checkResultsTimeout.current = setTimeout(() => {
      if (arrayIcon) {
        if (luckySymbolCount !== 3) {
          setWinLuckySymbolVideo(true);
        }
      } else {
        nextCard();
      }
    }, 1000);
  };

  useEffect(() => {
    if (
      winningIcons.length * 3 === clickedIcons.length &&
      winningIcons.length > 0
    ) { checkResults(); }
  }, [clickedIcons, iconsArray]);

  useEffect(() => {
    if (scratched && winningIcons.length === 0) {
      checkResults();
    }
  }, [scratched]);

  const handleIconClick = useCallback((index) => {
    if (clickedIcons.includes(index)) { return; }

    const icon = iconsArray[index];
    const isMismatch = lastClickedIcon !== null && lastClickedIcon !== icon && (clickedCount[lastClickedIcon] || 0) < 3;

    if (hasLuckySymbol && luckySymbolIndex && index === luckySymbolIndex) {
      setArrayBobble(prev => {
        const updatedBobble = [...prev];
        updatedBobble[luckySymbolIndex] = "lottieScratchieBubblePopLucky";
        return updatedBobble;
      });
    } else if (isMismatch) {
      playClickSound("error");
      setClickCount(0);
      setSoundShouldPlay(1);
      setClickedIcons(prev => [...prev, index]);
      setLastClickedIcon(icon);

      setArrayBobble(prev => {
        const updatedBobble = [...prev];
        updatedBobble[index] = "lottieScratchieBubblePopError";
        return updatedBobble;
      });
      return;
    }

    setClickedIcons(prev => [...prev, index]);
    setClickCount(prev => prev + 1);
    setScore(prev => prev + timerGame * 100);

    setClickedCount(prev => ({
      ...prev,
      [icon]: (prev[icon] || 0) + 1,
    }));

    const comboSteps = { 3: 1, 6: 2, 9: 3, 12: 4 };
    if (comboSteps[clickCount + 1]) { setComboPlayed(comboSteps[clickCount + 1]); }

    const soundKey = `sound${soundShouldPlay}`;
    playClickSound(soundKey);
    setSoundShouldPlay(prev => (prev < 12 ? prev + 1 : 1));

    if (soundShouldPlay === 12) {
      clearTimeout(clickResetTimeout.current);
      clickResetTimeout.current = setTimeout(() => setClickCount(0), 1000);
    }

    setLastClickedIcon(icon);
  }, [clickedIcons, luckySymbolIndex]);

  useEffect(() => {
    let fadeAnimation;
    if (onLoading) {
      fadeAnim.setValue(0);
    } else {
      fadeAnimation = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      });
      fadeAnimation.start();
    }

    return () => {
      if (fadeAnimation) {
        fadeAnimation.stop();
      }
    };
  }, [fadeAnim, onLoading]);

  useEffect(() => {
    return () => {
      clearTimeout(checkResultsTimeout.current);
      clearTimeout(clickResetTimeout.current);
    };
  }, []);

  return (
    <GameGrid backgroundScratchCard={backgroundScratchCard}
      iconsArray={iconsArray}
      winningIcons={winningIcons}
      clickedIcons={clickedIcons}
      scratched={scratched}
      handleIconClick={handleIconClick}
      timerGame={timerGame}
      arrayBobble={arrayBobble}
      lottieAnimations={lottieAnimations}
      iconComponentsDefault={iconComponentsDefault}
      fadeAnim={fadeAnim}
    />
  );
}

export default React.memo(ScratchGame);