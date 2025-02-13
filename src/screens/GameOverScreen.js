import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "react-native-web";
import { useNavigate } from "react-router";
import { IconFourLeafClover } from "../assets/icons/IconFourLeafClover";
import { IconJokerPlus } from "../assets/icons/IconJokerPlus";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import LottieTicketSlot from "../components/LottieTicketSlot";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import { useSound } from "../hook/useSoundPlayer";

const GameOverScreen = () => {
  const navigate = useNavigate();

  const { switchTrack } = useSound();

  const backgroundResult = require("./../assets/image/background_game.png");
  const backgroundLuckySymbol = require("./../assets/image/background_result_lucky_symbol.png");
  const backgroundTotalTicket = require("./../assets/image/background_total_ticket.png");

  const [progress, setProgress] = useState(12456);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const animatedProgress = useRef(new Animated.Value(0)).current;

  //const location = useLocation();
  ///const {
  //ticketCount = 0, // default value if not provided
  //} = location.state || {};

  useEffect(() => {
    // Start the animation when the component mounts
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    switchTrack(1);
  }, []);

  // Update the state to reflect the animated value (for Slider to work properly)
  animatedProgress.addListener(({ value }) => {
    setProgress(value); // Sync the animated value with the slider's progress
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMondayNineAM = new Date();

      // Calculate next Monday
      const dayOfWeek = now.getDay();
      const daysUntilNextMonday = (8 - dayOfWeek) % 7; // 0 if today is Monday, else days until next Monday

      // Set the time to 9 AM
      nextMondayNineAM.setDate(now.getDate() + daysUntilNextMonday);
      nextMondayNineAM.setHours(9, 0, 0, 0); // Set to 9:00:00 AM

      // If today is Monday but it's after 9 AM, set to the next Monday
      if (dayOfWeek === 1 && now > nextMondayNineAM) {
        nextMondayNineAM.setDate(nextMondayNineAM.getDate() + 7);
      }

      const difference = nextMondayNineAM - now;

      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setTimeLeft(timeLeft);
    };

    // Update the countdown every second
    const intervalId = setInterval(calculateTimeLeft, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundResult}
        style={styles.imageBackground}
      >
        <View style={styles.rotatingBackgroundContainer}>
          <RotatingCirclesBackground />
        </View>

        <View style={styles.container}>
          <View style={styles.margim}>
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <IconJokerPlus />
              </View>
              <Text style={styles.title}>TURBO SCRATCH RESULTS</Text>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultCard}>
                <View style={styles.viewRow}>
                  <IconStarResultScreen />
                  <Text style={styles.resultTitle}>TOTAL POINTS</Text>
                </View>
                <Text style={styles.resultPoints}>+9999</Text>
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.resultCard}>
                <View style={styles.viewRow}>
                  <IconFourLeafClover />
                  <Text style={styles.resultTitle}>LUCKY SYMBOLS</Text>
                </View>

                <ImageBackground
                  resizeMode="contain"
                  source={backgroundLuckySymbol}
                  style={styles.imageBackgroundLuckySymbol}
                >
                  <LottieLuckySymbolCoinSlot topLayout={false} />
                </ImageBackground>
                <View style={styles.luckySymbols}></View>
              </View>
            </View>

            {/* Total Tickets Earned Section */}
            <View style={styles.ticketsSection}>
              <ImageBackground
                resizeMode="contain"
                source={backgroundTotalTicket}
                style={styles.imageBackgroundLuckySymbol}
              >
                <LottieTicketSlot />
              </ImageBackground>
              <Text style={styles.ticketTitle}>TOTAL TICKETS EARNED</Text>
              <View
                style={{
                  backgroundColor: "#4B595D",
                  height: 1,
                  width: "100%",
                  marginVertical: 10,
                }}
              />
              <View style={styles.containerTotalTicket}>
                <Text style={styles.nextTicketText}>Next Ticket</Text>
                <Text style={styles.ticketProgress}>12456 / 20000</Text>
              </View>

              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={20000}
                  value={progress}
                  onValueChange={(value) => setProgress(value)}
                  minimumTrackTintColor="#FFD89D" // Custom color for the filled track
                  maximumTrackTintColor="#000000" // Custom color for the unfilled track
                  thumbTintColor="#FFD89D" // Custom color for the thumb
                  thumbStyle={styles.thumb} // Style for the thumb
                />
              </View>

              <Text style={styles.addedPoints}>+9999</Text>
            </View>

            {/* Timer Section */}
            <View style={styles.timerSection}>
              <View style={styles.backgroundRounded}>
                <Text style={styles.timerTitle}>Time till Next Draw</Text>
              </View>
              <Text style={styles.timerContainer}>
                <Text style={styles.timerNumberValue}>{timeLeft.days}</Text>
                <Text style={styles.timerStringValue}> Days </Text>
                <Text style={styles.timerNumberValue}>{timeLeft.hours}</Text>
                <Text style={styles.timerStringValue}> Hrs </Text>
                <Text style={styles.timerNumberValue}>{timeLeft.minutes}</Text>
                <Text style={styles.timerStringValue}> Mins </Text>
                <Text style={styles.timerNumberValue}>{timeLeft.seconds}</Text>
                <Text style={styles.timerStringValue}> Secs</Text>
              </Text>
            </View>
            <GameButton
              text="BACK HOME"
              onPress={() => {
                const initialScore = 0; // Define the initialScore variable
                const initialTicketCount = 0; // Define the initialTicketCount variable
                const initialLuckySymbolCount = 0; // Define the initialLuckySymbolCount variable
                const initialScratchCardLeft = 0; // Define the initialScratchCardLeft variable

                navigate("/*", {
                  state: {
                    initialScore,
                    initialTicketCount,
                    initialLuckySymbolCount,
                    initialScratchCardLeft,
                  },
                });
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  margim: {
    marginTop: 10,
    width: "85%",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "0%",
  },
  imageBackgroundLuckySymbol: {
    width: 100,
    height: 45,
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  title: {
    color: "#FFDEA8",
    fontFamily: "Teko-Medium",
    fontSize: 32,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  resultCard: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
    padding: 8,
  },
  backgroundRounded: {
    backgroundColor: "#1D1811",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginBottom: 10,
    border: "1px solid #382E23",
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: "Teko-Medium",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 3,
  },
  resultPoints: {
    fontFamily: "Teko-Medium",
    fontSize: 30,
    color: "#00ff00",
  },
  luckySymbols: {
    flexDirection: "row",
  },
  symbolImage: {
    width: 50,
    height: 50,
  },
  ticketsSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ticketTitle: {
    fontFamily: "Teko-Medium",
    fontSize: 18,
    color: "#fff",
  },
  nextTicketText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  ticketProgress: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  addedPoints: {
    width: "100%",
    fontFamily: "Teko-Medium",
    fontSize: 22,
    color: "#00ff00",
    textAlign: "end",
  },
  timerSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerTitle: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#FFDEA8",
  },
  timerNumberValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#fff",
  },
  timerStringValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#A6A6A6",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textColumnRigth: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  containerTotalTicket: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  slider: {
    height: 1,
    maxHeight: 1,
    transform: [{ scaleY: 4, scaleX: 4 }],
    zIndex: 999,
    elevation: 10,
  },
  thumb: {
    width: 0,
    height: 0,
  },
  sliderContainer: {
    width: "100%",
    //height: 20,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rotatingBackgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default GameOverScreen;
