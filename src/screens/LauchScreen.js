import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Text,
  View,
} from "react-native-web";

import { useNavigate, useParams } from "react-router";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import ProfileHeader from "../components/ProfileHeader";
import { useSnackbar } from "../components/SnackbarContext";
import useApiRequest from "../hook/useApiRequest";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import TopBannerNav from "../components/TopBannerNav";
import SectionTitle from "../components/SectionTitle";
import GamesAvailableCard from "../components/GamesAvailableCard";
import LeaderBoardList from "../components/LeaderBoardList";
import { LeaderBoardStatus } from "../util/constants";
import NextDrawCard from "../components/NextDrawCard";
import { COLOR_BACKGROUND } from "../util/constants";
import { getCurrentDate, convertUTCToLocal } from "../util/Helpers";
import RaffleTicketCard from "../components/RaffleTicketCard";
import StatCard from "../components/StatCard";

const LauchScreen = () => {
  const navigate = useNavigate();

  const backgroundLuckySymbol = require("./../assets/image/background_result_lucky_symbol.png");

  const [initialScore, setInitialScore] = useState(0);
  const [initialTicketCount, setInitialTicketCount] = useState(0);
  const [initialLuckySymbolCount, setInitialLuckySymbolCount] = useState(0);
  const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);

  const [initialUserData, setInitialUserData] = useState("");
  const [leaderBoardData, setLeaderBoardData] = useState();

  const [timeLeft] = useTimeLeftForNextDraw();

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
    <ScrollView
      style={{ ...styles.container, backgroundColor: COLOR_BACKGROUND }}
    >
      <View style={styles.header}>
        <TopBannerNav />
        {loading ? (
          <LoadingView />
        ) : (
          <ProfileHeader
            containerStyle={{ marginTop: -40 }}
            id={initialUserData.user_id}
            name={initialUserData.name}
          />
        )}
      </View>
      <View
        style={[
          styles.container,
          { marginLeft: 18, marginRight: 18, marginBottom: 10 },
        ]}
      >
        <SectionTitle text={"Statistics"} />
        <View style={styles.resultRow}>
          <StatCard title="Total Points" stat={initialScore} loading={loading} />
          <View style={{ width: 10 }} />
          <StatCard title="LUCKY SYMBOLS" loading={loading}>
            <ImageBackground
              resizeMode="contain"
              source={backgroundLuckySymbol}
              style={styles.imageBackgroundLuckySymbol}>
              <LottieLuckySymbolCoinSlot topLayout={false} />
            </ImageBackground>
            <View style={styles.luckySymbols}></View>
          </StatCard>
        </View>
        <RaffleTicketCard score={initialScore} ticketCount={initialTicketCount} />
        <GameButton
          style={{ marginVertical: 24, width: "100%" }}
          text="Play Now"
          onPress={() => handleStartGame()}
        />
        <SectionTitle
          text="LeaderBard"
          viewAllText="View All"
          viewAllAction={handleViewAllPress}
        />
        <LeaderBoardList leaderboardData={leaderBoardData} />
        <GamesAvailableCard
          style={{ marginVertical: 24 }}
          cardsLeft={initialScratchCardLeft}
        />
        <NextDrawCard
          days={timeLeft.days}
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
          style={{ marginVertical: 24 }}
        />
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
  resultCard: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
    padding: 4,
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
  slider: {
    height: 10,
    maxHeight: 10,
    transform: [{ scaleY: 1, scaleX: 1 }],
    zIndex: 999,
    elevation: 10,
  },
  thumb: {
    width: 0,
    height: 0,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default LauchScreen;
