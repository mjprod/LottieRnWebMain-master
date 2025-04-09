import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native-web";

import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import GameButton from "../components/GameButton";
import GamesAvailableCard from "../components/ResourceTile";
import LeaderBoardList from "../components/LeaderBoardList";
import NextDrawCard from "../components/NextDrawCard";
import ProfileHeader from "../components/ProfileHeader";
import RaffleTicketCard from "../components/RaffleTicketCard";
import SectionTitle from "../components/SectionTitle";
import { useSnackbar } from "../components/SnackbarContext";
import StatCard from "../components/StatCard";
import { useGame } from "../context/GameContext";
import useApiRequest from "../hook/useApiRequest";
import useAppNavigation from "../hook/useAppNavigation";
import { Colors, Dimentions, GameStatus } from "../util/constants";
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
    loginError
  } = useApiRequest();

  const fetchAndProcessUserDetails = (userDetails) => {
    fetchUserDetails(userDetails.user_id, userDetails.name, userDetails.email).then((response) => {
      setUser(response.user);
      setLuckySymbolCount(response.user.lucky_symbol_balance);
      const gameStatus = response.user.time_result;

      if (gameStatus === GameStatus.drawing) {
        appNavigation.goToInProgressPage();
      } else if (gameStatus === GameStatus.check_winner) {
        getWinner().then((response) => {
          const winner = response.winner
          if (winner.user_id === user.user_id) {
            appNavigation.goToCongratulationsPage(InfoScreenContents.congratulations);
          } else {
            appNavigation.goToThankYouPage(InfoScreenContents.thank_you);
          }
        }).catch((error) => {
          console.error('Login failed:', error);
        });
      }

      const userData = response.user;
      const currentWeek = response.current_week;
      if (response.daily === null || response.daily.length === 0) {
        appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
      } else {
        const currentWeekDaily = response.daily.find(
          (item) => item.current_week === currentWeek
        );
        if (currentWeekDaily != null) {
          const localCurrentWeekDaily = currentWeekDaily.days.map((date) => convertUTCToLocal(date))
          const hasCurrentDate = localCurrentWeekDaily.some((item) =>
            item.includes(getCurrentDate())
          );
          if (!hasCurrentDate) {
            appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
          }
        } else {
          appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
        }
      }
    }).catch((error) => {
      console.error('User failed:', error);
    });
  }

  useEffect(() => {
    if (params.id && params.name && params.email) {
      login(params.id, params.name, params.email).then((data) => {
        fetchAndProcessUserDetails({ user_id: params.id, name: params.name, email: params.email })
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
          .then((data) => {
            fetchAndProcessUserDetails(authTokenData)
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
      showSnackbar("You don't have any cards left. Please wait till next day to play the game!")
    } else {
      appNavigation.goToStartPage(user.user_id, user.name, user.email);
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
    appNavigation.goToLeaderBoardPage(user.user_id, user.name, user.email)
  };

  if (user) {
    return (
      <TopNavTemplate title={"Scratch to win!"} subtitle={"Your next prize awaits."}>
        <ProfileHeader
          containerStyle={{ marginHorizontal: Dimentions.pageMargin, marginBottom: Dimentions.marginL }}
          id={user.user_id ? user.user_id : ""}
          name={user.name ?? ""} />
        <View style={styles.statisticsContainer}>
          <SectionTitle text={"Statistics"} style={{ marginBottom: 20 }} />
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
            onPress={() => handleStartGame()}
          />
          <LinkButton
            style={{ marginTop: 28 }}
            text={"How to play Turbo scratch"}
            handlePress={appNavigation.goToHowToPlayPage} />
        </View>
        <View style={styles.restContainer}>
          <SectionTitle
            text="LeaderBoard"
            viewAllText="View All"
            viewAllAction={handleViewAllPress}
            style={{ marginBottom: 20 }}
          />
          <LeaderBoardList numberOfItems={5} />
          <GamesAvailableCard
            style={{ marginVertical: Dimentions.marginL }}
            cardsLeft={user.card_balance}
          />
          <NextDrawCard />
          <Text style={styles.copyright}>Copyright ©2025 JokerPlus.{"\n"}
          All rights reserved.</Text>
        </View>
      </TopNavTemplate>
    );
  } else return (<LoadingView />);

};

const styles = StyleSheet.create({
  container: {
    marginVertical: Dimentions.marginL
  },
  statisticsContainer: {
    marginLeft: Dimentions.pageMargin,
    marginRight: Dimentions.pageMargin,
    marginBottom: Dimentions.marginXL,
  },
  restContainer: {
    paddingTop: Dimentions.sectionMargin,
    paddingHorizontal: Dimentions.pageMargin,
    paddingBottom: Dimentions.sectionMargin,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#131313",
    borderTopWidth: 1,
    borderColor: "#3D3D3D",
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
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  luckySymbols: {
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  copyright: {
    lineHeight: "150%",
    alignContent: "center",
    textAlign: "center",
    fontSize: 16,
    marginTop: Dimentions.marginL,
    marginBottom: Dimentions.marginL,
    color: Colors.jokerBlack200
  }
});

export default LauchScreenEncrypted;
