import React, { useEffect, useRef, useState } from "react";
import { Animated, Linking, Platform, StyleSheet } from "react-native";
import { ActivityIndicator, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native-web";
import { useLocation, useNavigate } from "react-router-native";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import useApiRequest from "../hook/useApiRequest";
import GameButton from "./GameButton";
import RotatingCirclesBackground from "./RotatingCirclesBackground";
import { useSnackbar } from "./SnackbarContext";

const LauchScreen = () => {
  const navigate = useNavigate();

  const logo = require("./../assets/image/turbo_scratch_logo.png");
  const luckySymbol = require("./../assets/image/lucky_coin.png");

  const icon_next_card = require("./../assets/image/icon_left_card.png");
  const backgroundTotalTicket = require("./../assets/image/icon_ticket.png");
  const backgroundResult = require("./../assets/image/background_game.png");

  const [progress, setProgress] = useState();
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const [initialScore, setInitialScore] = useState(0);
  const [initialTicketCount, setInitialTicketCount] = useState(0);
  const [initialLuckySymbolCount, setInitialLuckySymbolCount] = useState(0);
  const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);

  const [initialUserData, setInitialUserData] = useState("");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { loading, error, response, fetchUserDetails } = useApiRequest();
  const { showSnackbar } = useSnackbar();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const username = queryParams.get('username');

  useEffect(() => {
    if (id && username) {
      showSnackbar(`ID: ${id}, Username: ${username}`);

    }
  }, [id, username]);

  const handleStartGame = () => {
    if (initialUserData.full_name === undefined || initialUserData.full_name === "") {
      showSnackbar("Please complete your profile to play the game");
      fetchUserDetails();
      return;

    }
    navigate("/game", {
      state: {
        initialScore,
        initialTicketCount,
        initialLuckySymbolCount,
        initialScratchCardLeft,
      },
    });
  };

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

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (response && response.user) {
      setInitialScore(response.user.total_score || 0);
      setInitialTicketCount(response.user.ticket_balance || 0);
      setInitialLuckySymbolCount(response.user.lucky_symbol_balance || 0);
      setInitialScratchCardLeft(response.user.card_balance || 0);
      setInitialUserData(response.user);
    }
  }, [response]);

  useEffect(() => {
    //console.log("Score: ", initialScore);
    setProgress(initialScore);

    Animated.timing(animatedProgress, {
      toValue: initialScore,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [initialScore]);

  useEffect(() => {
    console.log("Error: ", error);
    if (error && error.length > 0) {
      showSnackbar(error);
    }
  }, [error]);

  // Update the state to reflect the animated value (for Slider to work properly)
  animatedProgress.addListener(({ value }) => {
    if (value > 0) {
      setProgress(value);
    }
    //setProgress(value); // Sync the animated value with the slider's progress
  });

  const handlePress = () => {
    Linking.openURL("https://www.google.com"); // This opens Google in the default browser
  };

  const LoadingView = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  };

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
        <View style={[styles.container, { margin: 18 }]}>
          <View style={styles.header}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: logo,
              }}
            />

            <Text style={styles.title}>Welcome</Text>
          </View>

          <View>
            {loading ? <LoadingView /> :
              <Text style={styles.subtitle}>{initialUserData.full_name || ""}</Text>
            }
          </View>

          <View style={styles.horizontalDivider} />

          <Text
            style={[
              styles.subtitle,
              { textTransform: "uppercase", marginBottom: 10 },
            ]}
          >
            total game status
          </Text>

          <View style={styles.resultRow}>
            <View style={styles.resultCard}>
              <View style={styles.viewRow}>
                <IconStarResultScreen />
                <Text style={styles.resultTitle}>TOTAL POINTS</Text>
              </View>
              {loading ? <LoadingView /> :
                <Text style={styles.resultPoints}>{initialScore || 0}</Text>
              }
            </View>

            <View style={{ width: 10 }} />

            <View style={styles.resultCard}>
              <View style={styles.viewRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={{
                    uri: luckySymbol,
                  }}
                />

                <Text style={styles.resultTitle}>Lucky Symbols</Text>
              </View>
              {loading ? <LoadingView /> :
                <Text style={styles.resultPoints}>{initialLuckySymbolCount || 0}</Text>
              }
            </View>
          </View>

          <View style={{ height: 10 }} />
          <View style={styles.resultRow}>
            <View style={styles.resultCard}>
              <View style={styles.viewRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={{
                    uri: backgroundTotalTicket,
                  }}
                />
                <Text style={styles.resultTitle}>Tickets Total</Text>
              </View>
              {loading ? <LoadingView /> :
                <Text style={styles.resultPoints}>{initialTicketCount || 0}</Text>
              }
            </View>

            <View style={{ width: 10 }} />

            <View style={styles.resultCard}>
              <View style={styles.viewRow}>
                <Image
                  style={{ width: 20, height: 20 }}
                  source={{
                    uri: icon_next_card,
                  }}
                />
                <Text style={styles.resultTitle}>Cards Total</Text>
              </View>
              {loading ? <LoadingView /> :
                <Text style={styles.resultPoints}>{initialScratchCardLeft || 0}</Text>
              }
            </View>
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

          <View style={styles.buttonWrapper}>
            <GameButton text="Play Game" onPress={() => handleStartGame()} />
          </View>

          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>
              How To Play Turbo Scratch {">"}
            </Text>
          </TouchableOpacity>
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
    margin: 10,
    //width: "85%",
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
    fontSize: 22,
  },
  subtitle: {
    color: "#FFFFFF",
    fontFamily: "Teko-Medium",
    fontSize: 22,
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
  tinyLogo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    width: "98%", // takes up 90% of the screen width
    marginHorizontal: "1%", // centers it horizontally
    marginVertical: 10, // optional vertical margin
  },

  buttonWrapper: {
    width: "100%", // Ensure button spans the full width of its container
    alignItems: "center", // Center the button horizontally
    marginTop: 20, // Optional spacing above the button
  },
  buttonText: {
    fontFamily: "Inter-Regular",
    fontWeight: 500,
    fontSize: 18,
    color: "#A6A6A6", // Adjusted to match the lighter gray color
    textDecorationLine: "underline", // This will underline the text
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default LauchScreen;
