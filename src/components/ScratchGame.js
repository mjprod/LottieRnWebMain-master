import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import AnimatedIcon from './AnimatedIcon';
import LottieView from "react-native-web-lottie";

import {IconTypeAnhkdefault} from './../assets/icons/IconTypeAnhkdefault';
import {IconTypeAnubisdefault} from './../assets/icons/IconTypeAnubisdefault';
import {IconTypeFeatherdefault} from './../assets/icons/IconTypeFeatherdefault';
import {IconTypeHorusdefault} from './../assets/icons/IconTypeHorusdefault';
import {IconTypePyramiddefault} from './../assets/icons/IconTypePyramiddefault';
import {IconTypeScarabdefault} from './../assets/icons/IconTypeScarabdefault';
import {IconTypeSphinxdefault} from './../assets/icons/IconTypeSphinxdefault';
import {IconTypeTabletdefault} from './../assets/icons/IconTypeTabletdefault';
import {IconTypeSunRadefault} from './../assets/icons/IconTypeSunRadefault';
import {IconTypeEyePyramiddefault} from '../assets/icons/IconTypeEyePyramiddefault';
import {IconTypePharoahdefault} from '../assets/icons/IconTypePharoahdefault';
import {IconTypeSleighdefault} from '../assets/icons/IconTypeSleighdefault';
import {IconTypeLucky} from './../assets/icons/IconTypeLucky';

import { Howl } from 'howler';

import {
  generateRandomLuckySymbolPercentage,
  finishPopUpToVideoTimer,
  maxCountWin,
  maxOtherCount,
  totalIcons,
  totalPositions,
  columns,
  maxRepeatedIcons,
} from '../global/Settings';
import { triggerVibration } from '../global/Vibration';

const iconComponentsDefault = [
  <IconTypeAnubisdefault key="0" />,
  <IconTypeAnhkdefault key="1" />,
  <IconTypeFeatherdefault key="2" />,
  <IconTypeHorusdefault key="3" />,
  <IconTypePyramiddefault key="4" />,
  <IconTypeScarabdefault key="5" />,
  <IconTypeSphinxdefault key="6" />,
  <IconTypeTabletdefault key="7" />,
  <IconTypeSunRadefault key="8" />,
  <IconTypeEyePyramiddefault key="9" />,
  <IconTypePharoahdefault key="10" />,
  <IconTypeSleighdefault key="11" />,
  <IconTypeLucky key="12" />,
];

const scratchBackground = require('./../assets/image/scratch_background.png');
const lottieScratchieBubblePopUp = require('./../assets/lotties/green_ball.json');

