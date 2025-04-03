import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  View,
} from "react-native-web";

import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import GameButton from "../components/GameButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
import LeaderBoardList from "../components/LeaderBoardList";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import NextDrawCard from "../components/NextDrawCard";
import ProfileHeader from "../components/ProfileHeader";
import RaffleTicketCard from "../components/RaffleTicketCard";
import SectionTitle from "../components/SectionTitle";
import { useSnackbar } from "../components/SnackbarContext";
import StatCard from "../components/StatCard";
import TopBannerNav from "../components/TopBannerNav";
import { useGame } from "../context/GameContext";
import useApiRequest from "../hook/useApiRequest";
import useAppNavigation from "../hook/useAppNavigation";
import AssetPack from "../util/AssetsPack";
import { Colors, Dimentions, GameStatus } from "../util/constants";
import { decrypt } from "../util/crypto";
import { convertUTCToLocal, getCurrentDate } from "../util/Helpers";
import { InfoScreenContents } from "./info/InfoScreen";
import LuckySymbolCard from "../components/LuckySymbolCard";

const LauchScreenEncrypted = () => {
  const appNavigation = useAppNavigation();

  const { user, setUser, setLuckySymbolCount } = useGame();
  const [initialUserData, setInitialUserData] = useState(null);
  const { showSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const { fetchUserDetails, fetchUserDetailsLoading, fetchUserDetailsError,
    getWinner, getWinnerLoading, getWinnerError,
    login, loginLoading, loginError } = useApiRequest();

  useEffect(() => {
    if (params.id && params.name && params.email) {
      setInitialUserData({ user_id: params.id, name: params.name, email: params.email });
      login(params.id, params.name, params.email).then((data) => {
        //get the user details
        fetchUserDetails(params.id, params.name, params.email).then((response) => {
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
            })
              .catch((error) => {
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
        })
          .catch((error) => {
            console.error('User failed:', error);
          });
      })
        .catch((error) => {
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
        setInitialUserData(authTokenData);
        login(authTokenData.user_id, authTokenData.name, authTokenData.email)
          .then((data) => {
            console.log("Login response 2: ", data);
          })
          .catch((error) => {
            console.error('Login failed:', error);
          });
      } else {
        fetchUserDetails(user.user_id, user.name, user.email);
      }
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      if (!user || user === null) {
        appNavigation.goToNotFoundPage();
      } else {
        fetchUserDetails(user.user_id, user.name, user.email);
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

  const LoadingView = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  };

  const handleViewAllPress = () => {
    appNavigation.goToLeaderBoardPage(user.user_id, user.name, user.email)
  };

  if (user) {
    return (
      <ScrollView style={{ backgroundColor: Colors.background }}>
        <View style={styles.header}>
          <TopBannerNav />
          {
            fetchUserDetailsLoading ||
              loginLoading ||
              getWinnerLoading ? (
              <LoadingView />
            ) : (
              <ProfileHeader
                containerStyle={{ marginTop: -70, marginHorizontal: Dimentions.pageMargin }}
                id={user.user_id ? user.user_id : ""}
                name={user.name ?? ""}
              />
            )}
        </View>
        <View style={{ ...styles.container }}>
          <View
            style={{
              marginLeft: Dimentions.pageMargin,
              marginRight: Dimentions.pageMargin,
              marginBottom: Dimentions.sectionMargin,
              marginTop: Dimentions.sectionMargin,
            }}
          >
            <SectionTitle text={"Statistics"} />
            <View style={styles.resultRow}>
              <StatCard
                title="Total Points"
                stat={user.total_score}
              />
              <View style={{ width: 10 }} />
              <LuckySymbolCard />
            </View>
            <RaffleTicketCard containerStyle={{ marginTop: 8 }} score={user.total_score} ticketCount={user.ticket_balance} />
            <GameButton
              style={{ marginTop: Dimentions.marginL, width: "100%" }}
              text="Play Now"
              onPress={() => handleStartGame()}
            />
          </View>
          <View style={{
            paddingTop: Dimentions.sectionMargin,
            paddingHorizontal:
              Dimentions.pageMargin,
            paddingBottom: Dimentions.sectionMargin,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "#131313",
            borderTopWidth: 1,
            borderColor: "#3D3D3D",
          }}>
            <SectionTitle
              text="LeaderBard"
              viewAllText="View All"
              viewAllAction={handleViewAllPress}
            />
            <LeaderBoardList numberOfItems={5} />
            <GamesAvailableCard
              style={{ marginVertical: 24 }}
              cardsLeft={user.card_balance}
            />
            <NextDrawCard style={{ marginVertical: 24 }} />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD89E" />
      </View>
    );
  }

};

const styles = StyleSheet.create({
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
  }
});

export default LauchScreenEncrypted;
