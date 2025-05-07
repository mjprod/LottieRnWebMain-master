import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet } from "react-native";
import { View } from "react-native-web";
import LottieView from "react-native-web-lottie";
import { useLocation } from "react-router-dom";
import DailyCardsContainer from "./components/DailyCardsContainer";
import NextDrawCard from "../../components/NextDrawCard";
import QuestionOfTheDay from "./components/QuestionOfTheDay";
import { useSnackbar } from "../../components/SnackbarContext";
import { DailySetData } from "../../data/DailyCardData";
import useApiRequest from "../../hook/useApiRequest";
import useAppNavigation from "../../hook/useAppNavigation";
import AssetPack from "../../util/AssetsPack";
import { DailyCardStatus, Dimentions, Colors } from "../../util/constants";
import { convertUTCToLocal, getCurrentDate, getDayOfWeek } from "../../util/Helpers";
import { isValidAnswer } from "../../util/Validator";
import TopNavScreenTemplate from "../../templates/TopNavTemplate";
import LoadingView from "../../components/LoadingView";
import { useGame } from "../../context/GameContext";

const DailyScreen = () => {
  const appNavigation = useAppNavigation();

  const [question, setQuestion] = useState("");
  const [isThumbsUpAnimationFinished, setIsThumbsUpAnimationFinished] =
    useState(false);

  const slideAnim = useRef(new Animated.Value(270)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slideOutAndFade = useCallback(() => {
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
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const { user, setUser } = useGame();

  const [currentWeek, setCurrentWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [days, setDays] = useState([]);

  const [dailySetData] = useState(DailySetData);
  const [noOfCardsInSet, setNumberOfCardsInSet] = useState(12);
  const [numberOfSetsToday, setNumberOfSetsToday] = useState(1);

  const {
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
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
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
            (item) => item.current_week === response.current_week,
          );
          if (currentWeekDaily) {
            setDays(currentWeekDaily.days.map((date) => convertUTCToLocal(date)));
          }
          setUser(response.user);
        };
      });
    }
  }, [location]);

  useEffect(() => {
    if (user && user.user_id && !isSubmitted) {
      getDailyQuestion(user.user_id, user.current_beta_block).then((response) => {
        if (response.question) {
          setQuestion(response);
        } else {
          appNavigation.goToNotFoundPage();
        }
      });
    }
  }, [user, isSubmitted]);

  useEffect(() => {
    setNumberOfCardsInSet(dailySetData.noOfCardsInSet);
    const cardsWon = dailySetData.weeklyRewards.find((cardSet) => cardSet.day === getDayOfWeek());
    if (cardsWon) {
      const { set } = cardsWon;
      setNumberOfSetsToday(set);
    }
  }, [dailySetData]);

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
      postDailyAnswer(user.user_id, question.question_id, answer, noOfCardsInSet * numberOfSetsToday, user.current_beta_block).then((response) => {
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
      appNavigation.goToStartPage(user.user_id, user.name, user.email);
    }
  };
  if (!user) {
    return <LoadingView />;
  }
  return (
    <TopNavScreenTemplate
      title={"Answer to unlock"}
      subtitle={"Your words hold the reward."}
      navBackgroudImage={AssetPack.backgrounds.TOP_NAV_DAILY}
      navBackgroudVideo={AssetPack.videos.TOP_NAV_DAILY}>
      <View style={[styles.container]}>
        {!isSubmitted && (
          <QuestionOfTheDay
            numberOfCardsInSet={noOfCardsInSet}
            numberOfSets={numberOfSetsToday}
            style={{ marginBottom: 48, marginLeft: Dimentions.pageMargin, marginRight: Dimentions.pageMargin }}
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
        <View style={styles.restContainer}>
          <DailyCardsContainer
            currentWeek={currentWeek}
            totalWeeks={totalWeeks}
            days={days}
            onCardPressed={handleCardPressed} />
          <NextDrawCard />
        </View>
      </View>
    </TopNavScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restContainer: {
    paddingHorizontal: 20,
    backgroundColor: Colors.jokerBlack800,
    borderColor: Colors.jokerBlack200,
    paddingTop: Dimentions.marginL,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopWidth: 1,
  },
});

export default DailyScreen;
