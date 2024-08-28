import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Platform,
  Animated,
  Dimensions,
  TouchableOpacity,
  Easing,
} from "react-native";

import LottieView from "react-native-web-lottie";

const backgroundTopLayout = require("./../assets/image/background_top_layout.png");
const imageLuckySymbol = require("./../assets/image/icon_lucky_symbol.png");
const lottieCountDownBonus = require("../assets/lotties/lottieCountdownBonus.json");
const scratched = true;
const bonusValue = 70;
const countdown = 3;
const luckySymbolCount = 3;
const showCountDown = true;
//const showModalSetting = true;

//type TopLayoutProps = {
//scratched: boolean;
//bonusValue: number;
//countdown: number;
//luckySymbolCount: number;
//style?: any;
//setShowModalSetting: (value: boolean) => void;
//};

const TopLayout = (
  {
    scratched,
    //bonusValue,
    //countdown,
    //luckySymbolCount,
    //style,
    //setShowModalSetting,
  }
) => {
  const bounceAnim = (new Animated.Value(1)).current;
  const fadeAnim = (new Animated.Value(1)).current;
  //const [animationFinished, setAnimationFinished] = useState(false);

  //const [showCountDown, setShowCountDown] = useState(false);
  //const scaleAnim = useRef(new Animated.Value(1.8)).current;

  const scaleAnim = new Animated.Value(1.8).current;

  /*
  useEffect(() => {
    let timer;
    if (scratched) {
     
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
      timer = setTimeout(() => {
        setShowCountDown(true);
      }, 1000);
    } else {
      setShowCountDown(false);
      scaleAnim.setValue(1.5);
    }
    return () => clearTimeout(timer);
  }, [scratched, scaleAnim]);
*/

  /*
  useEffect(() => {
    if (scratched) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 40,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      */
  //playSong(require('./../../assets/audio/sfx_count_down.aac'));
  /*
      const timer = setTimeout(() => {
        setAnimationFinished(true);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [scratched, bounceAnim, fadeAnim]);
  */

  const getTextAnimationColor = (value) => {
    switch (value) {
      case 50:
        return "#dc4445"; // Red
      case 70:
        return "#ddaa43"; // Yellow
      case 100:
        return "#43db47"; // Green
      default:
        return "#FFFFFF"; // Default to white if no match
    }
  };

  const getTextColor = (value) => {
    switch (value) {
      case 1:
        return "#dc4445"; // Red
      case 2:
        return "#ddaa43"; // Yellow
      case 3:
        return "#43db47"; // Green
      default:
        return "#dc4445"; // Default to white if no match
    }
  };

  return (
    <View style={{ marginTop: -25 }}>
      <ImageBackground
        source={backgroundTopLayout}
        resizeMode="contain"
        style={styles.image_top}
      >
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.textTopLeft}>BONUS TIMER</Text>
            {scratched && !showCountDown && (
              <Animated.View
                style={[
                  styles.rowCountDown,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <LottieView
                  style={styles.lottieAnimation}
                  source={lottieCountDownBonus}
                  autoPlay={false}
                  speed={0}
                  loop={false}
                />
                <Text
                  style={[styles.countDownText, { color: getTextColor(3) }]}
                >
                  {3} s
                </Text>
              </Animated.View>
            )}
            {showCountDown && (
              <View style={styles.rowCountDown}>
                <LottieView
                  style={styles.lottieAnimation}
                  source={lottieCountDownBonus}
                  autoPlay
                  speed={1}
                  loop={false}
                />
                <Text
                  style={[
                    styles.countDownText,
                    { color: getTextColor(countdown) },
                  ]}
                >
                  {countdown} s
                </Text>
              </View>
            )}
          </View>

          <View style={styles.textColumnRigth}>
            <View style={styles.viewRow}>
              <Image
                style={{ width: 15, height: 15 }}
                source={imageLuckySymbol}
              />
              <Text style={styles.textTopRight}>LUCKY SYMBOL</Text>
            </View>
            {/*LottieLuckySymbolCoinSlot({luckySymbolCount})*/}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerBottom}>
        <View style={styles.textWrapper}>
          {scratched && (
            <Animated.Text
              style={[
                styles.textBottomLeft,
                {transform: [{translateX: bounceAnim}]},
                {color: getTextAnimationColor(bonusValue)},
                {opacity: fadeAnim},
              ]}>
              BONUS +{bonusValue} JKC
            </Animated.Text>
            )}
        </View>
        <Text style={styles.textBottomRight}>FIND 3x TO WIN</Text>
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
    marginTop: "-15%",
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
    color: "white",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 12,
    marginBottom: 85,
  },
  textTopRight: {
    color: "white",
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 12,
    marginLeft: 15,
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
    bottom: 35,
    right: 10,
    color: "#FFDFAC",
    textAlign: "right",
    fontFamily: "Teko-Medium",
    fontSize: 12,
  },
  textBottomLeft: {
    bottom: 35,
    left: 10,
    color: "#FFDFAC",
    textAlign: "left",
    fontFamily: "Teko-Medium",
    fontSize: 18,
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
  
});

export default TopLayout;
