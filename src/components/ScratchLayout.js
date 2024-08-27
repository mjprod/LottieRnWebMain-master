import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Platform,
  Image,
} from "react-native";
import GameButton from "./GameButton";

const backgroundScratchTop = require("./../assets/image/background_scratch_top.png");

//import GameButton, {GameButtonType} from './GameButton';
//import ScratchGame from './ScratchGame';
//import LottieView from 'lottie-react-native';
//import ScratchCardLeft from './ScratchCardLeft';
//import ScratchCard from './ScratchCard';
//import {triggerVibration} from '../global/Vibration';
//import TransparentVideo from '@status-im/react-native-transparent-video';
//import {playSong} from '../global/Player';
//import {
//eraserShouldBeScratched,
//setLuckySymbolCountTimer,
//simulateScratchTimeOut,
//} from '../global/Settings';
//import LuckySymbolOverlay from './LuckySymbolOverlay';
/*
const scratchForeground = require('./../../assets/image/scratch_foreground.jpg');
const iconArrowScratchTop = require('./../../assets/image/icon_arrow_scratch_top.png');
const audioLuckySymbolCoins = require('./../../assets/audio/background_lucky_symbol_coins.wav');
const audioGameLoseScreen = require('../../assets/audio/background_game_lose_screen.aac');
const audioAutoPopup = require('../../assets/audio/sfx_autopopup.wav');
const lottiePageCurl = require('../../assets/lotties/lottiePageCurl.json');

const videoLuckySymbol = require('./../../assets/video/lucky_symbol_3d_coin.mp4');
const videoLuckySymbolFinal = require('./../../assets/video/lucky_symbol_3d_coin_cut.mp4');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height + 700;


type ScratchLayoutProps = {
  onWin: (value: boolean) => void;
  onLose: (value: boolean) => void;
  scratched: boolean;
  setScratched: (value: boolean) => void;
  setButtonLayout: (value: any) => void;
  reset: boolean;
  setReset: (value: boolean) => void;
  scratchCardLeft: number;
  setScratchCardLeft: (value: number) => void;
  isCountingBonusDown: boolean;
  luckySymbolCount: number;
  setLuckySymbolCount: (value: number) => void;
};
*/
const ScratchLayout = ({}) => {
  const [buttonText, setButtonText] = useState("AUTO SCRATCH");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  //const [isScratchCardVisible, setIsScratchCardVisible] = useState(true);
  //const [showLuckySymbol, setShowLuckySymbol] = useState(false);

  //const [triggerAutoPop, setTriggerAutoPop] = useState(false);
  // const [isWinner, setIsWinner] = useState(false);
  //const [scratchedStarted, setScratchedStarted] = useState(false);
  //const [autoScratch, setAutoScratch] = useState(false);
  // const [collectLuckySymbol, setCollectShowLuckySymbol] = useState(false);
  // const [isLuckySymbolTrue, setIsLuckySymbolTrue] = useState(false);

  //const buttonRef = useRef(null);

  //const [skipToFinishLuckyVideo, setSkipToFinishLuckyVideo] = useState(false);

  //const videoRef = useRef(null);

  // useEffect(() => {
  /// if (videoRef.current) {
  //console.log('Video component methods:', Object.keys(videoRef.current));
  // }
  //}, []);
  /*
    const handleClick = () => {
      if (videoRef.current) {
        setSkipToFinishLuckyVideo(true);
        
        setTimeout(() => {

          // code repeated
          addLuckySymbol();
          setShowLuckySymbol(false);
          setSkipToFinishLuckyVideo(false);


          //TODO fix code
          //setScratched(true);
          setIsScratchCardVisible(false);
          if (isWinner) {
            setButtonText('AUTO POP');
          } else {
            endGame();
          }

        } , 500);
        //TODO arrumar timer to finish the video
        
      }
    };
    */
  /*
    useEffect(() => {
      if (reset) {
        setIsScratchCardVisible(true);
        setButtonText('AUTO SCRATCH');
        setTriggerAutoPop(false);
        setIsWinner(false);
        setScratchedStarted(false);
        setScratched(false);
        setAutoScratch(false);
        setCollectShowLuckySymbol(false);
        setReset(false);
      }
    }, [reset, setReset, setScratched]);

    const handleLayout = () => {
      if (buttonRef.current) {
        (buttonRef.current as any).measure(
          (x: any, y: any, width: any, height: any, pageX: any, pageY: any) => {
            setButtonLayout({x: pageX, y: pageY, width, height});
          },
        );
      }
    };

    const handleScratch = (scratchPercentage: number) => {
      if (
        scratchPercentage >= eraserShouldBeScratched &&
        isScratchCardVisible
      ) {
        setScratchedCard();
      } else {
        if (scratchPercentage > 0) {
          setScratchedStarted(true);
        }
      }
    };


    const simulateScratch = () => {
      setButtonLoading(true);
      setAutoScratch(true);
      setScratchedStarted(true);
      setTimeout(() => {
        setScratchedCard();
        setAutoScratch(false);
        setButtonLoading(false);
      }, simulateScratchTimeOut);
    };

    const autoPopPressed = () => {
      setButtonLoading(true);
      setTriggerAutoPop(true);
      playSong(audioAutoPopup);
      triggerVibration('medium');
      setTimeout(() => {
        setButtonLoading(false);
      }, 2000);
    };

    const nextCardPressed = () => {
      setButtonLoading(true);
      setReset(true);
      setScratchCardLeft(scratchCardLeft - 1);
      setTimeout(() => {
        setButtonLoading(false);
      }, 2000);
    };

   

    useImperativeHandle(ref, () => ({
      handleButtonPress,
    }));


     const endGame = useCallback(() => {
      if (isWinner) {
        onWin(true);
      } else {
        onLose(true);
        playSong(audioGameLoseScreen);
      }
      setButtonText('NEXT CARD');
    }, [isWinner, onWin, onLose]);

    useEffect(() => {
      if (triggerAutoPop) {
        setTriggerAutoPop(false);
        endGame();
      }
    }, [triggerAutoPop, isWinner, endGame]);

  

    const addLuckySymbol = () => {
      if (luckySymbolCount != 3) {
        setLuckySymbolCount(luckySymbolCount + 1);
      }
    };



    const setScratchedCard = () => {
      if (isLuckySymbolTrue) {
        if (luckySymbolCount === 2) {
          setCollectShowLuckySymbol(true);
        } else {
          setShowLuckySymbol(true);
          playSong(audioLuckySymbolCoins);
        }

        setTimeout(() => {
          if (!skipToFinishLuckyVideo) {
            addLuckySymbol();
          }
        }, setLuckySymbolCountTimer);

        setIsLuckySymbolTrue(false);
        setTimeout(() => {

          if (!skipToFinishLuckyVideo) {
            setShowLuckySymbol(false);
            if (isWinner) {
              setButtonText('AUTO POP');
            }
           
            setScratched(true);
            setIsScratchCardVisible(false);
            if (isWinner) {
              setButtonText('AUTO POP');
            } else {
              endGame();
            }
          }
         
        }, 5300);
      } else {
        setScratched(true);
        setIsScratchCardVisible(false);
        if (isWinner) {
          setButtonText('AUTO POP');
        } else {
          endGame();
        }
      }
    };
*/
  const handleButtonPress = () => {
    if (!imageLoading && !buttonLoading) {
      if (buttonText === "AUTO SCRATCH") {
        //simulateScratch();
      } else if (buttonText === "AUTO POP") {
        //autoPopPressed();
      } else if (buttonText === "NEXT CARD") {
        //nextCardPressed();
      }
    }
  };

  const getButtonType = () => {
    switch (buttonText) {
      case "CLAIM WIN":
        return "CLAIM";
      case "NEXT CARD":
        return "NEXT";
      case "AUTO SCRATCH":
      case "AUTO POP":
      default:
        return "AUTO";
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundScratchTop}
        resizeMode="contain"
        style={styles.imageTop}
      >
        <View style={styles.textContainer}>
          <Text style={styles.textTopLeft}>MATCH 3x SYMBOLS</Text>
          <View style={styles.viewRow}>
            <Text style={styles.textTopRight}>WIN 100 JKC</Text>
          </View>
        </View>
      </ImageBackground>

      <View
        style={[
          styles.innerContainer,
          Platform.OS === "android" ? styles.androidMargin : styles.iosMargin,
        ]}
      >
        <View style={styles.bottomView}>
          {/*isScratchCardVisible && (
              <View style={styles.scratchCardContainer}>
                
              </View>
            )*/}
        </View>

        <Image style={styles.arrowImage} source={null} />
      </View>
      <View style={styles.textBottomContainer}>
        <Text style={styles.textFooterTop}>
          BONUS: TAP THE MATCHING SYMBOLS
        </Text>
        <Text style={styles.textFooterBottom}>
          before the bonus timer ends for more wins!
        </Text>
      </View>
      <View
        //ref={buttonRef}
        //onLayout={handleLayout}
        style={{ alignSelf: "stretch" }}
      >
        <GameButton
          onPress={handleButtonPress}
          text={buttonText}
          loading={buttonLoading || imageLoading}
          type={getButtonType()}
        />
      </View>
      {/*showLuckySymbol && (
          <View
            style={{
              ...styles.transparentOverlayLose,
              //height: windowHeight,
              //width: windowWidth,
              zIndex: 9999,
              elevation: 10,
            }}>
            <View style={styles.overlay}>
          
            </View>
          </View>
          )*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    marginTop: "20%",
  },
  bottomView: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    display: "flex",
    position: "relative",
    height: 280,
  },
  scratchCardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  textBottomContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignContent: "center",
    marginVertical: 4,
  },
  textTopLeft: {
    color: "#FFEAC8",
    marginLeft: 15,
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 14,
  },
  textTopRight: {
    color: "#3E362A",
    marginRight: 15,
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 14,
    marginLeft: 15,
  },
  imageTop: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  androidMargin: {
    marginTop: -25,
  },
  iosMargin: {
    marginTop: -30,
  },
  arrowImage: {
    position: "absolute",
    marginTop: 10,
    top: -10,
    zIndex: 1,
  },
  textFooterTop: {
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#F1D3A3",
  },
  textFooterBottom: {
    textAlign: "center",
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#A9A9A9",
  },
  lottieAnimation: {
    position: "absolute",
    top: 0,
    left: -3,
    width: "10%",
    height: "10%",
  },
  transparentVideo: {
    position: "absolute",
    top: -70,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  transparentOverlayLose: {
    position: "absolute",
    marginLeft: -10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconLose: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    //height: windowHeight,
    //width: windowWidth,
    zIndex: 9999,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  clickableArea: {
    position: "absolute",
    top: 0,
    left: 0,
    //height: windowHeight,
    //width: windowWidth,
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});

export default ScratchLayout;
