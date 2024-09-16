import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { BackgroundGame } from "../components/BackgroundGame";
import TopLayout from "../components/TopLayout";
import ScratchLayout from "../components/ScratchLayout";
import { updateCurrentTheme, backgroundLoop } from "../global/Assets";
import Video from "../components/Video";
import GameOverScreen from "../components/GameOverScreen.js";
import LuckySymbolCollect from "../components/LuckySymbolCollect.js";
import BrowserDetection from "react-browser-detection";

// Importing media files
const backgroundGame = require("./../assets/image/background_game.png");
const videoWinLuckySymbol = require("./../assets/video/3D_Lucky_Coin_Spin_Win_intro_safari.mp4");
const videoWinLuckySymbolChrome = require("./../assets/video/3D_Lucky_Coin_Spin_Win_intro_chrome.webm");

const videoLuckySymbolFinal = require("./../assets/video/lucky_symbol_3d_coin_cut.mp4");

const { width } = Dimensions.get("window");

const ScratchLuckyGame = () => {
  // State variables to manage the game logic
  const [gameOver, setGameOver] = useState(false); // Flag to indicate if the game is over
  const [reset, setReset] = useState(false); // Flag to trigger reset state
  const [scratched, setScratched] = useState(false); // State to track if the scratch has started
  const [scratchCardLeft, setScratchCardLeft] = useState(10); // Tracks remaining scratch cards
  const [timerGame, setTimerGame] = useState(0); // Game timer
  const [score, setScore] = useState(0); // Current score
  const [scratchStarted, setScratchStarted] = useState(false); // Tracks if the scratch action has started
  const [luckySymbolCount, setLuckySymbolCount] = useState(2); // Tracks the number of lucky symbols uncovered

  // Animation references for movement effects
  const marginTopAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  const [winLuckySymbolVideo, setWinLuckySymbolVideo] = useState(false); // Tracks if the Lucky Symbol video should be shown
  const [collectLuckySymbolVideo, setCollectLuckySymbolVideo] = useState(false); // Tracks if the collect Lucky Symbol video should be shown

  const [skipToFinishLuckyVideo, setSkipToFinishLuckyVideo] = useState(false);

  const browserHandler = {
    chrome: () => (
      <Video
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
    //googlebot: () => <div>Hi GoogleBot!</div>,
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
    setWinLuckySymbolVideo(false);
    setCollectLuckySymbolVideo(false);
    setSkipToFinishLuckyVideo(false);
    addLuckySymbol();

    setTimeout(() => {
      setReset(true);

      setTimeout(() => {
        updateCurrentTheme();
      }, 500);
    }, 1200);
  };

  const addLuckySymbol = () => {
    console.log("Adding lucky symbol", luckySymbolCount);
    if (luckySymbolCount === 3) {
      setLuckySymbolCount(0);
    } else if (luckySymbolCount === 2) {
      setCollectLuckySymbolVideo(true);
    } else {
      setLuckySymbolCount(luckySymbolCount + 1);
    }
  };

  // Callback function to handle when the video finishes
  const handleVideoEnd = () => {
    console.log("Video has finished playing.");
    nextCard();
  };

  useEffect(() => {
    if (scratchStarted) {
      Animated.timing(marginTopAnim, {
        toValue: 10,
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
        if (scratchCardLeft > 0) {
          setScratchCardLeft(scratchCardLeft - 1);
        } else {
          setGameOver(true);
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
          translateX.setValue(width);
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
    setSkipToFinishLuckyVideo(true);

    setWinLuckySymbolVideo(false);
    setTimeout(() => {
      nextCard();
    }, 500);
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

  return (
    <View style={styles.fullScreen}>
      {/* Background of the game */}
      <BackgroundGame showAlphaView={scratchStarted} source={backgroundLoop} />
      <View style={styles.containerOverlay}>
        <ImageBackground
          source={backgroundGame} // The background image for the game
          style={styles.imageBackground}
          resizeMode="stretch"
        >
          <Animated.View style={[{ transform: [{ translateX }] }]}>
            <View style={styles.overlay}>
              {/* Top part of the layout showing timer, score, etc. */}
              <Animated.View style={{ marginTop: marginTopAnim }}>
                <TopLayout
                  scratched={scratched}
                  scratchStarted={scratchStarted}
                  timerGame={timerGame}
                  setTimerGame={setTimerGame}
                  score={score}
                  luckySymbolCount={luckySymbolCount}
                />
              </Animated.View>

              {/* Main scratch card layout */}
              <ScratchLayout
                reset={reset}
                setReset={setReset}
                scratched={scratched}
                setScratched={setScratched}
                luckySymbolCount={luckySymbolCount}
                setLuckySymbolCount={setLuckySymbolCount}
                setScratchStarted={setScratchStarted}
                scratchCardLeft={scratchCardLeft}
                setScratchCardLeft={setScratchCardLeft}
                timerGame={timerGame}
                score={score}
                setScore={setScore}
                setWinLuckySymbolVideo={setWinLuckySymbolVideo}
                setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
              />
            </View>
          </Animated.View>
        </ImageBackground>
      </View>
      {gameOver && <GameOverScreen />}
      {winLuckySymbolVideo && renderWinLuckySymbolVideoScreen()}
      {collectLuckySymbolVideo && (
        <LuckySymbolCollect
          handleVideoEnd={handleVideoEnd}
          setLuckySymbolCount={setLuckySymbolCount}
        />
      )}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    position: "relative",
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
      default: StyleSheet.absoluteFillObject, // For mobile, this covers the entire screen
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
    bottom: 10,
    zIndex: 2, // Ensures the background is behind other elements
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
        width: "100vw", // Full viewport width for web
        height: "100vh", // Full viewport height for web
        objectFit: "cover", // Makes sure the video scales proportionally on web
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
});

export default ScratchLuckyGame;
