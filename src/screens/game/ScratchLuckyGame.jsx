import React, { useEffect, useMemo, useRef, useState } from "react";

import { Animated, Dimensions, Platform, StyleSheet, View } from "react-native";

import { Easing } from "react-native";
import { useLocation } from "react-router";
import { BackgroundGame } from "../../components/BackgroundGame.js";
import IntroThemeVideo from "./components/IntroThemeVideo";
import LoadingView from "../../components/LoadingView.js";
import LuckySymbolCollect from "./components/LuckySymbolCollect";
import ScratchLayout from "./components/ScratchLayout";
import TopLayout from "./components/TopLayout";
import { useGame } from "../../context/GameContext.js";
import useApiRequest from "../../hook/useApiRequest.js";
import useAppNavigation from "../../hook/useAppNavigation.js";
import { useSound } from "../../hook/useSoundPlayer.js";
import { useTheme } from "../../hook/useTheme.js";
import { BONUS_PACK_NUMBER_OF_CARDS, Colors } from "../../util/constants";
import BottomDrawer from "./components/BottomDrawer";
import InitialCountDownView from "./components/InitialCountDownView";
import WinLuckySymbolView from "./components/WinLuckySymbolView";

const { width } = Dimensions.get("window");

const ScratchLuckyGame = () => {
  const appNavigation = useAppNavigation();
  const location = useLocation();

  const countDownLottieRef = useRef(null);
  const luckySymbolVideoRef = useRef(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [countDownStarted, setCountDownStarted] = useState(false);
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
  const [games, setGames] = useState();
  const [maxCombinations, setMaxCombinations] = useState(0);
  const [hasLuckySymbol, setHasLuckySymbol] = useState(false);
  const [luckySymbolWon, setLuckySymbolWon] = useState(0);
  const [totalComboCount, setTotalComboCount] = useState(0);
  const [comboPlayed, setComboPlayed] = useState(0);
  const [nextCardAnimationFinished, setNextCardAnimationFinished] =
    useState(true);

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
    setTicketCount,
  } = useGame();

  const {
    backgroundLoop,
    goToNextTheme,
    themeSequence,
    nextTheme,
    currentTheme,
    updateThemeUsingGames,
    currentThemeIndex,
  } = useTheme();

  const {
    getGamesLoading,
    fetchUserDetailsLoading,
    getGamesError,
    fetchUserDetailsError,
    updateLuckySymbol,
    updateCardPlayed,
    fetchUserDetails,
    updateCardBalance,
    updateScore,
    getGames,
  } = useApiRequest();

  const { setStartPlay } = useSound();

  const marginTopAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (location.state) {
      const { username, email, id } = location.state;
      fetchUserDetails(id, username, email)
        .then((response) => {
          if (response.user) {
            setUser(response.user);
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [location]);

  useEffect(() => {
    if (games && games.length > 0) {
      const currentGame = games[currentThemeIndex];
      setMaxCombinations(currentGame.number_combination_total);
      setHasLuckySymbol(currentGame.lucky_symbol_won == 1);
      setGameId(currentGame.game_id);
    }
  }, [games, currentThemeIndex]);

  useEffect(() => {
    if (user) {
      getGames(user.user_id, user.current_beta_block)
        .then((response) => {
          if (response.games) {
            updateThemeUsingGames(response.games);
            setGames(response.games);
          }
        })
        .catch((error) => {
          console.error("Error fetching games:", error);
        });
      setScore(user.total_score);
      setTicketCount(user.ticket_balance);
      setLuckySymbolCount(user.lucky_symbol_balance);
    }
  }, [user]);

  useEffect(() => {
    if (themeSequence && themeSequence.length > 0) {
      setCountDownStarted(true);
      setScratchCardLeft(themeSequence.length);
    }
  }, [themeSequence]);

  useEffect(() => {
    if (countDownStarted) {
      setTimeout(() => {
        if (countDownLottieRef.current != null) {
          countDownLottieRef.current.play();
        }
        setStartPlay(true);
      }, 1000);
    }
  }, [countDownStarted, countDownLottieRef]);

  const saveLuckySymbol = async (luckySymbol) => {
    setLuckySymbolCount(luckySymbol);
  };

  const nextCard = () => {
    setSkipToFinishLuckyVideo(false);
    setWinLuckySymbolVideo(false);
    if (luckySymbolCount <= 2) {
      if (scratchCardLeft > 1) {
        if (currentTheme === nextTheme) {
          setReset(true);
        } else {
          setIntroThemeVideo(true);
        }
      } else {
        handleGameOver();
      }
    }
  };

  const addLuckySymbol = () => {
    if (luckySymbolCount > 2) {
      updateLuckySymbol(user.user_id, 0);
      saveLuckySymbol(0);
      nextCard();
    } else if (luckySymbolCount === 2) {
      saveLuckySymbol(luckySymbolCount + 1);
      setTimeout(() => {
        decrementLuckySymbol(3);
      }, 300);
      updateLuckySymbol(user.user_id, 0);
    } else {
      saveLuckySymbol(luckySymbolCount + 1);
      updateLuckySymbol(user.user_id, luckySymbolCount + 1);
      nextCard();
    }
  };

  const decrementLuckySymbol = (count, onComplete) => {
    if (count >= 0) {
      saveLuckySymbol(count);
      setTimeout(() => {
        if (count === 0) {
          setCollectLuckySymbolVideo(true);
        } else {
          decrementLuckySymbol(count - 1, onComplete);
        }
      }, 200);
    }
  };

  const handleLuckySymbolWonVideoEnd = () => {
    setWinLuckySymbolVideo(false);
    addLuckySymbol();
  };

  const handleVideoIntroEnd = () => {
    setIntroThemeVideo(false);
    setTimeout(() => {
      setReset(true);
    }, 100);
  };

  useEffect(() => {
    if (scratchStarted) {
      updateCardPlayed(user.current_beta_block, user.user_id, gameId);
      Animated.timing(marginTopAnim, {
        toValue: 6,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }).start();
    } else {
      Animated.timing(marginTopAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }).start();
    }
  }, [scratchStarted]);

  useEffect(() => {
    if (reset) {
      setNextCardAnimationFinished(false);
      updateScore(user.user_id, score, gameId, comboPlayed);
      Animated.timing(translateX, {
        toValue: -width * 1.1,
        duration: 400,
        useNativeDriver: Platform.OS !== "web",
      }).start(() => {
        setTimeout(() => {
          if (scratchCardLeft - 1 > 0) {
            setScratchCardLeft(scratchCardLeft - 1);
          } else {
            handleGameOver();
          }
        }, 200);
        setNextCardAnimationFinished(true);
        setTimerGame(0);
        setScratchStarted(false);
        setComboPlayed(0);
        goToNextTheme();
        Animated.spring(translateX, {
          toValue: 0,
          friction: 7,
          tension: 50,
          useNativeDriver: Platform.OS !== "web",
        }).start();
      });
    }
  }, [reset, setReset]);

  const handleWinLuckySymbolVideoScreenClick = () => {
    if (!skipToFinishLuckyVideo) {
      luckySymbolVideoRef.current.seekToTime(2);
    }
    setSkipToFinishLuckyVideo(true);
  };

  const handleCountdownFinish = () => {
    setGameStarted(true);
  };

  const handleLuckySymbolCollectComplete = () => {
    updateCardBalance(
      user.user_id,
      user.current_beta_block,
      BONUS_PACK_NUMBER_OF_CARDS
    );
  };

  const handleGameOver = () => {
    setGameOver(true);
    appNavigation.goToGameOverPage(user.user_id, user.name, user.email);
  };

  const backGroundVideo = useMemo(() => {
    return backgroundLoop;
  }, [backgroundLoop]);

  const containerStyle = useMemo(
    () => [
      styles.fullScreen,
      { pointerEvents: nextCardAnimationFinished ? "auto" : "none" },
    ],
    [nextCardAnimationFinished]
  );

  const gameBackground = useMemo(
    () => (
      <BackgroundGame
        showAlphaView={scratchStarted || gameOver}
        source={backGroundVideo}
      />
    ),
    [backGroundVideo, scratchStarted, gameOver]
  );

  if (getGamesLoading || fetchUserDetailsLoading) return <LoadingView />;
  if (getGamesError || fetchUserDetailsError)
    return <p>Error: {getGamesError || fetchUserDetailsError}</p>;

  return (
    <View style={containerStyle}>
      {gameBackground}
      <View style={styles.containerOverlay}>
        <Animated.View style={[styles.background, { transform: [{ translateX }] }]}>
          <Animated.View style={{ marginTop: marginTopAnim }}>
            <TopLayout setTimerGame={setTimerGame} clickCount={clickCount} />
          </Animated.View>
          <View
            style={styles.imageBackground}>
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
              maxCombinations={maxCombinations}
              hasLuckySymbol={hasLuckySymbol}
              setLuckySymbolWon={setLuckySymbolWon}
              setTotalComboCount={setTotalComboCount}
              setComboPlayed={setComboPlayed}
            />
          </View>
        </Animated.View>
      </View>
      <BottomDrawer />
      {winLuckySymbolVideo && (
        <WinLuckySymbolView
          videoRef={luckySymbolVideoRef}
          onSkipClicked={handleWinLuckySymbolVideoScreenClick}
          onVideoEnd={handleLuckySymbolWonVideoEnd}
        />
      )}
      {collectLuckySymbolVideo && (
        <LuckySymbolCollect
          nextCard={nextCard}
          setReset={setReset}
          onComplete={handleLuckySymbolCollectComplete}
          setLuckySymbolCount={setLuckySymbolCount}
          setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
        />
      )}
      {(!gameStarted || !countDownStarted) && (
        <InitialCountDownView
          countDownLottieRef={countDownLottieRef}
          onCountDownComplete={handleCountdownFinish}
        />
      )}
      {introThemeVideo && (
        <IntroThemeVideo handleVideoEnd={handleVideoIntroEnd} />
      )}
    </View>
  );
};

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
        top: 60,
        left: 0,
        right: 0,
        bottom: 60,
        display: "flex",
        justifyContent: "center",
      },
      default: StyleSheet.absoluteFillObject,
    }),
    flexDirection: "row",
  },
  background: {
    margin: "auto",
  },
  imageBackground: {
    paddingTop: 32,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: Colors.jokerGold600,
    backgroundColor: Colors.jokerBlack800,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
});

export default ScratchLuckyGame;
