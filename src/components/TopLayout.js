import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
} from "react-native";
import LottieView from "react-native-web-lottie";
import { gameCenterIcon } from "../global/Assets";
import LottieLuckySymbolCoinSlot from './LottieLuckySymbolCoinSlot';

const backgroundTopLayout = require("./../assets/image/background_top_layout.png");
const backgroundTopLayoutRed = require("./../assets/image/background_top_layout_red.png");
const backgroundTopLayoutYellow = require("./../assets/image/background_top_layout_yellow.png");
const backgroundTopLayoutGreen = require("./../assets/image/background_top_layout_green.png");

const imageLuckySymbol = require("./../assets/image/icon_lucky_symbol.png");
const imageTicket = require("./../assets/image/icon_ticket.png");
const lottieCountDownBonus = require("../assets/lotties/lottieCountdownBonus.json");

const countdown = 3;
const showCountDown = true;

const TopLayout = ({
  scratched,
  scratchStarted,
  timerGame,
  setTimerGame,
  score,
  luckySymbolCount,
}) => {
  const bounceAnim = new Animated.Value(1).current;
  const fadeAnim = new Animated.Value(1).current;
  const scaleAnim = new Animated.Value(1.8).current;

  const [countdownTimer, setCountdownTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (scratchStarted) {
      setCountdownTimer(10);
      interval = setInterval(() => {
        setCountdownTimer((prevTimer) => {
          const newTime = prevTimer - 1;

          setTimerGame(newTime <= 0 ? 0 : newTime);

          if (newTime <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    else {
      setCountdownTimer(0);
    }

    return () => clearInterval(interval);
  }, [scratchStarted, setTimerGame]);


  const getBackground = (value) => {
    if (value >= 1 && value <= 2) {
      return backgroundTopLayoutRed;
    } else if (value >= 3 && value <= 4) {
      return backgroundTopLayoutYellow;
    } else if (value >= 5 && value <= 10) {
      return backgroundTopLayoutGreen;
    } else {
      return backgroundTopLayout;
    }
  };

  return (
    <View style={{ marginTop: -25 }}>
      <ImageBackground
        source={getBackground(countdownTimer)}
        resizeMode="contain"
        style={styles.image_top}
      >
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            {(
              <Text
                style={[
                  styles.textTopLeft,
                  { color: '#FFFFFF' },
                ]}
              >
                POP POINTS COUNTDOWN
              </Text>
            )}
            {scratchStarted && (
              <Animated.View
                style={[
                  styles.rowCountDown,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <Text
                  style={[
                    styles.countDownText,
                    { color:  '#FFFFFF' },
                  ]}
                >
                  {countdownTimer * 100} s
                </Text>
              </Animated.View>
            )}

            {!showCountDown && (
              <View style={styles.rowCountDown}>
                <LottieView
                  style={styles.lottieAnimation}
                  source={lottieCountDownBonus}
                  autoPlay
                  speed={1}
                  loop={false}
                />
                <Text style={[styles.countDownText]}>{countdown} s</Text>
              </View>
            )}
          </View>

          <View style={styles.textColumnRigth}>
            <View style={styles.viewRow}>
              <Image
                style={{ width: 12, height: 12, marginBottom: 4 }}
                source={imageLuckySymbol}
              />
              <Text style={styles.textTopRight}>LUCKY SYMBOL</Text>
            </View>
            {LottieLuckySymbolCoinSlot({luckySymbolCount})}
          </View>
        </View>

        <Image style={styles.centralImage} source={gameCenterIcon} />
      </ImageBackground>
      <View style={styles.containerBottom}>
        <View style={styles.textWrapper}>
          <Animated.Text
            style={[
              styles.textBottomLeft,
              { transform: [{ translateX: bounceAnim }] },
              { opacity: fadeAnim },
            ]}
          >
            {score > 0 ? `+${score}` : "0"}
          </Animated.Text>
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
            source={imageTicket}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image_top: {
    width: "100%",
    marginTop: "-10%",
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
  },
  textTopLeft: {
    color: "#43db47",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 15,
    marginBottom: 85,
  },
  textTopRight: {
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
    color: "#FFDFAC",
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 12,
  },
  textBottomLeft: {
    bottom: 45,
    left: 14,
    color: "#43db47",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 12,
  },
  lottieAnimation: {
    width: "40%",
    height: "40%",
  },
  rowCountDown: {
    position: "absolute",
    top: 18.5,
    left: -10,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  countDownText: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "blue",
    marginLeft: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  centralImage: {
    marginTop: -110,
    width: 100,
    height: 100,
    zIndex: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TopLayout;
