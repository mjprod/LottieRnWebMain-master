import React, { useEffect, useRef, useState } from "react";
import { Animated, Linking, ScrollView, StyleSheet, Text} from "react-native";
import { ActivityIndicator, Image, View } from "react-native-web";
import { useNavigate, useParams } from "react-router";
import ProfileHeader from "../components/ProfileHeader";
import { useSnackbar } from "../components/SnackbarContext";
import useApiRequest from "../hook/useApiRequest";
import QuestionOfTheDay from "../components/QuestionOfTheDay";
import DailyCardsContainer from "../components/DailyCardsContainer";

const DailyScreen = () => {
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

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { loading, error, response, fetchUserDetails } = useApiRequest();
  const { showSnackbar } = useSnackbar();

  const { id, username, email } = useParams();

  useEffect(() => {
    console.log("Params:", { id, username, email });
  }, [id]);

  const handleStartGame = () => {
    if (initialUserData.name === undefined || initialUserData.name === "") {
      showSnackbar("Please complete your profile to play the game");
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
    if (response) {
      if (response.user) {
        setInitialScore(response.user.total_score || 0);
        setInitialTicketCount(response.user.ticket_balance || 0);
        setInitialLuckySymbolCount(response.user.lucky_symbol_balance || 0);
        setInitialScratchCardLeft(response.user.card_balance || 0);
        setInitialUserData(response.user);
      }
      if (response.daily === null || response.daily.length === 0) {
        // response.daily is exactly null, handle accordingly
        console.log("response.daily is null");
      } else {
        console.log("response.daily is not null");
        // response.daily is not null (it could be an empty array or have values)
        // setDailyData(response.daily);
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: logo,
          }}
        />
        {loading ? <LoadingView /> :
          <ProfileHeader id={initialUserData.user_id} name={initialUserData.name}></ProfileHeader>
        }
      </View>
      <View style={[styles.container, { marginLeft: 25, marginRight: 30, marginBottom: 10 }]}>
        <QuestionOfTheDay question={"What sports are you interested in?"}></QuestionOfTheDay>
        <DailyCardsContainer />
      </View>

    </ScrollView>
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

export default DailyScreen;
