import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native-web";

import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import NextDrawCard from "../components/NextDrawCard";
import RaffleTicketCard from "../components/RaffleTicketCard";
import SectionTitle from "../components/SectionTitle";
import { useSnackbar } from "../components/SnackbarContext";
import StatCard from "../components/StatCard";
import { useGame } from "../context/GameContext";
import useApiRequest from "../hook/useApiRequest";
import useAppNavigation from "../hook/useAppNavigation";
import { Colors, Dimentions, GameStatus, isProduction } from "../util/constants";
import { decrypt } from "../util/crypto";
import { convertUTCToLocal, getCurrentDate } from "../util/Helpers";
import { InfoScreenContents } from "./info/InfoScreen";
import LuckySymbolCard from "../components/LuckySymbolCard";
import LoadingView from "../components/LoadingView";
import TopNavTemplate from "../templates/TopNavTemplate";
import LinkButton from "../components/LinkButton";

const LauchScreenEncrypted = () => {
  const appNavigation = useAppNavigation();

  const { user, setUser, setLuckySymbolCount } = useGame();
  const { showSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const {
    fetchUserDetails,
    fetchUserDetailsError,
    getWinner,
    getWinnerError,
    login,
    loginError,
  } = useApiRequest();

  const fetchAndProcessUserDetails = (userDetails) => {
    fetchUserDetails(userDetails.user_id, userDetails.name, userDetails.email).then((userResponse) => {
      if (userResponse.user) {
        setUser(userResponse.user);
        setLuckySymbolCount(userResponse.user.lucky_symbol_balance);
        const gameStatus = userResponse.time_result;
        if (gameStatus === GameStatus.drawing) {
          appNavigation.goToInProgressPage();
        } else if (gameStatus === GameStatus.check_winner) {
          getWinner().then((response) => {
            const winner = response.winner;
            if (winner.user_id === userResponse.user.user_id) {
              appNavigation.goToCongratulationsPage(InfoScreenContents.congratulations);
            } else {
              appNavigation.goToThankYouPage(InfoScreenContents.thank_you);
            }
          }).catch((error) => {
            console.error('Login failed:', error);
          });
        } else {
          const userData = userResponse.user;
          const currentWeek = userResponse.current_week;
          if (userResponse.daily === null || userResponse.daily.length === 0) {
            appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
          } else {
            const currentWeekDaily = userResponse.daily.find(
              (item) => item.current_week === currentWeek,
            );
            if (currentWeekDaily !== null) {
              const localCurrentWeekDaily = currentWeekDaily.days.map((date) => convertUTCToLocal(date));
              const hasCurrentDate = localCurrentWeekDaily.some((item) =>
                item.includes(getCurrentDate()),
              );
              if (!hasCurrentDate) {
                appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
              }
            } else {
              appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
            }
          }
        }
      } else {
        appNavigation.goToNotFoundPage();
      }
    }).catch((error) => {
      console.error('User failed:', error);
    });
  };

  useEffect(() => {
    if (!isProduction && params.id && params.name && params.email) {
      login(params.id, params.name, params.email).then(() => {
        fetchAndProcessUserDetails({ user_id: params.id, name: params.name, email: params.email });
      }).catch((error) => {
        console.error('Login failed:', error);
      });
    } else if (searchParams.get('authToken')) {
      if (!user || user === null) {
        const authToken = searchParams.get('authToken');
        if (!authToken) {
          appNavigation.goToNotFoundPage();
          return;
        }
        const authTokenData = JSON.parse(decrypt(authToken, true));
        login(authTokenData.user_id, authTokenData.name, authTokenData.email)
          .then(() => {
            fetchAndProcessUserDetails(authTokenData);
          }).catch((error) => {
            console.error('Login failed:', error);
          });
      } else {
        fetchAndProcessUserDetails(user);
      }
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      if (!user || user === null) {
        appNavigation.goToNotFoundPage();
      } else {
        fetchAndProcessUserDetails(user);
      }
    }
  }, [params, searchParams]);

  const handleStartGame = () => {
    if (user.name === undefined || user.name === "") {
      showSnackbar("Please complete your profile to play the game");
      appNavigation.goToNotFoundPage();
      return;
    }
    if (user.card_balance <= 0) {
      showSnackbar("You don't have any cards left. Please wait till next day to play the game!");
    } else {
      appNavigation.goToGamePage(user.user_id, user.name, user.email);
    }
  };

  useEffect(() => {
    if (loginError && loginError.length > 0) {
      showSnackbar(loginError);
    }
    if (fetchUserDetailsError && fetchUserDetailsError.length > 0) {
      showSnackbar(fetchUserDetailsError);
    }
    if (getWinnerError && getWinnerError.length > 0) {
      showSnackbar(getWinnerError);
    }

  }, [loginError, fetchUserDetailsError, getWinnerError]);


  const handleViewAllPress = () => {
    appNavigation.goToLeaderBoardPage(user.user_id, user.name, user.email);
  };

  if (user) {
    return (
      <TopNavTemplate title={user.card_balance <= 0 ? "No Cards Available" : "Scratch to win!"} subtitle={user.card_balance <= 0 ? "New cards drop daily." : "Your next prize awaits."}>
        <View style={styles.statisticsContainer}>
          <SectionTitle text={"Game Summary"} style={{ marginBottom: 20 }} />
          <View style={styles.resultRow}>
            <StatCard
              title="Total points"
              stat={user.total_score}
            />
            <View style={{ width: 8 }} />
            <LuckySymbolCard />
          </View>
          <RaffleTicketCard containerStyle={{ marginTop: 8 }} score={user.total_score} ticketCount={user.ticket_balance} />
          <GameButton
            style={{ marginTop: Dimentions.marginL, width: "100%" }}
            text="Play Now"
            disabled={user.card_balance <= 0}
            onPress={() => handleStartGame()}
          />
          <LinkButton
            style={{ marginTop: 28, marginBottom: 48 }}
            text={"How to play Turbo scratch"}
            handlePress={appNavigation.goToHowToPlayPage} />
        </View>
        <View style={styles.restContainer}>
          <SectionTitle
            text="LeaderBoard"
            viewAllText="View All"
            viewAllAction={handleViewAllPress}
            style={{ marginBottom: 20 }} />
          <LeaderBoardList numberOfItems={5} style={{ marginBottom: 32 }} beta_block_id={user.current_beta_block} showPagination={false} />
          <NextDrawCard />
        </View>
      </TopNavTemplate>
    );
  } else { return (<LoadingView />); }

};

const styles = StyleSheet.create({
  statisticsContainer: {
    marginLeft: Dimentions.pageMargin,
    marginRight: Dimentions.pageMargin,
  },
  restContainer: {
    paddingTop: Dimentions.sectionMargin,
    paddingHorizontal: Dimentions.pageMargin,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#131313",
    borderTopWidth: 1,
    borderColor: Colors.jokerBlack200,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LauchScreenEncrypted;
