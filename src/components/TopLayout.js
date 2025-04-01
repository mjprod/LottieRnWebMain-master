import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LottieView from "react-native-web-lottie";
import { useGame } from "../context/GameContext";
import { useTheme } from "../hook/useTheme";
import LottieLuckySymbolCoinSlot from "./LottieLuckySymbolCoinSlot";
import NumberTicker from "./NumberTicker";
import AssetPack from "../util/AssetsPack";
import useComboSounds from "../hook/useComboSounds";

const CentralImageWithLottie = ({ gameCenterIcon, playAnimation, animationIndex, lottieRef, animations, onAnimationFinish }) => (
  <View style={styles.container}>
    <Image source={gameCenterIcon} style={styles.centralImage} />
    {playAnimation && (
      <LottieView
        ref={lottieRef}
        key={animationIndex}
        source={animations[animationIndex]}
        loop={false}
        autoPlay
        style={styles.lottie}
        onAnimationFinish={onAnimationFinish}
      />
    )}
  </View>
);

const TopLayout = ({ setTimerGame, clickCount }) => {
  const { score, luckySymbolCount, scratchStarted } = useGame();

  const scaleAnim = useRef(new Animated.Value(1.8)).current;
  const [countdownTimer, setCountdownTimer] = useState(0);
  const { gameCenterIcon } = useTheme();

  const [animationIndex, setAnimationIndex] = useState(0);
  const [playAnimation, setPlayAnimation] = useState(false);
  const animations = [AssetPack.lotties.COMBO_2X, AssetPack.lotties.COMBO_3X, AssetPack.lotties.COMBO_4X];

  const lottieRef = useRef(null);

  const { initializeComboSounds, playComboSound } = useComboSounds();

  useEffect(() => {
    initializeComboSounds();
  }, []);

  useEffect(() => {
    switch (clickCount) {
      case 6:
        setAnimationIndex(0);
        setPlayAnimation(true);
        playComboSound("x2");
        break;
      case 9:
        setAnimationIndex(1);
        setPlayAnimation(true);
        playComboSound("x3");
        break;
      case 12:
        setAnimationIndex(2);
        setPlayAnimation(true);
        playComboSound("x4");
        break;
      default:
        return;
    }

    if (lottieRef.current) {
      lottieRef.current.reset();
      lottieRef.current.play();
    }
  }, [clickCount]);

  useEffect(() => {
    if (scratchStarted) {
      setCountdownTimer(10);
      const intervalRef = setInterval(() => {
        setCountdownTimer((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(intervalRef);
          return 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef);
    } else {
      setCountdownTimer(0);
    }
  }, [scratchStarted]);

  useEffect(() => {
    setTimerGame(countdownTimer);
  }, [countdownTimer, setTimerGame]);

  const getBackground = (value) => {
    if (value >= 1 && value <= 2) {
      return AssetPack.backgrounds.GAME_TOP_LAYOUT_RED;
    } else if (value >= 3 && value <= 4) {
      return AssetPack.backgrounds.GAME_TOP_LAYOUT_YELLOW;
    } else if (value >= 5 && value <= 10) {
      return AssetPack.backgrounds.GAME_TOP_LAYOUT_GREEN;
    } else {
      return AssetPack.backgrounds.GAME_TOP_LAYOUT;
    }
  };

  const backgroundSource = useMemo(() => getBackground(countdownTimer), [countdownTimer]);

  return (
    <View style={{ marginTop: -25 }}>
      <ImageBackground
        source={backgroundSource}
        resizeMode="contain"
        style={styles.image_top}>
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={[styles.textTopLeft, { color: "#FFFFFF" }]}>
              POP POINTS COUNTDOWN
            </Text>

            {scratchStarted && (
              <View style={styles.rowCountDown}>
                <LottieView
                  style={styles.lottieAnimation}
                  source={AssetPack.lotties.COUNT_DOWN_BONUS}
                  autoPlay
                  speed={1}
                  loop={false}
                />
                <Animated.View
                  style={[{ transform: [{ scale: scaleAnim }] }]}>
                  <Text style={[styles.countDownText, { color: "#FFFFFF" }]}>
                    {countdownTimer * 100}
                  </Text>
                </Animated.View>
              </View>
            )}
          </View>

          <View style={styles.textColumnRigth}>
            <View style={styles.viewRow}>
              <Image
                style={{ width: 12, height: 12, marginBottom: 4 }}
                source={AssetPack.icons.LUCKY_SYMBOL}
              />
              <Text style={styles.textTopRight}>LUCKY SYMBOL</Text>
            </View>

            <LottieLuckySymbolCoinSlot
              luckySymbolCount={luckySymbolCount}
              topLayout={true}
            />
          </View>
        </View>
        <CentralImageWithLottie
          gameCenterIcon={gameCenterIcon}
          playAnimation={playAnimation}
          animationIndex={animationIndex}
          lottieRef={lottieRef}
          animations={animations}
          onAnimationFinish={() => setPlayAnimation(false)}
        />
      </ImageBackground>
      <View style={styles.containerBottom}>
        <View style={[styles.textWrapper, styles.textBottomLeft, { marginTop: -1 }]}>
          <NumberTicker number={score} duration={500} textSize={20} />
        </View>

        <View
          style={{
            flexDirection: "row",
            bottom: 45,
            right: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.textBottomRight}>3x Symbols = 1x</Text>
          <Image
            style={{ marginLeft: 3, width: 22, height: 22 }}
            source={AssetPack.icons.TICKET}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image_top: {
    width: "100%",
    marginTop: "-12%",
    marginBottom: "3%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 0,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  textColumn: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 45,
  },
  textColumnRigth: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 45,
    userSelect: "none",
  },
  textTopLeft: {
    userSelect: "none",
    color: "#43db47",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 15,
    marginBottom: 85,
  },
  textTopRight: {
    userSelect: "none",
    color: "white",
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 15,
    marginLeft: 26,
  },
  containerBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
  },
  textWrapper: {
    width: "50%",
  },
  textBottomRight: {
    userSelect: "none",
    color: "#FFDFAC",
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 12,
  },
  textBottomLeft: {
    userSelect: "none",
    bottom: 45,
    left: 14,
    color: "#43db47",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 12,
  },
  lottieAnimation: {
    width: "30%",
    height: "30%",
  },
  rowCountDown: {
    position: "absolute",
    top: 22,
    left: -10,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  countDownText: {
    userSelect: "none",
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "blue",
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  centralImage: {
    marginTop: -110,
    width: 100,
    height: 100,
    zIndex: 998,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    position: "absolute",
    width: 150,
    height: 150,
    zIndex: 999,
    left: -30,
    marginTop: -210,
  },
});

export default TopLayout;
