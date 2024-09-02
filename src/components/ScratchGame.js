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
import {IconTypeLucky} from './../assets/icons/IconTypeLucky';

//import {triggerVibration} from '../global/Vibration';
import settings, {
  generateRandomLuckySymbolPercentage,
  finishPopUpToVideoTimer,
} from '../global/Settings';
import { playSound, preloadAudio, preloadSounds } from '../global/Player';
//import Sound from 'react-native-sound';

const iconComponentsDefault = [
  <IconTypeAnubisdefault key="0" />,
  <IconTypeAnhkdefault key="1" />,
  <IconTypeFeatherdefault key="2" />,
  <IconTypeHorusdefault key="3" />,
  <IconTypePyramiddefault key="4" />,
  <IconTypeScarabdefault key="5" />,
  <IconTypeSphinxdefault key="6" />,
  <IconTypeTabletdefault key="7" />,
  <IconTypeLucky key="8" />,
];

const scratchBackground = require('./../assets/image/scratch_background.png');
const lottieScratchieBubblePopUp = require('./../assets/lotties/lottieScratchieBubblePopUp.json');

/*type ScratchGameProps = {
  onAutoPop: boolean;
  setIsWinner: (value: boolean) => void;
  onEndGame: () => void;
  scratched: boolean;
  reset: boolean;
  onLoading: boolean;
  isLuckySymbolTrue: boolean;
  setIsLuckySymbolTrue: (value: boolean) => void;
};*/

