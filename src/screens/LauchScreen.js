import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  View,
} from "react-native-web";

import { useNavigate, useParams } from "react-router";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import ProfileHeader from "../components/ProfileHeader";
import { useSnackbar } from "../components/SnackbarContext";
import useApiRequest from "../hook/useApiRequest";
import TopBannerNav from "../components/TopBannerNav";
import SectionTitle from "../components/SectionTitle";
import GamesAvailableCard from "../components/GamesAvailableCard";
import LeaderBoardList from "../components/LeaderBoardList";
import { Colors, Dimentions, LeaderBoardStatus } from "../util/constants";
import NextDrawCard from "../components/NextDrawCard";
import { getCurrentDate, convertUTCToLocal } from "../util/Helpers";
import RaffleTicketCard from "../components/RaffleTicketCard";
import StatCard from "../components/StatCard";
import AssetPack from "../util/AssetsPack";
import { useGame } from "../context/GameContext";

const LauchScreen = () => {
  const navigate = useNavigate();
  const {setLuckySymbolCount} = useGame();

  const [initialScore, setInitialScore] = useState(0);
  const [initialTicketCount, setInitialTicketCount] = useState(0);
  const [initialLuckySymbolCount, setInitialLuckySymbolCount] = useState(0);
  const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);

  const [initialUserData, setInitialUserData] = useState("");
  const [leaderBoardData, setLeaderBoardData] = useState();

  const { loading, error, response, fetchUserDetails, getLeaderBoard } = useApiRequest();
  const { showSnackbar } = useSnackbar();

  const { id, username, email } = useParams();

  useEffect(() => {
    console.log("Params:", { id, username, email });
    fetchUserDetails(id, username, email);
    getLeaderBoard(5)
  }, [id]);

  const handleStartGame = () => {
    if (initialUserData.name === undefined || initialUserData.name === "") {
      showSnackbar("Please complete your profile to play the game");
      fetchUserDetails(id, username, email);
      return;
    }
    navigate("/start", {
      state: {
        username: initialUserData.name,
        email: initialUserData.email,
        id: initialUserData.user_id,
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
        setLuckySymbolCount(response.user.lucky_symbol_balance);

        const userData = response.user;
        const currentWeek = response.current_week;
        if (response.daily === null || response.daily.length === 0) {
          navigate("/daily", {
            state: {
              user_id: userData.user_id,
              name: userData.name,
              email: userData.email,
            },
          });
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
              navigate("/daily", {
                state: {
                  user_id: userData.user_id,
                  name: userData.name,
                  email: userData.email,
                },
              });
            } else {
              console.log("Daily Question already answered.");
            }
          } else {
            navigate("/daily", {
              state: {
                user_id: userData.user_id,
                name: userData.name,
                email: userData.email,
              },
            });
          }
        }
      } else {
        setLeaderBoardData(Object.values(response).map((data) => {
          return {
            id: data.user_id,
            rank: data.rank,
            username: data.name,
            points: data.total_score,
            status: LeaderBoardStatus.up,
          }
        }));
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
    navigate("/leader_board", {
      state: {
        initialUserData,
      },
    });
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.header}>
        <TopBannerNav />
        {loading ? (
          <LoadingView />
        ) : (
          <ProfileHeader
            containerStyle={{ paddingHorizontal: Dimentions.pageMargin }}
            id={initialUserData.user_id}
            name={initialUserData.name} />
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
          <LeaderBoardList leaderboardData={leaderBoardData} />
          <GamesAvailableCard
            style={{ marginVertical: 24 }}
            cardsLeft={initialScratchCardLeft} />
          <NextDrawCard style={{ marginVertical: 24 }} />
        </View>
      </View>
    </ScrollView>
  );
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
  },
});

export default LauchScreen;
