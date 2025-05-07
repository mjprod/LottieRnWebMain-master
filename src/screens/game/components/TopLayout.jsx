import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LottieView from "react-native-web-lottie";
import { useGame } from "../../../context/GameContext";
import { useTheme } from "../../../hook/useTheme";
import NumberTicker from "./NumberTicker";
import AssetPack from "../../../util/AssetsPack";
import useComboSounds from "../../../hook/useComboSounds";
import { Colors, Fonts } from "../../../util/constants";
import Svg, { Path } from "react-native-svg-web";
import LuckySymbolsSlot from "../../../components/LuckySymbolsSlot";
import CircularProgress from "../../../components/CircularProgress";

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

const TopLayout = ({ clickCount, countdownTimer }) => {
  const { score, scratchStarted } = useGame();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { gameCenterIcon } = useTheme();

  const [animationIndex, setAnimationIndex] = useState(0);
  const [playAnimation, setPlayAnimation] = useState(false);
  const animations = [
    AssetPack.lotties.COMBO_2X,
    AssetPack.lotties.COMBO_3X,
    AssetPack.lotties.COMBO_4X,
  ];

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

  const getBackground = (value, scratchStarted) => {
    if (scratchStarted) {
      if (value >= 1 && value <= 2) {
        return { backgroundColor: Colors.jokerRed400 };
      } else if (value >= 3 && value <= 6) {
        return { backgroundColor: Colors.jokerHoney400 };
      } else if (value >= 7 && value <= 10) {
        return { backgroundColor: Colors.jokerGreen400 };
      } else {
        return { backgroundColor: Colors.jokerBlack300 };
      }
    } else {
      return { backgroundColor: Colors.jokerBlack300 };
    }
  };

  const backgroundSource = useMemo(() => getBackground(countdownTimer, scratchStarted), [countdownTimer, scratchStarted]);

  return (
    <View style={{ marginBottom: -30 }} >
      <View style={styles.mainWrapper}>
        <View style={styles.textContainer}>
          <View style={styles.leftContiner}>
            <View style={styles.topTag}>
              <Svg width="155" height="40" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0 }}>
                <Path d="M141.818 0L7.27631 0C3.25771 0 0 3.25772 0 7.27632V40H155L141.818 0Z" fill="#262626" />
              </Svg>
              <Text style={styles.textTopLeft}>
                POP POINTS COUNTDOWN
              </Text>
            </View>
            <View style={[styles.rowCountDown, backgroundSource]}>
              {scratchStarted && (
                <>
                  <CircularProgress countdownTimer={countdownTimer} />
                  <Animated.View
                    style={{ transform: [{ scale: scaleAnim }] }}>
                    <Text style={styles.countDownText}>
                      {countdownTimer * 100}
                    </Text>
                    <Text style={styles.pointValue}>
                      Point value
                    </Text>
                  </Animated.View>
                </>
              )}
            </View>
            <View style={styles.numberTickerContainer}>
              <NumberTicker number={score} duration={500} textSize={18} />
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.topTag}>
              <Svg width="155" height="40" viewBox="0 0 155 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, right: 0, transform: [{ scaleX: -1 }] }}>
                <Path d="M141.818 0L7.27631 0C3.25771 0 0 3.25772 0 7.27632V40H155L141.818 0Z" fill="#262626" />
              </Svg>
              <View style={styles.topRightTextContainer}>
                <Image
                  style={{ width: 14, height: 14, marginTop: 2 }}
                  source={AssetPack.icons.LUCKY_SYMBOL} />
                <Text style={styles.textTopRight}>LUCKY SYMBOL</Text>
              </View>
            </View>
            <View style={styles.rowLuckySymbol}>
              <LuckySymbolsSlot />
            </View>
            <View style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 16,
              paddingTop: 8,
            }}>
              <Text style={styles.textBottomRight}>3x Symbols = 12x</Text>
              <Image
                style={{ marginLeft: 3, width: 18, height: 14 }}
                source={AssetPack.icons.CARDS}
              />
            </View>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    width: "100%",
    height: 104,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContiner: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
  },
  topTag: {
    width: "100%",
    marginBottom: -8,
    height: 40,
  },
  textTopLeft: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 14,
    color: Colors.jokerGreen400,
    textAlign: "left",
    userSelect: "none",
    width: "100%",
    paddingTop: 8,
    paddingBottom: 20,
    paddingLeft: 16,
  },
  textTopRight: {
    userSelect: "none",
    color: Colors.jokerWhite50,
    fontFamily: Fonts.TekoMedium,
    fontSize: 15,
    marginTop: 4,
    marginLeft: 6,
  },
  rightContainer: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-end",
    userSelect: "none",
    width: "50%",
  },
  topRightTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: Fonts.TekoMedium,
    fontSize: 14,
    color: Colors.jokerGreen400,
    userSelect: "none",
    width: "100%",
    marginTop: 2,
    paddingBottom: 20,
    paddingRight: 16,
  },
  textBottomRight: {
    userSelect: "none",
    color: Colors.jokerGold400,
    textAlign: "right",
    fontFamily: Fonts.InterSemiBold,
    fontSize: 12,
  },
  numberTickerContainer: {
    userSelect: "none",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  rowCountDown: {
    paddingHorizontal: 20,
    borderColor: Colors.jokerBlack200,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    height: 50,
  },
  rowLuckySymbol: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderColor: Colors.jokerBlack200,
    borderWidth: 1,
    borderTopRightRadius: 8,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "start",
    height: 50,
    backgroundColor: Colors.jokerBlack300,
  },
  countDownText: {
    userSelect: "none",
    fontFamily: Fonts.TekoMedium,
    fontSize: 25,
    lineHeight: 25,
    marginBottom: -5,
  },
  pointValue: {
    userSelect: "none",
    fontFamily: Fonts.InterSemiBold,
    fontSize: 12,
  },
  centralImage: {
    marginTop: -100,
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
