import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Linking, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native-web";
import LottieView from "react-native-web-lottie";
import { useNavigate, useParams } from "react-router";
import { IconFourLeafClover } from "../assets/icons/IconFourLeafClover";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import ProfileHeader from "../components/ProfileHeader";
import { useSnackbar } from "../components/SnackbarContext";
import useApiRequest from "../hook/useApiRequest";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import TimerComponent from "../components/TimerComponent";

const LauchScreen = () => {
  const navigate = useNavigate();

  const backgroundLuckySymbol = require("./../assets/image/background_result_lucky_symbol.png");
  const logo = require("./../assets/image/background_top_nav.png");

  const [progress, setProgress] = useState();
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const [initialScore, setInitialScore] = useState(0);
  const [initialTicketCount, setInitialTicketCount] = useState(0);
  const [initialLuckySymbolCount, setInitialLuckySymbolCount] = useState(0);
  const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);

  const [initialUserData, setInitialUserData] = useState("");

  const [timeLeft] = useTimeLeftForNextDraw();

  const { loading, error, response, fetchUserDetails } = useApiRequest();
  const { showSnackbar } = useSnackbar();

  const { id, username, email } = useParams();

  useEffect(() => {
    console.log("Params:", { id, username, email });
    fetchUserDetails(id, username, email);
  }, [id]);

  const handleStartGame = () => {
    if (initialUserData.name === undefined || initialUserData.name === "") {
      showSnackbar("Please complete your profile to play the game");
      fetchUserDetails(id, username, email);
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
    if (response) {
      if (response.user) {
        setInitialScore(response.user.total_score || 0);
        setInitialTicketCount(response.user.ticket_balance || 0);
        setInitialLuckySymbolCount(response.user.lucky_symbol_balance || 0);
        setInitialScratchCardLeft(response.user.card_balance || 0);
        setInitialUserData(response.user);
      }
      const userData = response.user
      if (response.daily === null || response.daily.length === 0) {
        console.log("response.daily is null");
        navigate("/daily", {
          state: {
            userData,
          },
        });
      } else {
        console.log("response.daily is not null");
        navigate("/daily", {
          state: {
            userData,
          },
        });
      }
    }
  }, [response]);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: initialScore,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    setProgress(initialScore);
  }, [initialScore]);

  useEffect(() => {
    console.log("Error: ", error);
    if (error && error.length > 0) {
      showSnackbar(error);
    }
  }, [error]);

  animatedProgress.addListener(({ value }) => {
    setProgress(value);
  });

  const handlePress = () => {
    Linking.openURL("https://www.google.com");
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
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: logo,
          }}
        />
        {loading ? (
          <LoadingView />
        ) : (
          <ProfileHeader
            id={initialUserData.user_id}
            name={initialUserData.name}
          ></ProfileHeader>
        )}
      </View>
      <View
        style={[
          styles.container,
          { marginLeft: 18, marginRight: 18, marginBottom: 10 },
        ]}
      >
        <Text
          style={[
            styles.subtitle,
            { textTransform: "uppercase", marginBottom: 10 },
          ]}
        >
          Statistics
        </Text>
        <View style={styles.resultRow}>
          <View style={styles.resultCard}>
            <View style={styles.viewRow}>
              <IconStarResultScreen />
              <Text style={styles.resultTitle}>TOTAL POINTS</Text>
            </View>
            {loading ? (
              <LoadingView />
            ) : (
              <Text style={styles.resultPoints}>{initialScore || 0}</Text>
            )}
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
          <View style={styles.containerTotalTicket}>
            <LottieView
              style={styles.lottieLuckyResultAnimation}
              source={require("../assets/lotties/lottieTicketEntry.json")}
              autoPlay
              speed={1}
              loop={false}
            />
            <Text style={styles.ticketTitle}>TOTAL RAFFLE TICKETS EARNED</Text>
            {loading ? (
              <LoadingView />
            ) : (
              <Text style={styles.resultPoints}>{initialTicketCount || 0}</Text>
            )}
          </View>
          <View
            style={{
              backgroundColor: "#4B595D",
              height: 1,
              width: "100%",
              marginVertical: 8,
            }}
          />
          <View style={styles.containerTotalTicket}>
            <Text style={styles.nextTicketText}>Next Ticket</Text>
            <Text style={styles.ticketProgress}>
              {`${parseInt(progress, 10)} / 20000`}{" "}
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={20000}
              value={progress}
              onValueChange={(value) => setProgress(value)}
              minimumTrackTintColor="#FFD89D"
              maximumTrackTintColor="#000000"
              thumbTintColor="#FFD89D"
              thumbStyle={styles.thumb}
            />
          </View>
        </View>

        <View style={{ height: 10 }} />
        <TimerComponent
          days={timeLeft.days}
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />

        <View style={styles.buttonWrapper}>
          <GameButton text="Play Game" onPress={() => handleStartGame()} />
        </View>

        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>How To Play Turbo Scratch {">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    //justifyContent: "top",
    //alignItems: "center",
    // marginVertical: 10,
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
    padding: 4,
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
    flex: 1,
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
    width: "100%",
    height: 144,
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
    marginVertical: 10,
  },
  lottieLuckyResultAnimation: {
    width: 25,
    height: 25,
    marginTop: 0,
    marginLeft: 0,
  },
});

export default LauchScreen;
