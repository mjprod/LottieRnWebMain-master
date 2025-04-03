import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, View } from "react-native-web";
import LottieView from "react-native-web-lottie";
import { useLocation } from "react-router-dom";
import DailyCardsContainer from "../components/DailyCardsContainer";
import GamesAvailableCard from "../components/GamesAvailableCard";
import LinkButton from "../components/LinkButton";
import NextDrawCard from "../components/NextDrawCard";
import ProfileHeader from "../components/ProfileHeader";
import QuestionOfTheDay from "../components/QuestionOfTheDay";
import { useSnackbar } from "../components/SnackbarContext";
import { DailySetData } from "../data/DailyCardData";
import useApiRequest from "../hook/useApiRequest";
import useAppNavigation from "../hook/useAppNavigation";
import AssetPack from "../util/AssetsPack";
import { DailyCardStatus, Dimentions } from "../util/constants";
import { convertUTCToLocal, getCurrentDate, } from "../util/Helpers";
import { isValidAnswer } from "../util/Validator";
import TopNavScreenTemplate from "../templates/TopNavTemplate";

const DailyScreen = () => {
  const appNavigation = useAppNavigation()

  const [question, setQuestion] = useState("");
  const [isThumbsUpAnimationFinished, setIsThumbsUpAnimationFinished] =
    useState(false);

  const slideAnim = useRef(new Animated.Value(270)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slideOutAndFade = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start(() => setIsThumbsUpAnimationFinished(true));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const [userData, setUserData] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [days, setDays] = useState([]);

  const [dailySetData] = useState(DailySetData);
  const [noOfCardsInSet, setNumberOfCardsInSet] = useState(12);
  const [numberOfSetsInCurrentWeek, setNumberOfSetsInCurrentWeek] = useState(1);

  const {
    getDailyQuestionLoading,
    postDailyAnswerLoading,
    fetchUserDetailsLoading,
    fetchUserDetails,
    fetchUserDetailsError,
    getDailyQuestion,
    getDailyQuestionError,
    postDailyAnswer,
    postDailyAnswerError,
  } = useApiRequest();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (days.includes(getCurrentDate())) {
      setIsSubmitted(true)
    } else {
      setIsSubmitted(false)
    }
  }, [days]);

  useEffect(() => {
    if (location.state !== null) {
      const id = location.state.user_id;
      const username = location.state.name;
      const email = location.state.email;

      fetchUserDetails(id, username, email).then((response) => {
        if (response.user) {
          setCurrentWeek(response.current_week);
          setTotalWeeks(response.total_weeks);
          const currentWeekDaily = response.daily.find(
            (item) => item.current_week === response.current_week
          );
          if (currentWeekDaily) {
            setDays(currentWeekDaily.days.map((date) => convertUTCToLocal(date)));
          }
          setUserData(response.user);
        };
      });
    }
  }, [location]);

  useEffect(() => {
    if (userData.user_id && !isSubmitted) {
      getDailyQuestion(userData.user_id).then((response) => {
        if (response.question) {
          setQuestion(response);
        }
      });
    }
  }, [userData, isSubmitted]);

  useEffect(() => {
    setNumberOfCardsInSet(dailySetData.noOfCardsInSet)
    const cardsWon = dailySetData.weeklyRewards.find((cardSet) => cardSet.week === currentWeek);
    if (cardsWon) {
      const { set } = cardsWon;
      setNumberOfSetsInCurrentWeek(set);
    }
  }, [dailySetData])

  useEffect(() => {
    if (getDailyQuestionError && getDailyQuestionError.length > 0) {
      showSnackbar(getDailyQuestionError);
    }
    if (postDailyAnswerError && postDailyAnswerError.length > 0) {
      showSnackbar(postDailyAnswerError);
    }
    if (fetchUserDetailsError && fetchUserDetailsError.length > 0) {
      showSnackbar(fetchUserDetailsError);
    }
  }, [getDailyQuestionError, postDailyAnswerError, fetchUserDetailsError]);

  const onSubmit = (answer) => {
    const { isValid, message } = isValidAnswer(answer);
    if (isValid) {
      postDailyAnswer(userData.user_id, question.question_id, answer, noOfCardsInSet * numberOfSetsInCurrentWeek, userData.current_beta_block).then((response) => {
        if (response.answer_id) {
          setIsSubmitted(true);
          setDays((prevDays) => [...prevDays, getCurrentDate()]);
        }
      }).catch((error) => {
        showSnackbar(error.message || "An error occurred while submitting the answer.");
      });;
    } else {
      showSnackbar(message);
    }
  };

  const handleThumbsUpAnimationFinish = () => {
    slideOutAndFade();
  };

  const handleCardPressed = (card) => {
    if (card.status === DailyCardStatus.active) {
      appNavigation.goToStartPage(userData.user_id, userData.name, userData.email)
    }
  }

  return (
    <TopNavScreenTemplate title={"Answer to unlock"} subtitle={"Your words hold the reward."} navBackgroudImage={AssetPack.backgrounds.TOP_NAV_DAILY}>
      <ProfileHeader
        containerStyle={{ marginHorizontal: Dimentions.pageMargin }}
        id={userData.user_id ? userData.user_id : ""}
        name={userData.name ?? ""}
      />
      <View style={[styles.container, { marginLeft: Dimentions.pageMargin, marginRight: Dimentions.pageMargin, marginBottom: Dimentions.sectionMargin, marginTop: Dimentions.sectionMargin }]}>
        {!isSubmitted && (
          <QuestionOfTheDay
            numberOfCardsInSet={noOfCardsInSet}
            numberOfSets={numberOfSetsInCurrentWeek}
            style={{ marginBottom: Dimentions.sectionMargin }}
            question={`${question.question}`}
            onSubmit={onSubmit} />
        )}
        {isSubmitted && !isThumbsUpAnimationFinished && (
          <Animated.View
            style={[styles.box, { opacity: fadeAnim, height: slideAnim }]}>
            <LottieView
              style={{
                width: 258,
                marginTop: -20,
                flex: 1,
                alignSelf: "center",
              }}
              source={AssetPack.lotties.THUMBS_UP}
              autoPlay
              speed={1}
              loop={false}
              onAnimationFinish={handleThumbsUpAnimationFinish} />
          </Animated.View>
        )}
        <DailyCardsContainer
          currentWeek={currentWeek}
          totalWeeks={totalWeeks}
          days={days}
          onCardPressed={handleCardPressed} />
        <LinkButton
          style={{ marginVertical: Dimentions.sectionMargin }}
          text={"How To Play Turbo Scratch >"}
          handlePress={appNavigation.goToHowToPlayPage} />
        <GamesAvailableCard
          style={{ marginVertical: 24 }}
          cardsLeft={userData.card_balance} />
        <NextDrawCard />
      </View>
    </TopNavScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