const ScratchGame = ({
  score,
  setScore,
  setIsWinner,
  scratched,
  reset,
  setReset={setReset},
  onLoading,
  setIsLuckySymbolTrue,
  timerGame,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [iconsArray, setIconsArray] = useState([]);
  const [winningIcons, setWinningIcons] = useState([]);
  const [clickedIcons, setClickedIcons] = useState([]);
  const [clickedCount, setClickedCount] = useState({});
  const [lastClickedIcon, setLastClickedIcon] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [soundShouldPlay, setSoundShouldPlay] = useState(1);


  const generateRandomLuckySymbol = () => {
    return Math.random() < generateRandomLuckySymbolPercentage;
  };

  useEffect(() => {
    setClickedIcons([]);
    setClickedCount({});
    setClickCount(0);
    setLastClickedIcon(null);
    setSoundShouldPlay(1);

    let generated = generateRandomLuckySymbol();
    setIsLuckySymbolTrue(generated);
    const generatedArray = generateIconsArray(generated);
    setIconsArray(generatedArray);
    const winners = checkWinCondition(generatedArray);
    setWinningIcons(winners);
    setIsWinner(winners.length > 0);
  }, [setIsWinner, reset, setIsLuckySymbolTrue]);

  const generateIconsArray = (winLuckySymbol) => {
    let iconCounts = Array(totalIcons).fill(0);
    let resultArray = new Array(totalPositions).fill(null);
    let iconWithMaxCount = null;
    let columnIconMap = {};

    if (winLuckySymbol) {
      const luckyPosition = Math.floor(Math.random() * totalPositions);
      resultArray[luckyPosition] = 11;
      iconCounts[11] = 1;
    }

    for (let i = 0; i < totalPositions; i++) {
      if (resultArray[i] !== null) continue;

      let columnIndex = i % columns;
      if (!columnIconMap[columnIndex]) {
        columnIconMap[columnIndex] = new Set();
      }

      let availableIcons = iconCounts
        .map((count, index) => {
          if (
            count < maxCountWin &&
            count < maxRepeatedIcons &&
            (iconWithMaxCount === null ||
              count < maxOtherCount ||
              index === iconWithMaxCount) &&
            !columnIconMap[columnIndex].has(index) &&
            (winLuckySymbol === false || index !== 8)
          ) {
            return index;
          }
          return null;
        })
        .filter(index => index !== null);

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


  useEffect(() => {
    if (
      winningIcons.length  * 3 === clickedIcons.length &&  winningIcons.length >0
    ) {
      console.log('ALL ICONS CLIKED');
      setReset(true);
    }

    
  }, [clickedIcons, iconsArray]);

  const handleIconClick = (index) => {
    const icon = iconsArray[index];

    if (!clickedIcons.includes(index)) {
      if (lastClickedIcon !== null && lastClickedIcon !== icon && clickedCount[lastClickedIcon] < 3) {
        playSoundError();
        setClickCount(1);
        setSoundShouldPlay(1);

        setClickedIcons([...clickedIcons, index]);
        setLastClickedIcon(icon);
        return;
      }

      const newClickedIcons = [...clickedIcons, index];
      setClickedIcons(newClickedIcons);
      setScore(score + (timerGame*100));
      console.log('SCORE: ', score + (timerGame*100));
      const newClickedCount = {
        ...clickedCount,
        [icon]: (clickedCount[icon] || 0) + 1,
      };
      setClickedCount(newClickedCount);

      switch (soundShouldPlay) {
        case 1:
          playSound1();
          updateSounds();
          //triggerVibration('light');
          break;
        case 2:
          playSound2();
          updateSounds();
          //triggerVibration('medium');
          break;
        case 3:
          playSound3();
          updateSounds();
          //triggerVibration('strong');
          break;
          case 4:
            playSound4();
            updateSounds();
            break;
          case 5:
            playSound5();
            updateSounds();
            break;
          case 6:
            playSound6();
            updateSounds();     
            break;
          case 7:
            playSound7();
            updateSounds();
            break;
          case 8:
            playSound8();
            updateSounds();
            break;
          case 9:
            playSound9();
            updateSounds();
            break;
          case 10:
            playSound10();
            updateSounds();
            break;
          case 11:
            playSound11();
            updateSounds();
            break;
          case 12:
            playSound12();
            updateSounds();
            setClickCount(0);
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
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, onLoading]);

  const sound1 = new Howl({
    src: [require('./../assets/audio/1_C.mp3')],
    preload: true,  // Preload the sound
  });
  const sound2 = new Howl({
    src: [require('./../assets/audio/2_D.mp3')],
    preload: true,  // Preload the sound
  });
  const sound3 = new Howl({
    src: [require('./../assets/audio/3_E.mp3')],
    preload: true,  // Preload the sound
  });

  const sound4 = new Howl({
    src: [require('./../assets/audio/4_E.mp3')],
    preload: true,  // Preload the sound
  });
  const sound5 = new Howl({
    src: [require('./../assets/audio/5_F_.mp3')],
    preload: true,  // Preload the sound
  });
  const sound6 = new Howl({
    src: [require('./../assets/audio/6_G_.mp3')],
    preload: true,  // Preload the sound
  });
  const sound7 = new Howl({
    src: [require('./../assets/audio/7_G_.mp3')],
    preload: true,  // Preload the sound
  });
  const sound8 = new Howl({
    src: [require('./../assets/audio/8_A_.mp3')],
    preload: true,  // Preload the sound
  });
  const sound9 = new Howl({
    src: [require('./../assets/audio/9_C_plus.mp3')],
    preload: true,  // Preload the sound
  });

  const sound10 = new Howl({
    src: [require('./../assets/audio/10_C_plus.mp3')],
    preload: true,  // Preload the sound
  });
  const sound11 = new Howl({
    src: [require('./../assets/audio/11_D_plus.mp3')],
    preload: true,  // Preload the sound
  });
  const sound12 = new Howl({
    src: [require('./../assets/audio/12_E_plus.mp3')],
    preload: true,  // Preload the sound
  });
  const error = new Howl({
    src: [require('./../assets/audio/sfx_autopopup.wav')],
    preload: true,  // Preload the sound

  });

  const playSound1 = () => {
    sound1.play();
  };
  const playSound2 = () => {
    sound2.play();
  };
  const playSound3 = () => {
    sound3.play();
  };
  const playSound4 = () => {
    sound4.play();
  };
  const playSound5 = () => {
    sound5.play();
  };
  const playSound6 = () => {
    sound6.play();
  };
  const playSound7 = () => {
    sound7.play();
  };
  const playSound8 = () => {
    sound8.play();
  };
  const playSound9 = () => {
    sound9.play();
  };
  const playSound10 = () => {
    sound10.play();
  };
  const playSound11 = () => {
    sound11.play();
  };
  const playSound12 = () => {
    sound12.play();
  };

  const playSoundError = () => {
    error.play();
  };

  return (
    <ImageBackground source={scratchBackground} style={styles.background_view}>
      <View style={styles.container}>
        <Animated.View style={[styles.gridContainer, {opacity: fadeAnim}]}>
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
                    />
                  ) : clickedIcons.includes(index) ? (
                    <View
                      style={[
                        styles.lottieContainer,
                        {top: '0%'},
                      ]}>
                      <LottieView
                        style={styles.lottieAnimation}
                        source={lottieScratchieBubblePopUp}
                        autoPlay
                        loop={true}
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
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    flexBasis: '23%',
    minWidth: '20%',
    aspectRatio: 1,
    margin: '1%',
    boxSizing: 'border-box',
  },
  iconWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  background_view: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ScratchGame;
