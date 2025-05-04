import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Animated,
  Easing,
  Platform,
} from "react-native";

import {
  maxCountWin,
  maxOtherCount,
  totalIcons,
  totalPositions,
  columns,
  maxRepeatedIcons,
} from "../../../global/Settings";

import themes from "../../../global/themeConfig";
import { useTheme } from "../../../hook/useTheme";
import { useGame } from "../../../context/GameContext";
import GameGrid from "./GameGrid";
import useClickSounds from "../../../hook/useClickSounds";
import AssetPack from "../../../util/AssetsPack";

const isValidIcon = (
  count,
  index,
  columnIndex,
  iconWithMaxCount,
  winLuckySymbol,
  columnIconMap
) => {
  return (
    count < maxCountWin &&
    count < maxRepeatedIcons &&
    (iconWithMaxCount === null ||
      count < maxOtherCount ||
      index === iconWithMaxCount) &&
    !columnIconMap[columnIndex].has(index) &&
    (winLuckySymbol === false || index !== 12)
  );
};

const generateIconsArray = (totalIcons, totalPositions, maxCombinations, winLuckySymbol) => {
  let iconCounts = Array(totalIcons).fill(0);
  let resultArray = new Array(totalPositions).fill(null);
  let iconWithMaxCount = null;
  let columnIconMap = {};
  let combinationCount = 0;

  for (let i = 0; i < totalPositions; i++) {
    if (resultArray[i] !== null) continue;

    let columnIndex = i % columns;
    if (!columnIconMap[columnIndex]) {
      columnIconMap[columnIndex] = new Set();
    }

    let availableIcons = iconCounts
      .map((count, index) =>
        isValidIcon(
          count,
          index,
          columnIndex,
          iconWithMaxCount,
          winLuckySymbol,
          columnIconMap
        )
          ? index
          : null
      )
      .filter((index) => index !== null);

    if (availableIcons.length === 0) {
      break;
    }

    let selectedIcon;
    if (combinationCount < maxCombinations) {
      selectedIcon =
        availableIcons[Math.floor(Math.random() * availableIcons.length)];

      if (iconCounts[selectedIcon] === 2) {
        combinationCount++;
      }
    } else {
      let filteredIcons = availableIcons.filter(
        (icon) => iconCounts[icon] < 2
      );

      if (filteredIcons.length > 0) {
        selectedIcon =
          filteredIcons[Math.floor(Math.random() * filteredIcons.length)];
      } else {
        selectedIcon =
          availableIcons[Math.floor(Math.random() * availableIcons.length)];
      }
    }

    resultArray[i] = selectedIcon;
    iconCounts[selectedIcon]++;
    columnIconMap[columnIndex].add(selectedIcon);

    if (iconCounts[selectedIcon] === maxCountWin) {
      iconWithMaxCount = selectedIcon;
    }
  }

  return resultArray;
};

const findBoobleColor = (arr) => {
  const colors = [
    { color: "Blue", animation: "lottieScratchieBubbleBlue" },
    { color: "Green", animation: "lottieScratchieBubbleGreen" },
    { color: "Pink", animation: "lottieScratchieBubblePink" },
    { color: "Orange", animation: "lottieScratchieBubbleOrange" },
  ];

  let counter = {};
  let colorMap = {};
  let animationMap = {};
  let colorIndex = 0;

  arr.forEach((num) => {
    if (counter[num]) {
      counter[num]++;
    } else {
      counter[num] = 1;
    }
  });

  Object.keys(counter).filter((num) => {
    if (counter[num] === 3) {
      colorMap[num] = colors[colorIndex].color;
      animationMap[num] = colors[colorIndex].animation;
      colorIndex = (colorIndex + 1) % colors.length;
    }
  });

  const animationArray = arr.map((num) => {
    return animationMap[num] || null;
  });

  return animationArray;
};

