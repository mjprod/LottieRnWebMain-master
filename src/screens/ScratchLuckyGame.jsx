import React, { useEffect, useRef, useState } from "react";
import BrowserDetection from "react-browser-detection";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LottieView from "react-native-web-lottie";
import { BackgroundGame } from "../components/BackgroundGame";
import LuckySymbolCollect from "../components/LuckySymbolCollect.js";
import ScratchLayout from "../components/ScratchLayout";
import TopLayout from "../components/TopLayout";
import Video from "../components/Video";
import GameOverScreen from "./GameOverScreen.js";

import { ActivityIndicator } from "react-native-web";
import { useLocation, useNavigate } from "react-router";
import BottomDrawer from "../components/BottomDrawer.js";
import IntroThemeVideo from "../components/IntroThemeVideo.js";
import { useGame } from "../context/GameContext.js";
import { numberOfCards } from "../global/Settings.js";
import useApiRequest from "../hook/useApiRequest.js";
import { useSound } from "../hook/useSoundPlayer.js";
import { useTheme } from "../hook/useTheme.js";

const backgroundGame = require("./../assets/image/background_game.png");
const videoWinLuckySymbol = require("./../assets/video/3D_Lucky_Coin_Spin_Win_intro_safari.mp4");
const videoWinLuckySymbolChrome = require("./../assets/video/3D_Lucky_Coin_Spin_Win_intro_chrome.webm");
const videoLuckySymbolFinal = require("./../assets/video/lucky_symbol_3d_coin_cut.mp4");
const lottieCountDown = require("../assets/lotties/lottieInitialCountdown.json");

const { width } = Dimensions.get("window");

