import React, { useEffect, useRef, useState } from "react";
import BrowserDetection from "react-browser-detection";
import {
  Animated,
  Dimensions,
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
import { ActivityIndicator } from "react-native-web";
import { useLocation } from "react-router";
import BottomDrawer from "../components/BottomDrawer.js";
import IntroThemeVideo from "../components/IntroThemeVideo.js";
import { useGame } from "../context/GameContext.js";
import useApiRequest from "../hook/useApiRequest.js";
import { useSound } from "../hook/useSoundPlayer.js";
import { useTheme } from "../hook/useTheme.js";
import AssetPack from "../util/AssetsPack.js";
import useAppNavigation from "../hook/useAppNavigation.js";
import LinearGradient from 'react-native-web-linear-gradient';

const { width } = Dimensions.get("window");

const ScratchLuckyGame = () => {
  const appNavigation = useAppNavigation();
  const location = useLocation();

  const ref = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [countDownStarted, setCountDownStarted] = useState(true);
  const [introThemeVideo, setIntroThemeVideo] = useState(false);
  const [reset, setReset] = useState(false);
  const [scratched, setScratched] = useState(false);
  const [scratchCardLeft, setScratchCardLeft] = useState(0);
  const [timerGame, setTimerGame] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [winLuckySymbolVideo, setWinLuckySymbolVideo] = useState(false);
  const [collectLuckySymbolVideo, setCollectLuckySymbolVideo] = useState(false);
  const [skipToFinishLuckyVideo, setSkipToFinishLuckyVideo] = useState(false);
  const [gameId, setGameId] = useState(null);

  const [luckySymbolWon, setLuckySymbolWon] = useState(0)
  const [totalComboCount, setTotalComboCount] = useState(0)
  const [comboPlayed, setComboPlayed] = useState(0)

  const {
    user,
    setUser,
    score,
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

  const {
    backgroundLoop,
    goToNextTheme,
    themeSequence,
    nextTheme,
    currentTheme,
    updateThemeSequence
  } = useTheme();

  const {
    loading,
    error,
    response,
    updateLuckySymbol,
    updateCardPlayed,
    fetchUserDetails,
    updateScore
  } = useApiRequest();

  const { setStartPlay } = useSound();

  const marginTopAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (location.state) {
      const { username, email, id } = location.state;
      fetchUserDetails(id, username, email);
    }
  }, [location]);

  useEffect(() => {
    if (response) {
      if (response.user) {
        setUser(response.user);
      } else if (response.gameId) {
        setGameId(response.gameId);
      }
    }
  }, [response]);

  useEffect(() => {
    if (user) {
      setScore(user.total_score);
      setTicketCount(user.ticket_balance);
      setLuckySymbolCount(user.lucky_symbol_balance);
      updateThemeSequence(user.card_balance);
    }
  }, [user]);

  useEffect(() => {
    setScratchCardLeft(themeSequence.length);
  }, [themeSequence]);

  useEffect(() => {
    if (countDownStarted) {
      setTimeout(() => {
        if (ref.current != null) {
          ref.current.play();
        }
        setStartPlay(true);
      }, 1000);
    }
  }, [countDownStarted, ref]);

  const saveLuckySymbol = async (luckySymbol) => {
    setLuckySymbolCount(luckySymbol);
  };

  const browserHandler = {
    chrome: () => (
      <Video
        deo
        source={
          skipToFinishLuckyVideo
            ? AssetPack.videos.LUCKY_SYMBOL_FINAL
            : AssetPack.videos.WIN_LUCKY_SYMBOL_CHROME
        } // Play the win video
        style={styles.transparentVideo} // Video styling
        // onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
    default: (browser) => (
      <Video
        source={
          skipToFinishLuckyVideo ? AssetPack.videos.LUCKY_SYMBOL_FINAL : AssetPack.videos.WIN_LUCKY_SYMBOL
        } // Play the win video
        style={styles.transparentVideo} // Video styling
        onEnd={handleVideoEnd} // Mobile: Trigger callback when video ends
        // onEnded={handleVideoEnd} // Web: Trigger callback when video ends
      />
    ),
  };

  const nextCard = () => {
    setSkipToFinishLuckyVideo(false);
    setWinLuckySymbolVideo(false);

    setTimeout(() => {
      if (luckySymbolCount <= 2) {
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
            handleGameOver();
          }
        }, 700);
      }
    }, 300);
  };

  const addLuckySymbol = () => {
    console.log("User ID:", user.user_id)
    if (luckySymbolCount > 2) {
      updateLuckySymbol(user.user_id, 0)
      saveLuckySymbol(0);
    } else if (luckySymbolCount === 2) {
      saveLuckySymbol(luckySymbolCount + 1);
      setTimeout(() => {
        decrementLuckySymbol(3);
      }, 300);
      updateLuckySymbol(user.user_id, 0)
    } else {
      saveLuckySymbol(luckySymbolCount + 1);
      updateLuckySymbol(user.user_id, luckySymbolCount + 1)
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

  const handleVideoEnd = () => {
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
      updateCardPlayed(user.current_beta_block, user.user_id, luckySymbolWon, totalComboCount)
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
      updateScore(user.user_id, score, gameId, comboPlayed)
      setTimeout(() => {
        if (scratchCardLeft - 1 > 0) {
          setScratchCardLeft(scratchCardLeft - 1);
        } else {
          handleGameOver();
        }
      }, 600);
      setTimerGame(0);
      setScratchStarted(false);
      setComboPlayed(0)
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
                source={AssetPack.lotties.COUNT_DOWN}
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
    appNavigation.goToGameOverPage(user.user_id, user.name, user.email)
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
        source={backgroundLoop} />
      <View style={styles.containerOverlay}>
        <LinearGradient
          start={{ x: 0.0, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.3, 0.45, 0.55, 1.0]}
          colors={['#212121', '#262E33', '#1D4A64', '#24282B', '#212121']}
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
                  clickCount={clickCount} />
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
                setLuckySymbolWon={setLuckySymbolWon}
                setTotalComboCount={setTotalComboCount}
                setComboPlayed={setComboPlayed}
              />
            </View>
          </Animated.View>
        </LinearGradient>
      </View>

      <BottomDrawer />
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
    top: 120,
    left: 10,
    right: 10,
    bottom: 65,
    zIndex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: "#A88C5D",
    borderWidth: 1,

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
