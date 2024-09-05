import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
} from "react-native";

import LottieView from "react-native-web-lottie";

import {
  gameCenterIcon,
  } from '../global/Assets';

const backgroundTopLayout = require("./../assets/image/background_top_layout.png");
const imageLuckySymbol = require("./../assets/image/icon_lucky_symbol.png");
const imageTicket = require("./../assets/image/icon_ticket.png");
const lottieCountDownBonus = require("../assets/lotties/lottieCountdownBonus.json");
const backgroundScratchTop = require("../assets/image/background_scratch_top.png");

const countdown = 3;
const showCountDown = true;

const TopLayout = ({
  scratched,
  //bonusValue,
  //countdown,
  //luckySymbolCount,
  //style,
  //setShowModalSetting,
}) => {
  const bounceAnim = new Animated.Value(1).current;
  const fadeAnim = new Animated.Value(1).current;
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

  return (
    <View style={{ marginTop: -25 }}>
      <ImageBackground
        source={backgroundTopLayout}
        resizeMode="contain"
        style={styles.image_top}
      >
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.textTopLeft}>POP POINTS COUNTDOWN</Text>
            {/*scratched && !showCountDown && (
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
              )*/}
            {!showCountDown && (
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
                    // { color: getTextColor(countdown) },
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
                style={{ width: 12, height: 12, marginBottom: 4 }}
                source={imageLuckySymbol}
              />
              <Text style={styles.textTopRight}>LUCKY SYMBOL</Text>
            </View>
            {/*LottieLuckySymbolCoinSlot({luckySymbolCount})*/}
          </View>
        </View>

       
          <Image style={styles.centralImage} source={gameCenterIcon} />
     

      </ImageBackground>
      <View style={styles.containerBottom}>
        <View style={styles.textWrapper}>
          {
            <Animated.Text
              style={[
                styles.textBottomLeft,
                { transform: [{ translateX: bounceAnim }] },
                { opacity: fadeAnim },
              ]}
            >
              You’re Doing Great!
            </Animated.Text>
          }
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
    alignItems: 'center', // Center the child horizontally
    justifyContent: 'center',     // Ensure it stays above other elements
  },
});

export default TopLayout;
