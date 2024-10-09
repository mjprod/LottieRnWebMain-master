import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Easing,
  Platform,
} from "react-native";
import AnimatedIcon from "./AnimatedIcon";
import LottieView from "react-native-web-lottie";

import { Howl } from "howler";

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


const ScratchGame = ({
  score,
  setScore,
  setIsWinner,
  scratched,
  reset,
  nextCard,
  onLoading,
  setIsLuckySymbolTrue,
  timerGame,
  setWinLuckySymbolVideo,
  luckySymbolCount,
  clickCount,
  setClickCount,
  
}) => {
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
  const { currentTheme , backgroundScratchCard } = useTheme();

  const { lottiePopBlue } = useTheme();

  const lottieAnimations = {
    lottieScratchieBubbleBlue: lottiePopBlue ,
    lottieScratchieBubbleGreen: require("./../assets/lotties/lottieScratchieBubblePopGreen.json"),
    lottieScratchieBubblePink: require("./../assets/lotties/lottieScratchieBubblePopPink.json"),
    lottieScratchieBubbleOrange: require("./../assets/lotties/lottieScratchieBubblePopOrange.json"),
    lottieScratchieBubblePopError: require("./../assets/lotties/lottieScratchieBubblePopError.json"),
  };



  const soundRefs = useRef({
    sound1: new Howl({ src: [require("./../assets/audio/1_C.mp3")], preload: true }),
    sound2: new Howl({ src: [require("./../assets/audio/2_D.mp3")], preload: true }),
    sound3: new Howl({ src: [require("./../assets/audio/3_E.mp3")], preload: true }),
    sound4: new Howl({ src: [require("./../assets/audio/4_E.mp3")], preload: true }),
    sound5: new Howl({ src: [require("./../assets/audio/5_F_.mp3")], preload: true }),
    sound6: new Howl({ src: [require("./../assets/audio/6_G_.mp3")], preload: true }),
    sound7: new Howl({ src: [require("./../assets/audio/7_G_.mp3")], preload: true }),
    sound8: new Howl({ src: [require("./../assets/audio/8_A_.mp3")], preload: true }),
    sound9: new Howl({ src: [require("./../assets/audio/9_C_plus.mp3")], preload: true }),
    sound10: new Howl({ src: [require("./../assets/audio/10_C_plus.mp3")], preload: true }),
    sound11: new Howl({ src: [require("./../assets/audio/11_D_plus.mp3")], preload: true }),
    sound12: new Howl({ src: [require("./../assets/audio/12_E_plus.mp3")], preload: true }),
    error: new Howl({ src: [require("./../assets/audio/sfx_autopopup.wav")], preload: true }),
  });

  useEffect(() => {
    // Clean up sounds when component unmounts
    return () => {
      Object.values(soundRefs.current).forEach((sound) => {
        sound.stop();
        sound.unload();
      });
    };
  }, []);

  const playSound = (soundKey) => {
    if (soundRefs.current[soundKey]) {
      soundRefs.current[soundKey].play();
    }
  };


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
    //console.log("Generated result:", result); 
    return result;
  };

  useEffect(() => {
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
  }, [setIsWinner, reset, setIsLuckySymbolTrue]);

  const isValidIcon = (count, index, columnIndex, iconWithMaxCount, winLuckySymbol,columnIconMap) => {
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
  /*
  const generateIconsArray = (winLuckySymbol) => {
    let iconCounts = Array(totalIcons).fill(0);
    let resultArray = new Array(totalPositions).fill(null);
    let iconWithMaxCount = null;
    let columnIconMap = {};

  
    let luckyPosition = -1;
    // Add lucky symbol
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
      .map((count, index) => (isValidIcon(count, index, columnIndex, iconWithMaxCount, winLuckySymbol,columnIconMap) ? index : null))
      .filter((index) => index !== null);
  
      if (availableIcons.length === 0) {
        break;
      }
  
      let selectedIcon =
        availableIcons[Math.floor(Math.random() * availableIcons.length)];
  
      resultArray[i] = selectedIcon;
      iconCounts[selectedIcon]++;
      columnIconMap[columnIndex].add(selectedIcon);
  
      if (iconCounts[selectedIcon] === maxCountWin) {
        iconWithMaxCount = selectedIcon;
      }
    }
  
    return resultArray;
  };
  */
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
          isValidIcon(count, index, columnIndex, iconWithMaxCount, winLuckySymbol, columnIconMap) ? index : null
        )
        .filter((index) => index !== null);
  
      if (availableIcons.length === 0) {
        break;
      }
  
      let selectedIcon;
  
      if (combinationCount < maxCombinations) {
        selectedIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)];
  
        if (iconCounts[selectedIcon] === 2) {
          combinationCount++;
        }
      } else {
        let filteredIcons = availableIcons.filter(icon => iconCounts[icon] < 2);
  
        if (filteredIcons.length > 0) {
          selectedIcon = filteredIcons[Math.floor(Math.random() * filteredIcons.length)];
        } else {
          selectedIcon = availableIcons[Math.floor(Math.random() * availableIcons.length)];
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
    { cor: 'Blue', animacao: 'lottieScratchieBubbleBlue' },
    { cor: 'Green', animacao: 'lottieScratchieBubbleGreen' },
    { cor: 'Pink', animacao: 'lottieScratchieBubblePink' },
    { cor: 'Orange', animacao: 'lottieScratchieBubbleOrange' },
  ];
  
  let contador = {};
  let corMap = {}; 
  let animacaoMap = {};
  let corIndex = 0;

  arr.forEach(num => {
    if (contador[num]) {
      contador[num]++;
    } else {
      contador[num] = 1;
    }
  });

  Object.keys(contador).forEach(num => {
    if (contador[num] === 3) {
      corMap[num] = cores[corIndex].cor;           
      animacaoMap[num] = cores[corIndex].animacao;
      corIndex = (corIndex + 1) % cores.length;
    }
  });

  const arrayAnimacoes = arr.map(num => {
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
        if(luckySymbolCount!==3){
          setWinLuckySymbolVideo(true);
        }
      }
      else {
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
    if (
      scratched && winningIcons.length === 0
    ) {
      checkResults();
    }
  }, [scratched]);

  useEffect(() => {
   
  }, [clickedCount]);

  const handleIconClick = (index) => {
    const icon = iconsArray[index];

    if (!clickedIcons.includes(index)) {
      if (
        lastClickedIcon !== null &&
        lastClickedIcon !== icon &&
        clickedCount[lastClickedIcon] < 3
      ) {
        playSound("error");
        setClickCount(0);
        setSoundShouldPlay(1);

        setClickedIcons([...clickedIcons, index]);
        setLastClickedIcon(icon);
        
        //Add bobble error
        const newArrayBobble = [...arrayBobble];
        newArrayBobble[index] = "lottieScratchieBubblePopError";
        setArrayBobble(newArrayBobble);

        return;
      }

      const newClickedIcons = [...clickedIcons, index];
      setClickedIcons(newClickedIcons);
      setClickCount(clickCount + 1);

      setScore(score + timerGame * 100);

      const newClickedCount = {
        ...clickedCount,
        [icon]: (clickedCount[icon] || 0) + 1,
      };
      setClickedCount(newClickedCount);

      switch (soundShouldPlay) {
        case 1:
          playSound("sound1");
          updateSounds();
          break;
        case 2:
          playSound("sound2");
          updateSounds();
          break;
        case 3:
          playSound("sound3");
          updateSounds();
          break;
        case 4:
          playSound("sound4");
          updateSounds();
          break;
        case 5:
          playSound("sound5");
          updateSounds();
          break;
        case 6:
          playSound("sound6");
          updateSounds();
          break;
        case 7:
          playSound("sound7");
          updateSounds();
          break;
        case 8:
          playSound("sound8");
          updateSounds();
          break;
        case 9:
          playSound("sound9");
          updateSounds();
          break;
        case 10:
          playSound("sound10");
          updateSounds();
          break;
        case 11:
          playSound("sound11");
          updateSounds();
          break;
        case 12:
          playSound("sound12");
          updateSounds();
          setTimeout (() => {
            setClickCount(0);
          }
          , 1000);
          setSoundShouldPlay(1);
          break;
        default:
          break;
      }

      if (newClickedCount[icon] === 3) {
        setTimeout(() => {}, finishPopUpToVideoTimer);
      }

      setLastClickedIcon(icon);
    }
  };

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
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
  }, [fadeAnim, onLoading]);

  return (
    <ImageBackground source={backgroundScratchCard} style={[styles.background_view]}>
      <View style={styles.container}>
        <Animated.View style={[styles.gridContainer, { opacity: fadeAnim }]}>
          {iconsArray.map((icon, index) => (
            <View key={index} style={styles.iconContainer}>
              {icon !== null && (
                <View style={styles.iconWrapper}>
                  {winningIcons.includes(icon) &&
                  !clickedIcons.includes(index) &&
                  scratched ? (
                    <AnimatedIcon
                      iconIndex={icon}
                      onClick={() => handleIconClick(index)}
                      timerGame={timerGame}
                      bobble={arrayBobble[index]}
                    />
                  ) : clickedIcons.includes(index) ? (
                    <View style={[styles.lottieContainer]}>
                      <LottieView
                        style={styles.lottieAnimation}
                        source={lottieAnimations[arrayBobble[index]]}
                        autoPlay
                        loop={false}
                        resizeMode="cover"
                      />
                    </View>
                  ) : (
                    iconComponentsDefault[icon]
                  )}
                </View>
              )}
            </View>
          ))}
        </Animated.View>
      </View>
    </ImageBackground>
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
  },
  background_view: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: "cover",
  },
});

export default ScratchGame;