const ScratchLuckyGame = () => {
  const {
    setScore,
    gameOver,
    setGameOver,
    scratchStarted,
    setScratchStarted,
    luckySymbolCount,
    setLuckySymbolCount,
    ticketCount,
    setTicketCount,
  } = useGame();

  const [gameStarted, setGameStarted] = useState(false);
  const [countDownStarted, setCountDownStarted] = useState(true);
  const [introThemeVideo, setIntroThemeVideo] = useState(false);
  const [reset, setReset] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [scratchCardLeft, setScratchCardLeft] = useState(0);
  const [timerGame, setTimerGame] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const marginTopAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const [winLuckySymbolVideo, setWinLuckySymbolVideo] = useState(false);
  const [collectLuckySymbolVideo, setCollectLuckySymbolVideo] = useState(false);
  const [skipToFinishLuckyVideo, setSkipToFinishLuckyVideo] = useState(false);

  const {
    backgroundLoop,
    goToNextTheme,
    themeSequence,
    nextTheme,
    currentTheme,
  } = useTheme();
  const { setStartPlay } = useSound();

  const ref = useRef(null);

  const { loading, error, response, updateLuckySymbol } = useApiRequest();
  const [user, setUser] = useState(null);

  const location = useLocation();
  const {
    initialScore,
    initialTicketCount,
    initialLuckySymbolCount,
    initialScratchCardLeft,
  } = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    setScore(initialScore);
    setTicketCount(initialTicketCount);
    setLuckySymbolCount(initialLuckySymbolCount);
    setScratchCardLeft(initialScratchCardLeft);
  }, [
    initialScore,
    initialTicketCount,
    initialLuckySymbolCount,
    initialScratchCardLeft,
  ]);

  // Trigger the API call when the component mounts
  useEffect(() => {
    //fetchUserDetails();
    //setScore(1200);
    //setTicketCount(1);
    //setLuckySymbolCount(1);
    setScratchCardLeft(numberOfCards);
  }, []);

  // Update the user state when the response is received
  useEffect(() => {
    if (response && response.user) {
      setUser(response.user);
    }
  }, [response]);

  const saveLuckySymbol = async (luckySymbol) => {
    setLuckySymbolCount(luckySymbol);
    updateLuckySymbol(1, luckySymbol);
  };

  useEffect(() => {
    if (user) {
      console.log("User details:", user);

      setScore(user.score);
      setTicketCount(user.tickets);
      setLuckySymbolCount(user.lucky_symbol);
      setScratchCardLeft(numberOfCards);

      //updateThemeSequence(user.cards);
    }
  }, [user]);

  useEffect(() => {
    setScratchCardLeft(themeSequence.length);
  }, [themeSequence]);

  useEffect(() => {
    if (countDownStarted) {
      setTimeout(() => {
        ref.current.play();
        setStartPlay(true);
      }, 1000);
    }
  }, [countDownStarted]);

  const browserHandler = {
    chrome: () => (
      <Video
        deo
        source={
          skipToFinishLuckyVideo
            ? videoLuckySymbolFinal
            : videoWinLuckySymbolChrome
        } // Play the win video
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
    default: (browser) => (
      <Video
        source={
          skipToFinishLuckyVideo ? videoLuckySymbolFinal : videoWinLuckySymbol
        } // Play the win video
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
  };

  const nextCard = () => {
    setSkipToFinishLuckyVideo(false);
    setWinLuckySymbolVideo(false);

    setTimeout(() => {
      if (luckySymbolCount < 2) {
        setTimeout(() => {
          if (scratchCardLeft > 1) {
            console.log(nextTheme[0]);
            console.log(currentTheme);
            console.log(currentTheme === nextTheme);

            if (currentTheme === nextTheme) {
              setTimeout(() => {
                setReset(true);
              }, 100);
            } else {
              setIntroThemeVideo(true);
            }

            setTimeout(() => {
              goToNextTheme();
            }, 100);
          } else {
            //setGameOver(true);
            //switchTrack(1);
            handleGameOver();
          }
        }, 700);
      }
    }, 300);
  };

  const addLuckySymbol = () => {
    if (luckySymbolCount > 2) {
      saveLuckySymbol(0);
    } else if (luckySymbolCount === 2) {
      saveLuckySymbol(luckySymbolCount + 1);
      setTimeout(() => {
        decrementLuckySymbol(3);
      }, 300);
    } else {
      saveLuckySymbol(luckySymbolCount + 1);
    }
  };

  const decrementLuckySymbol = (count, onComplete) => {
    if (count >= 0) {
      saveLuckySymbol(count);
      setTimeout(() => {
        if (count === 0) {
          onCountdownComplete();
        } else {
          decrementLuckySymbol(count - 1, onComplete);
        }
      }, 200);
    }
  };

  const onCountdownComplete = () => {
    setCollectLuckySymbolVideo(true);
  };

  // Callback function to handle when the video finishes
  const handleVideoEnd = () => {
    //console.log("Video has finished playing.");
    addLuckySymbol();
    nextCard();
  };

  const handleVideoIntroEnd = () => {
    setIntroThemeVideo(false);

    setTimeout(() => {
      setReset(true);
    }, 100);
  };

  useEffect(() => {
    if (scratchStarted) {
      Animated.timing(marginTopAnim, {
        toValue: 6,
        duration: 300,
        useNativeDriver: Platform.OS !== "web",
      }).start();
    } else {
      Animated.timing(marginTopAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: Platform.OS !== "web",
      }).start();
    }
  }, [scratchStarted]);

  useEffect(() => {
    if (reset) {
      setTimeout(() => {
        if (scratchCardLeft - 1 > 0) {
          setScratchCardLeft(scratchCardLeft - 1);
        } else {
          handleGameOver();
        }
      }, 600);
      setTimerGame(0);
      setScratchStarted(false);

      Animated.timing(translateX, {
        toValue: width * 0.1,
        duration: 200,
        useNativeDriver: Platform.OS !== "web",
      }).start(() => {
        Animated.timing(translateX, {
          toValue: -width,
          duration: 300,
          useNativeDriver: Platform.OS !== "web",
        }).start(() => {
          Animated.timing(translateX, {
            toValue: -width * 0.1,
            duration: 300,
            useNativeDriver: Platform.OS !== "web",
          }).start(() => {
            Animated.spring(translateX, {
              toValue: 0,
              friction: 5,
              useNativeDriver: Platform.OS !== "web",
            }).start();
          });
        });
      });
    }
  }, [reset, setReset]);

  const handleClick = () => {
    addLuckySymbol();
    nextCard();
  };

  // Function to render the win screen with a video overlay
  const renderWinLuckySymbolVideoScreen = () => {
    return (
      <View
        key="overlay"
        style={{
          ...styles.blackOverlayWin,
          flex: 1,
          zIndex: 9999, // Makes sure the overlay is on top of all other elements
          elevation: 10, // Ensures the overlay has proper visual depth on Android
        }}
      >
        <BrowserDetection>{browserHandler}</BrowserDetection>
        <TouchableOpacity style={styles.clickableArea} onPress={handleClick}>
          <View style={styles.transparentOverlay} />
        </TouchableOpacity>
      </View>
    );
  };

  const handleAnimationFinish = () => {
    setGameStarted(true);
  };

  const startGame = () => {
    setCountDownStarted(true);
  };

  const renderInitialScreen = () => {
    return (
      <View
        key="overlay"
        style={{
          ...styles.blackOverlayWin,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          zIndex: 9999,
          elevation: 10,
        }}
      >
        <TouchableOpacity style={{ width: "80%" }}>
          {countDownStarted && (
            <View style={styles.rowCountDown}>
              <LottieView
                ref={ref}
                style={styles.lottieAnimation}
                source={lottieCountDown}
                speed={1}
                loop={false}
                onAnimationFinish={handleAnimationFinish}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const handleGameOver = () => {
    setGameOver(true);
    navigate("/game_over");
    // {
    //state: {
    //luckySymbolCount,
    //ticketCount,
    // Any other props you want to pass
    //},
    // });
  };

  if (loading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD89E" />
      </View>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <View style={styles.fullScreen}>
      <BackgroundGame
        showAlphaView={scratchStarted || gameOver}
        source={backgroundLoop}
      />
      <View style={styles.containerOverlay}>
        <ImageBackground
          source={backgroundGame}
          style={styles.imageBackground}
          resizeMode="stretch">
          <Animated.View style={[{ transform: [{ translateX }] }]}>
            <View style={styles.overlay}>
              <Animated.View style={{ marginTop: marginTopAnim }}>
                <TopLayout
                  scratched={scratched}
                  scratchStarted={scratchStarted}
                  timerGame={timerGame}
                  setTimerGame={setTimerGame}
                  luckySymbolCount={luckySymbolCount}
                  clickCount={clickCount}/>
              </Animated.View>

              <ScratchLayout
                reset={reset}
                setReset={setReset}
                scratched={scratched}
                setScratched={setScratched}
                luckySymbolCount={luckySymbolCount}
                setLuckySymbolCount={setLuckySymbolCount}
                setScratchStarted={setScratchStarted}
                scratchCardLeft={scratchCardLeft}
                timerGame={timerGame}
                setWinLuckySymbolVideo={setWinLuckySymbolVideo}
                setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
                clickCount={clickCount}
                setClickCount={setClickCount}
                nextCard={nextCard}
              />
            </View>
          </Animated.View>
        </ImageBackground>
      </View>

      <BottomDrawer />
      {gameOver && (
        <GameOverScreen
          luckySymbolCount={luckySymbolCount}
          ticketCount={ticketCount}
        />
      )}
      {winLuckySymbolVideo && renderWinLuckySymbolVideoScreen()}
      {collectLuckySymbolVideo && (
        <LuckySymbolCollect
          nextCard={nextCard}
          setReset={setReset}
          setLuckySymbolCount={setLuckySymbolCount}
          setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
        />
      )}
      {(!gameStarted || !countDownStarted) && renderInitialScreen()}
      {introThemeVideo && (
        <IntroThemeVideo handleVideoEnd={handleVideoIntroEnd} />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    position: "relative",
  },
  musicButton: {
    position: "absolute",
    top: 50,
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 10,
  },
  containerOverlay: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      },
      default: StyleSheet.absoluteFillObject,
    }),
    flexDirection: "row",
  },
  imageBackground: {
    flex: 1,
    margin: 10,
    position: "absolute",
    top: 130,
    left: 10,
    right: 10,
    bottom: 65,
    zIndex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  blackOverlayWin: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background for win screen
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Same semi-transparent background for mobile
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  transparentVideo: {
    ...Platform.select({
      web: {
        width: "100vw",
        height: "100vh",
        objectFit: "cover",
      },
      default: {
        ...StyleSheet.absoluteFillObject, // For mobile, full-screen video scaling
        resizeMode: "cover",
      },
    }),
  },
  clickableArea: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  transparentOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScratchLuckyGame;
