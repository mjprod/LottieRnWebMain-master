import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
import useTimer from "../../hook/useTimer.js";

const { width } = Dimensions.get("window");

const luckyCoinCollectSoundFile = require("./../../assets/audio/reward_pop.mp3");
const luckyCoinCollectSound = new Howl({ src: [luckyCoinCollectSoundFile] });

const luckyCoinWinSoundFile = require("./../../assets/audio/reward_quest.mp3");
const luckyCoinWinSound = new Howl({ src: [luckyCoinWinSoundFile] });

const ScratchLuckyGame = () => {
  const appNavigation = useAppNavigation();
  const location = useLocation();

  const countDownLottieRef = useRef(null);
  const luckySymbolVideoRef = useRef(null);
  const timerRefs = useRef({});

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
  const [comboPlayed, setComboPlayed] = useState(0);

  const { seconds: countdownTimer, startTimer, pauseTimer, resetTimer } = useTimer();

  const [nextCardAnimationFinished, setNextCardAnimationFinished] =
    useState(true);

  const {
    user,
    setUser,
    score,
    setScore,
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

  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const transalteAnim = useRef(new Animated.Value(0)).current;
  const hasTriggeredCardPlayed = useRef(false);

  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach(clearTimeout);
    };
  }, []);

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
      const timer = setTimeout(() => {
        if (countDownLottieRef.current != null) {
          countDownLottieRef.current.play();
        }
        setStartPlay(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countDownStarted, countDownLottieRef]);

  const saveLuckySymbol = useCallback(async (luckySymbol) => {
    setLuckySymbolCount(luckySymbol);
  }, [setLuckySymbolCount]);

  const handleGameOver = useCallback(() => {
    setGameOver(true);
    setNextCardAnimationFinished(true);
    setTimerGame(0);
    setScratchStarted(false);
    setComboPlayed(0);
    appNavigation.goToGameOverPage(user.user_id, user.name, user.email);
  }, [setGameOver, appNavigation, user]);

  const nextCard = useCallback(() => {
    setSkipToFinishLuckyVideo(false);
    setWinLuckySymbolVideo(false);
    setTimerGame(0);
    setScratchStarted(false);
    setComboPlayed(0);
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
  }, [luckySymbolCount, scratchCardLeft, currentTheme, nextTheme, handleGameOver]);

  const addLuckySymbol = useCallback(() => {
    if (luckySymbolCount > 2) {
      updateLuckySymbol(user.user_id, 0);
      saveLuckySymbol(0);
      nextCard();
    } else if (luckySymbolCount === 2) {
      saveLuckySymbol(luckySymbolCount + 1);
      clearTimeout(timerRefs.current.addLucky);
      timerRefs.current.addLucky = setTimeout(() => {
        decrementLuckySymbol(3);
      }, 300);
      updateLuckySymbol(user.user_id, 0);
    } else {
      saveLuckySymbol(luckySymbolCount + 1);
      updateLuckySymbol(user.user_id, luckySymbolCount + 1);
      nextCard();
    }
  }, [luckySymbolCount, user, saveLuckySymbol, nextCard, updateLuckySymbol]);

  const decrementLuckySymbol = useCallback((count, onComplete) => {
    luckyCoinCollectSound.play()
    if (count >= 0) {
      saveLuckySymbol(count);
      clearTimeout(timerRefs.current.decrement);
      timerRefs.current.decrement = setTimeout(() => {
        if (count === 0) {
          setCollectLuckySymbolVideo(true);
        } else {
          decrementLuckySymbol(count - 1, onComplete);
        }
      }, 200);
    }
  }, [saveLuckySymbol]);

  const handleLuckySymbolWonVideoEnd = useCallback(() => {
    setWinLuckySymbolVideo(false);
    addLuckySymbol();
    luckyCoinWinSound.play()
  }, [addLuckySymbol]);

  const handleVideoIntroEnd = useCallback(() => {
    setReset(true);
    setIntroThemeVideo(false);
  }, []);

  useEffect(() => {
    if (!scratchStarted) {
      hasTriggeredCardPlayed.current = false;
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }).start();
      return;
    }

    startTimer(10)

    if (!hasTriggeredCardPlayed.current) {
      hasTriggeredCardPlayed.current = true;
      updateCardPlayed(user.current_beta_block, user.user_id, gameId);
    }

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [scratchStarted]);

  useEffect(() => {
    setTimerGame(countdownTimer);
  }, [countdownTimer, setTimerGame]);

  useEffect(() => {
    if (reset) {
      setScratched(false)
      setNextCardAnimationFinished(false);
      updateScore(user.user_id, score, gameId, comboPlayed);
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: Platform.OS !== "web",
      }).start(() => {
        Animated.timing(transalteAnim, {
          toValue: -width * 1.1,
          duration: 500,
          useNativeDriver: Platform.OS !== "web",
        }).start(() => {
          resetTimer()
          clearTimeout(timerRefs.current.reset);
          timerRefs.current.reset = setTimeout(() => {
            if (scratchCardLeft - 1 > 0) {
              setScratchCardLeft(scratchCardLeft - 1);
            } else {
              handleGameOver();
            }
          }, 200);
          setNextCardAnimationFinished(true);
          goToNextTheme();
          Animated.spring(transalteAnim, {
            duration: 500,
            toValue: 0,
            friction: 7,
            tension: 50,
            useNativeDriver: Platform.OS !== "web",
          }).start();
        });
      });
      setReset(false);
    }
  }, [reset, setReset]);

  const handleCountdownFinish = useCallback(() => {
    setGameStarted(true);
  }, []);

  const handleLuckySymbolCollectComplete = useCallback(() => {
    if (user) {
      updateCardBalance(
        user.user_id,
        user.current_beta_block,
        BONUS_PACK_NUMBER_OF_CARDS
      );
    }
  }, [user, updateCardBalance]);

  const handleWinLuckySymbolVideoScreenClick = useCallback(() => {
    if (!skipToFinishLuckyVideo) {
      luckySymbolVideoRef.current.seekToTime(2);
    }
    setSkipToFinishLuckyVideo(true);
  }, [skipToFinishLuckyVideo]);

  const backGroundVideo = useMemo(() => backgroundLoop, [backgroundLoop]);

  const containerStyle = useMemo(
    () => [
      styles.fullScreen,
      { pointerEvents: nextCardAnimationFinished ? "auto" : "none" },
    ],
    [nextCardAnimationFinished]
  );

  const gameBackground = useMemo(() => (
    <BackgroundGame
      showAlphaView={scratchStarted}
      source={backGroundVideo}
    />
  ), [backGroundVideo, scratchStarted]);

  const handleBottomDrawerStateChange = (expanded) => {
    if (expanded) {
      pauseTimer()
    } else {
      startTimer()
    }
  }

  if (getGamesLoading || fetchUserDetailsLoading) return <LoadingView />;
  if (getGamesError || fetchUserDetailsError)
    return <p>Error: {getGamesError || fetchUserDetailsError}</p>;

  if (!user) return <LoadingView />

  return (
    <View style={containerStyle}>

      {gameBackground}
      <View style={styles.containerOverlay}>
        <Animated.View style={[styles.background, {
          transform: [
            { scale: scaleAnim },
            { translateX: transalteAnim },
          ],
        }]}>
          <TopLayout clickCount={clickCount} countdownTimer={countdownTimer} />
          <View style={styles.imageBackground}>
            <ScratchLayout
              key={user.user_id}
              reset={reset}
              scratched={scratched}
              setScratched={setScratched}
              luckySymbolCount={luckySymbolCount}
              setLuckySymbolCount={setLuckySymbolCount}
              setScratchStarted={setScratchStarted}
              scratchCardLeft={scratchCardLeft}
              timerGame={timerGame}
              pauseTimer={pauseTimer}
              setWinLuckySymbolVideo={setWinLuckySymbolVideo}
              setCollectLuckySymbolVideo={setCollectLuckySymbolVideo}
              clickCount={clickCount}
              setClickCount={setClickCount}
              nextCard={nextCard}
              maxCombinations={maxCombinations}
              hasLuckySymbol={hasLuckySymbol}
              setComboPlayed={setComboPlayed}
            />
          </View>
        </Animated.View>
      </View>
      <BottomDrawer onStateChanged={handleBottomDrawerStateChange} />
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
      {introThemeVideo && <IntroThemeVideo handleVideoEnd={handleVideoIntroEnd} />}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  containerOverlay: {
    position: "absolute",
    top: "20%",
    bottom: "20%",
    left: 0,
    right: 0,
  },
  background: {
    marginTop: -20,
    margin: "auto",
  },
  imageBackground: {
    zIndex: -1,
    flex: 1,
    height: "auto",
    paddingTop: 38,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderColor: Colors.jokerGold600,
    backgroundColor: Colors.jokerBlack800,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
});

export default React.memo(ScratchLuckyGame);