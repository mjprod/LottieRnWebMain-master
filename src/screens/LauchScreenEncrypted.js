import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  View,
} from "react-native-web";

import { useParams } from "react-router";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import ProfileHeader from "../components/ProfileHeader";
import { useSnackbar } from "../components/SnackbarContext";
import useApiRequest from "../hook/useApiRequest";
import TopBannerNav from "../components/TopBannerNav";
import SectionTitle from "../components/SectionTitle";
import GamesAvailableCard from "../components/GamesAvailableCard";
import LeaderBoardList from "../components/LeaderBoardList";
import { Colors, Dimentions } from "../util/constants";
import NextDrawCard from "../components/NextDrawCard";
import { getCurrentDate, convertUTCToLocal } from "../util/Helpers";
import RaffleTicketCard from "../components/RaffleTicketCard";
import StatCard from "../components/StatCard";
import AssetPack from "../util/AssetsPack";
import { useGame } from "../context/GameContext";
import useAppNavigation from "../hook/useAppNavigation";
import { useSearchParams } from "react-router-dom";
import { decrypt } from "../util/crypto";

const LauchScreenEncrypted = () => {
  const appNavigation = useAppNavigation();

  const { user, setUser, setLuckySymbolCount } = useGame();

  const [initialScore, setInitialScore] = useState(0);
  const [initialTicketCount, setInitialTicketCount] = useState(0);
  const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);

  const { loading, error, response, fetchUserDetails, getLeaderBoard } = useApiRequest();
  const { showSnackbar } = useSnackbar();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!user || user === null) {
      const authToken = searchParams.get('authToken');
      if (!authToken) {
        appNavigation.goToNotFoundPage();
        return;
      }
      const authTokenData = JSON.parse(decrypt(authToken, true));
      fetchUserDetails(authTokenData.user_id, authTokenData.username, authTokenData.email);
    }
    window.history.replaceState(null, '', window.location.pathname);
  }, [searchParams]);

  const handleStartGame = () => {
    if (user.name === undefined || user.name === "") {
      showSnackbar("Please complete your profile to play the game");
      // fetchUserDetails(id, username, email);
      return;
    }
    if (initialScratchCardLeft === 0) {
      showSnackbar("You don't have any cards left. Please wait till next day to play the game!")
    } else {
      appNavigation.goToStartPage(user.user_id, user.name, user.email);
    }
  };

  useEffect(() => {
    if (response) {
      if (response.user) {
        setInitialScore(response.user.total_score || 0);
        setInitialTicketCount(response.user.ticket_balance || 0);
        setInitialScratchCardLeft(response.user.card_balance || 0);
        setUser(response.user);
        setLuckySymbolCount(response.user.lucky_symbol_balance);

        const userData = response.user;
        const currentWeek = response.current_week;
        if (response.daily === null || response.daily.length === 0) {
          appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
        } else {
          const currentWeekDaily = response.daily.find(
            (item) => item.current_week === currentWeek
          );
          if (currentWeekDaily != null) {
            const localConvertedDays = currentWeekDaily.days.map((date) =>
              convertUTCToLocal(date)
            );
            const hasCurrentDate = localConvertedDays.some((item) =>
              item.includes(getCurrentDate())
            );
            if (!hasCurrentDate) {
              console.log("Daily Question not answered.", currentWeekDaily);
              appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
            } else {
              console.log("Daily Question already answered.");
            }
          } else {
            appNavigation.goToDailyPage(userData.user_id, userData.name, userData.email);
          }
        }
      }
    }
  }, [response]);

  useEffect(() => {
    console.log("Error: ", error);
    if (error && error.length > 0) {
      showSnackbar(error);
    }
  }, [error]);

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
          {loading ? (
            <LoadingView />
          ) : (
            <ProfileHeader
              containerStyle={{ paddingHorizontal: Dimentions.pageMargin }}
              id={user.user_id ? user.user_id : ""}
              name={user.name ?? ""} />
          )}
        </View>
        <View style={{ ...styles.container }}>
          <View style={{
            marginLeft: Dimentions.pageMargin,
            marginRight: Dimentions.pageMargin,
            marginBottom: Dimentions.sectionMargin,
            marginTop: Dimentions.sectionMargin
          }}>
            <SectionTitle text={"Statistics"} />
            <View style={styles.resultRow}>
              <StatCard title="Total Points" stat={initialScore} loading={loading} />
              <View style={{ width: 10 }} />
              <StatCard title="LUCKY SYMBOLS" loading={loading}>
                <ImageBackground
                  resizeMode="contain"
                  source={AssetPack.backgrounds.LUCKY_SYMBOL}
                  style={styles.imageBackgroundLuckySymbol}>
                  <LottieLuckySymbolCoinSlot topLayout={false} />
                </ImageBackground>
                <View style={styles.luckySymbols}></View>
              </StatCard>
            </View>
            <RaffleTicketCard score={initialScore} ticketCount={initialTicketCount} />
            <GameButton
              style={{ marginTop: Dimentions.pageMargin, width: "100%" }}
              text="Play Now"
              onPress={() => handleStartGame()} />
          </View>
          <View style={{
            paddingTop: Dimentions.sectionMargin,
            paddingHorizontal:
              Dimentions.pageMargin,
            paddingBottom: Dimentions.sectionMargin,
            borderRadius: 16
          }}>
            <SectionTitle
              text="LeaderBard"
              viewAllText="View All"
              viewAllAction={handleViewAllPress} />
            <LeaderBoardList />
            <GamesAvailableCard
              style={{ marginVertical: 24 }}
              cardsLeft={initialScratchCardLeft} />
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
