import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from "react-native";

import {
  generateRandomLuckySymbolPercentage,
  finishPopUpToVideoTimer,
  maxCountWin,
  maxOtherCount,
  totalIcons,
  totalPositions,
  columns,
  maxRepeatedIcons,
} from "../global/Settings";
import themes from "../global/themeConfig";
import { useTheme } from "../hook/useTheme";
import { useSound } from "../hook/useSoundPlayer";
import { useGame } from "../context/GameContext";
import GameGrid from "./GameGrid";
import useClickSounds from "../hook/useClickSounds";

const ScratchGame = ({
  //score,
  //setScore,
  setIsWinner,
  scratched,
  reset,
  nextCard,
  onLoading,
  setIsLuckySymbolTrue,
  timerGame,
  setWinLuckySymbolVideo,
  clickCount,
  setClickCount,
  setLuckySymbolWon,
  setTotalComboCount,
  setComboPlayed
}) => {
  const { score, setScore, luckySymbolCount } = useGame();
  const {initializeClickSounds, playClickSound} = useClickSounds();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [iconsArray, setIconsArray] = useState([]);
  const [winningIcons, setWinningIcons] = useState([]);
  const [clickedIcons, setClickedIcons] = useState([]);
  const [clickedCount, setClickedCount] = useState({});

  const [lastClickedIcon, setLastClickedIcon] = useState(null);
  const [soundShouldPlay, setSoundShouldPlay] = useState(1);

  const [arrayBobble, setArrayBobble] = useState();
  const [arrayIcon, setArrayIcon] = useState();

  const [iconComponentsDefault, setIconComponentsDefault] = useState([]);

  const { isSoundEnabled } = useSound();

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
    lottieScratchieBubblePopError: require("./../assets/lotties/lottieScratchieBubblePopError.json"),
  };

  useEffect(() => {
    initializeClickSounds(currentTheme);
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

  const generateRandomLuckySymbol = () => {
    const result = Math.random() < generateRandomLuckySymbolPercentage;
    return result;
  };

  useEffect(() => {
    setTimeout(() => {
      setClickedIcons([]);
      setClickedCount({});
      setClickCount(0);
      setLastClickedIcon(null);
      setSoundShouldPlay(1);

      // Generate lucky symbol once and use it
      const icons = generateRandomLuckySymbol();

      setArrayIcon(icons); // Set the arrayIcon with the result of generateRandomLuckySymbol
      setIsLuckySymbolTrue(icons); // Set if the lucky symbol is true

      const generatedArray = generateIconsArray(icons); // Generate icons array based on the result of generateRandomLuckySymbol
      const booblePositions = findBoobleColor(generatedArray); // Find the bubble colors for the array
      setArrayBobble(booblePositions); // Set the bubble positions

      setIconsArray(generatedArray); // Set the icons array
      const winners = checkWinCondition(generatedArray); // Check for win condition
      setWinningIcons(winners); // Set the winning icons
      setIsWinner(winners.length > 0); // Determine if it's a winner

      setLuckySymbolWon(!!icons)
      if (winners.length > 0) {
        setTotalComboCount(winners.length - 1)
      } else {
        setTotalComboCount(0)
      }
    }, 400);

  }, [setIsWinner, reset, setIsLuckySymbolTrue]);

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
      (winLuckySymbol === false || index !== 12) // Lucky symbol can't be repeated
    );
  };

  const generateIconsArray = (winLuckySymbol) => {
    let iconCounts = Array(totalIcons).fill(0);
    let resultArray = new Array(totalPositions).fill(null);
    let iconWithMaxCount = null;
    let columnIconMap = {};
    let maxCombinations = 4;
    let combinationCount = 0;

    let luckyPosition = -1;

    if (winLuckySymbol) {
      luckyPosition = Math.floor(Math.random() * totalPositions);
      resultArray[luckyPosition] = 12;
      iconCounts[12] = 1;
    }

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
    const cores = [
      { cor: "Blue", animacao: "lottieScratchieBubbleBlue" },
      { cor: "Green", animacao: "lottieScratchieBubbleGreen" },
      { cor: "Pink", animacao: "lottieScratchieBubblePink" },
      { cor: "Orange", animacao: "lottieScratchieBubbleOrange" },
    ];

    let contador = {};
    let corMap = {};
    let animacaoMap = {};
    let corIndex = 0;

    arr.forEach((num) => {
      if (contador[num]) {
        contador[num]++;
      } else {
        contador[num] = 1;
      }
    });

    Object.keys(contador).forEach((num) => {
      if (contador[num] === 3) {
        corMap[num] = cores[corIndex].cor;
        animacaoMap[num] = cores[corIndex].animacao;
        corIndex = (corIndex + 1) % cores.length;
      }
    });

    const arrayAnimacoes = arr.map((num) => {
      return animacaoMap[num] || null;
    });

    return arrayAnimacoes;
  };

  const checkWinCondition = (array) => {
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

  const checkResults = () => {
    setTimeout(() => {
      if (arrayIcon) {
        console.log(arrayIcon);
        console.log(luckySymbolCount);
        if (luckySymbolCount !== 3) {
          setWinLuckySymbolVideo(true);
        }
      } else {
        console.log("NO LUCKY SYMBOL");
        nextCard();
      }
    }, 500);
  };

  useEffect(() => {
    if (
      winningIcons.length * 3 === clickedIcons.length &&
      winningIcons.length > 0
    ) {
      console.log("ALL ICONS CLIKED");
      setTimeout(() => {
        checkResults();
      }, 100);
    }
  }, [clickedIcons, iconsArray]);

  useEffect(() => {
    if (scratched && winningIcons.length === 0) {
      checkResults();
    }
  }, [scratched]);

  useEffect(() => { }, [clickedCount]);

  const handleIconClick = useCallback((index) => {
    if (clickedIcons.includes(index)) return;

    const icon = iconsArray[index];
    const isMismatch = lastClickedIcon !== null && lastClickedIcon !== icon && (clickedCount[lastClickedIcon] || 0) < 3;

    if (isMismatch) {
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

    const comboSteps = { 6: 1, 9: 2, 12: 3 };
    if (comboSteps[clickCount + 1]) setComboPlayed(comboSteps[clickCount + 1]);

    const soundKey = `sound${soundShouldPlay}`;
    playClickSound(soundKey);
    setSoundShouldPlay(prev => (prev < 12 ? prev + 1 : 1));

    if (soundShouldPlay === 12) {
      setTimeout(() => setClickCount(0), 1000);
    }

    if ((clickedCount[icon] || 0) + 1 === 3) {
      setTimeout(() => { }, finishPopUpToVideoTimer);
    }

    setLastClickedIcon(icon);
  }, [clickedIcons]);

  const updateSounds = () => {
    setSoundShouldPlay(soundShouldPlay + 1);
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    flexBasis: "18%",
    minWidth: "18%",
    aspectRatio: 1,
    marginTop: "1.2%",
    marginLeft: "2%",
    marginRight: "2%",
    boxSizing: "border-box",
  },
  iconWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: "100%",
    height: "100%",
  }
});

export default ScratchGame;
