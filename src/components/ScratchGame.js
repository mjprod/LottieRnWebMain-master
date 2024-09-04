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

import settings, {
  generateRandomLuckySymbolPercentage,
  finishPopUpToVideoTimer,
  maxCountWin,
  maxOtherCount,
  totalIcons,
  totalPositions,
  columns,
  maxRepeatedIcons,
} from '../global/Settings';
import { playSound, preloadSounds } from '../global/Player';

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
  onAutoPop,
  setIsWinner,
  scratched,
  reset,
  onLoading,
  setIsLuckySymbolTrue,
}) => {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [iconsArray, setIconsArray] = useState([]);
  const [winningIcons, setWinningIcons] = useState([]);
  const [clickedIcons, setClickedIcons] = useState([]);
  const [clickedCount, setClickedCount] = useState({});
  const [lastClickedIcon, setLastClickedIcon] = useState(null);
  const [clickCount, setClickCount] = useState(0);  

  const generateRandomLuckySymbol = () => {
    return Math.random() < generateRandomLuckySymbolPercentage;
  };

  useEffect(() => {
    setClickedIcons([]);
    setClickedCount({});
    setClickCount(0);
    setLastClickedIcon(null);

    let generated = generateRandomLuckySymbol();
    console.log('generated', generated);
    setIsLuckySymbolTrue(generated);
    const generatedArray = generateIconsArray(generated);
    console.log('generatedArray', generatedArray);
    setIconsArray(generatedArray);
    const winners = checkWinCondition(generatedArray);  // Agora pode retornar múltiplos vencedores
    console.log('winners', winners);
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
      resultArray[luckyPosition] = 8;
      iconCounts[8] = 1;
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
        winners.push(index);  // Adiciona todos os ícones que atingiram a condição de vitória
      }
    });
    return winners;
  };

  /*const handleIconClick = (index) => {
    if (!clickedIcons.includes(index)) {
      const newClickedIcons = [...clickedIcons, index];
      setClickedIcons(newClickedIcons);

      const icon = iconsArray[index];
      const newClickedCount = {
        ...clickedCount,
        [icon]: (clickedCount[icon] || 0) + 1,
      };
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
          break;
      }

      if (newClickedCount[icon] === 3) {
        setTimeout(() => {
          //onEndGame();
        }, finishPopUpToVideoTimer);
      }
    }
  };
*/


let popSound1, popSound2, popSound3, errorSound;

useEffect(() => {
  // Pré-carrega os sons usando o objeto nativo Audio
  popSound1 = new Audio(require('./../assets/audio/sfx_pop01.mp3'));
  popSound2 = new Audio(require('./../assets/audio/sfx_pop02.mp3'));
  popSound3 = new Audio(require('./../assets/audio/sfx_pop03.mp3'));
  errorSound = new Audio(require('./../assets/audio/sfx_autopopup.wav'));

  return () => {
    // Limpa os recursos ao desmontar o componente
    popSound1 = null;
    popSound2 = null;
    popSound3 = null;
    errorSound = null;
  };
}, []);

const handleIconClick = (index) => {
  const icon = iconsArray[index];  // Obtém o ícone no índice clicado

  // Verifica se o ícone já foi clicado
  if (!clickedIcons.includes(index)) {

    // Verifica se o usuário clicou em um ícone diferente antes de completar 3 cliques
    // Somente toque o som de erro se o último ícone clicado não tiver completado a sequência de 3 cliques
    if (lastClickedIcon !== null && lastClickedIcon !== icon && clickedCount[lastClickedIcon] < 3) {
      playSound(require('./../assets/audio/sfx_autopopup.wav'));  // Toca o som de erro
      setClickCount(1);  // Reseta o contador de cliques para 1

      // Mantenha os ícones já clicados e adicione o novo ícone clicado
      setClickedIcons([...clickedIcons, index]);  // Adiciona o novo ícone ao array sem reiniciar

      setLastClickedIcon(icon);  // Atualiza o último ícone clicado para o novo ícone
      return;  // Sai da função para evitar processamento adicional
    }

    // Atualiza o estado dos ícones clicados
    const newClickedIcons = [...clickedIcons, index];
    setClickedIcons(newClickedIcons);

    // Atualiza a contagem de cliques no ícone
    const newClickedCount = {
      ...clickedCount,
      [icon]: (clickedCount[icon] || 0) + 1,  // Incrementa a contagem do ícone
    };
    setClickedCount(newClickedCount);

    // Toca o som correspondente ao número de ícones clicados
    switch (newClickedCount[icon]) {
      case 1:
        playSound(require('./../assets/audio/sfx_pop01.mp3'));
        break;
      case 2:
        playSound(require('./../assets/audio/sfx_pop02.mp3'));
        break;
      case 3:
        playSound(require('./../assets/audio/sfx_pop03.mp3'));
        // Reseta o contador após três cliques
        setClickCount(0);
        break;
      default:
        break;
    }

    // Se o usuário clicou três vezes no mesmo ícone, execute uma ação
    if (newClickedCount[icon] === 3) {
      setTimeout(() => {
        // Realize qualquer ação adicional após três cliques, se necessário
        // onEndGame(); // Comente ou descomente conforme necessário
      }, finishPopUpToVideoTimer);
    }

    // Atualiza o último ícone clicado
    setLastClickedIcon(icon);
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

  useEffect(() => {
    const autoPop = () => {
      const newClickedIcons = [...clickedIcons];
      iconsArray.forEach((icon, index) => {
        if (winningIcons.includes(icon) && !newClickedIcons.includes(index)) {
          newClickedIcons.push(index);
        }
      });
      setClickedIcons(newClickedIcons);
    };

    if (onAutoPop) {
      autoPop();
    }
  }, [clickedIcons, iconsArray, onAutoPop, winningIcons]);

  useEffect(() => {
    preloadSounds([
      require('./../assets/audio/sfx_pop01.mp3'),
      require('./../assets/audio/sfx_pop02.mp3'),
      require('./../assets/audio/sfx_pop03.mp3'),
      require('./../assets/audio/sfx_autopopup.wav'),
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
                  {winningIcons.includes(icon) &&
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
    maxWidth: '23%',
    minWidth: '20%',
    aspectRatio: 1,
    margin: '1%',
    boxSizing: 'border-box',
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