const checkWinCondition = (array, totalIcons) => {
  const iconCounts = Array(totalIcons).fill(0);
  array.forEach((icon) => {
    if (icon !== null) {
      iconCounts[icon]++;
    }
  });

  const winners = [];
  iconCounts.forEach((count, index) => {
    if (count === maxCountWin) {
      winners.push(index);
    }
  });
  return winners;
};

const ScratchGame = ({
  scratched,
  reset,
  nextCard,
  onLoading,
  setIsLuckySymbolTrue,
  timerGame,
  pauseTimer,
  setWinLuckySymbolVideo,
  clickCount,
  setClickCount,
  setComboPlayed,
  maxCombinations = 4,
  hasLuckySymbol = false
}) => {
  const { setScore, luckySymbolCount } = useGame();
  const { initializeClickSounds, playClickSound } = useClickSounds();

  const fadeAnim = useRef(new Animated.Value(0)).current;
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

  const lottieAnimations = {
    lottieScratchieBubbleBlue: lottiePopBlue,
    lottieScratchieBubbleGreen: lottiePopGreen,
    lottieScratchieBubblePink: lottiePopPink,
    lottieScratchieBubbleOrange: lottiePopOrange,
    lottieScratchieBubblePopError: AssetPack.lotties.SCRATCHIE_BUBBLE_POP_ERROR,
    lottieScratchieBubblePopLucky: AssetPack.lotties.COIN_SLOT,
  };

  useEffect(() => {
    if (currentTheme !== null) {
      initializeClickSounds(currentTheme);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (themes[currentTheme] && themes[currentTheme].iconsDefault) {
      const iconComponentsDefaultNew = themes[currentTheme].iconsDefault;

      const updatedIcons = iconComponentsDefaultNew.map((icon, index) =>
        React.cloneElement(icon, { lower_opacity: scratched, key: index })
      );
      setIconComponentsDefault(updatedIcons);
    }
  }, [scratched, currentTheme]);

  useEffect(() => {
    setClickedIcons([]);
    setClickedCount({});
    setClickCount(0);
    setLastClickedIcon(null);
    setSoundShouldPlay(1);

    setArrayIcon(hasLuckySymbol);
    setIsLuckySymbolTrue(hasLuckySymbol);

    const generatedArray = generateIconsArray(totalIcons, totalPositions, maxCombinations, hasLuckySymbol);
    const booblePositions = findBoobleColor(generatedArray);
    setArrayBobble(booblePositions);

    if (hasLuckySymbol) {
      const nonNullAnimations = Object.entries(booblePositions)
        .filter(([_, val]) => val !== null)
        .map(([key]) => Number(key));
      const randomKey = nonNullAnimations[Math.floor(Math.random() * nonNullAnimations.length)];
      setLuckySymbolIndex(randomKey)
    }

    setIconsArray(generatedArray);
    const winners = checkWinCondition(generatedArray, totalIcons);
    setWinningIcons(winners);
  }, [reset, setIsLuckySymbolTrue, maxCombinations, hasLuckySymbol]);

  const checkResults = () => {
    pauseTimer()
    setTimeout(() => {
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
    ) checkResults();
  }, [clickedIcons, iconsArray]);

  useEffect(() => {
    if (scratched && winningIcons.length === 0) {
      checkResults();
    }
  }, [scratched]);

  const handleIconClick = useCallback((index) => {
    if (clickedIcons.includes(index)) return;

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
    if (comboSteps[clickCount + 1]) setComboPlayed(comboSteps[clickCount + 1]);

    const soundKey = `sound${soundShouldPlay}`;
    playClickSound(soundKey);
    setSoundShouldPlay(prev => (prev < 12 ? prev + 1 : 1));

    if (soundShouldPlay === 12) {
      setTimeout(() => setClickCount(0), 1000);
    }

    setLastClickedIcon(icon);
  }, [clickedIcons, luckySymbolIndex]);

  useEffect(() => {
    if (onLoading) {
      fadeAnim.setValue(0);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }).start();
    }
  }, [fadeAnim, onLoading]);

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
};

export default React.memo(ScratchGame);