const ScratchGame = ({
  onAutoPop,
  setIsWinner,
  //onEndGame,
  scratched,
  reset,
  onLoading,
  setIsLuckySymbolTrue,
}) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [iconsArray, setIconsArray] = useState([]);
  const [winningIcon, setWinningIcon] = useState(null);
  const [clickedIcons, setClickedIcons] = useState([]);
  const [clickedCount, setClickedCount] = useState({});
 
  const generateRandomLuckySymbol = () => {
    return Math.random() < generateRandomLuckySymbolPercentage;
  };

  useEffect(() => {
    setClickedIcons([]);
    setClickedCount({});

    let generated = generateRandomLuckySymbol();
    console.log('generated', generated);
    setIsLuckySymbolTrue(generated);
    const generatedArray = generateIconsArray(generated);
    console.log('generatedArray', generatedArray);
    setIconsArray(generatedArray);
    const winner = checkWinCondition(generatedArray);
    console.log('winner', winner);
    setWinningIcon(winner);
    setIsWinner(winner !== null);
  }, [setIsWinner, reset, setIsLuckySymbolTrue]);

  const generateIconsArray = (winLuckySymbol) => {
    const maxCount = 3;
    const maxOtherCount = 2;
    const totalIcons = 8;
    const totalPositions = 12;
    const columns = 4;
  
    let iconCounts = Array(totalIcons).fill(0);
    let resultArray = new Array(totalPositions).fill(null);
    let iconWithMaxCount = null;
    let columnIconMap = {}; // Remove the type annotation here
  
    if (winLuckySymbol) {
      const luckyPosition = Math.floor(Math.random() * totalPositions);
      resultArray[luckyPosition] = 8;
      iconCounts[8] = 1;
    }
  
    for (let i = 0; i < totalPositions; i++) {
      if (resultArray[i] !== null) {
        continue;
      } // Skip already filled position
  
      let columnIndex = i % columns;
      if (!columnIconMap[columnIndex]) {
        columnIconMap[columnIndex] = new Set();
      }
  
      let availableIcons = iconCounts
        .map((count, index) => {
          if (
            count < maxCount &&
            (iconWithMaxCount === null ||
              count < maxOtherCount ||
              index === iconWithMaxCount) &&
            !columnIconMap[columnIndex].has(index) &&
            (winLuckySymbol === false || index !== 8) // Ensure no duplicate lucky symbol
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
  
      if (iconCounts[selectedIcon] === maxCount) {
        iconWithMaxCount = selectedIcon;
      }
    }
  
    return resultArray;
  };
  
  const checkWinCondition = (array) => {
    const maxCount = 3;
    const totalIcons = 8;
    const iconCounts = Array(totalIcons).fill(0); // Removed type annotation
  
    array.forEach((icon) => { // Removed type annotations
      if (icon !== null) {
        iconCounts[icon]++;
      }
    });
  
    const winningIcon = iconCounts.findIndex(count => count === maxCount);
  console.log('winningIcon', winningIcon);
    return winningIcon !== -1 ? winningIcon : null;
  };
  

  const handleIconClick = (index) => {
    console.log('handleIconClick', index);
    if (!clickedIcons.includes(index)) {
      const newClickedIcons = [...clickedIcons, index];

      setClickedIcons(newClickedIcons);

      const icon = iconsArray[index];
      const newClickedCount = {
        ...clickedCount,
        [icon]: (clickedCount[icon] || 0) + 1,
      };
      console.log('newClickedCount', newClickedCount);
      setClickedCount(newClickedCount);

      switch (newClickedIcons.length) {
        case 1:
          playSound(require('./../assets/audio/sfx_pop01.mp3'));
          break;
        case 2:
          playSound(require('./../assets/audio/sfx_pop02.mp3'));
          break;
        case 3:
          playSound(require('./../assets/audio/sfx_pop03.mp3'));
          break;
        default:
          console.log('default');
          break;
      }

      if (newClickedCount[icon] === 3) {
        setTimeout(() => {
          //onEndGame();
        }, finishPopUpToVideoTimer);
      }
    }
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
 /*
  //let whoosh: Sound | null = null;
  //Sound.setCategory('Playback');

  /*const playSoundAnimation = (fileName: string): void => {
    if (!settings.soundOn) {
      return;
    }
    whoosh = new Sound(fileName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);

        return;
      }

      whoosh?.play(success => {
        if (success) {
          //console.log('Successfully finished playing');
        } else {
          //console.log('Playback failed due to audio decoding errors');
        }
        whoosh?.release();
        whoosh = null;
      });
    });

    if (whoosh) {
      whoosh.setVolume(1);
      whoosh.setNumberOfLoops(-1);
      whoosh.setCurrentTime(0);
      whoosh.getCurrentTime(seconds => console.log('At ' + seconds));
    }
  };
*/
  useEffect(() => {
    const autoPop = () => {
      const newClickedIcons = [...clickedIcons];
      iconsArray.forEach((icon, index) => {
        if (icon === winningIcon && !newClickedIcons.includes(index)) {
          newClickedIcons.push(index);
        }
      });
      setClickedIcons(newClickedIcons);
    };

    if (onAutoPop) {
      autoPop();
    }
  }, [clickedIcons, iconsArray, onAutoPop, winningIcon]);

useEffect(() => {
  preloadSounds([
    require('./../assets/audio/sfx_pop01.mp3'),
    require( './../assets/audio/sfx_pop02.mp3'),
    require('./../assets/audio/sfx_pop03.mp3')
  ]);
}, []);

  return (
    <ImageBackground source={scratchBackground} style={styles.background_view}>
      <View style={styles.container}>
        <Animated.View style={[styles.gridContainer, {opacity: fadeAnim}]}>
          {iconsArray.map((icon, index) => (
            <View key={index} style={styles.iconContainer}>
              {icon !== null && (
                <View style={styles.iconWrapper}>
                  {winningIcon === icon &&
                  !clickedIcons.includes(index) &&
                  scratched ? (
                    <AnimatedIcon
                      iconIndex={icon}
                      onClick={() => handleIconClick(index)}
                    />
                  ) : clickedIcons.includes(index) ? (
                    <View
                      style={[
                        styles.lottieContainer,
                        {top: '-40%'},
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
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    width: '23%',
    aspectRatio: 1,
    margin: '1%',
  },
  iconWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
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
    width: '180%',
    height: '180%',
  },
  background_view: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default ScratchGame;
