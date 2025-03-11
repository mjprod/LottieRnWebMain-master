import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SectionTitle from "../components/SectionTitle";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import { useLocation, useNavigate } from "react-router-dom";
import TopBannerNav from "../components/TopBannerNav";
import LinkButton from "../components/LinkButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import NextDrawCard from "../components/NextDrawCard";
import useApiRequest from "../hook/useApiRequest";
import { LeaderBoardStatus } from "../util/constants";
import { COLOR_BACKGROUND } from "../util/constants";

const LeaderBoardScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialUserData, setInitialUserData] = useState();
  const [timeLeft] = useTimeLeftForNextDraw();
  const { getLeaderBoard, fetchUserDetails, response } = useApiRequest();
  const [leaderBoardData, setLeaderBoardData] = useState();
  const [initialScore, setInitialScore] = useState(0);
  const [initialTicketCount, setInitialTicketCount] = useState(0);
  const [initialLuckySymbolCount, setInitialLuckySymbolCount] = useState(0);
  const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);

  useEffect(() => {
    getLeaderBoard(10);
  }, []);

  useEffect(() => {
    if (
      location.pathname === "/leader_board" &&
      location.state &&
      location.state.initialUserData
    ) {
      setInitialUserData(location.state.initialUserData);
      fetchUserDetails(location.state.initialUserData.user_id, location.state.initialUserData.name, location.state.initialUserData.email)
    }
  }, [location]);

  const handleBackPress = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (response) {
      if (response.user) {
        setInitialScore(response.user.total_score || 0);
        setInitialTicketCount(response.user.ticket_balance || 0);
        setInitialLuckySymbolCount(response.user.lucky_symbol_balance || 0);
        setInitialScratchCardLeft(response.user.card_balance || 0);
        setInitialUserData(response.user);
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
  const handlePlayNowButtonPress = () => {
    navigate("/game", {
      state: {
        initialScore,
        initialTicketCount,
        initialLuckySymbolCount,
        initialScratchCardLeft,
      },
    });
  }
  return (
    <ScrollView style={styles.container}>
      <TopBannerNav
        hasBackButton={initialUserData ? true : false}
        onBackPress={handleBackPress}
      />
      <View style={{ marginHorizontal: 25 }}>
        <SectionTitle text="LeaderBard" style={{ marginBottom: 10 }} />
        <LeaderBoardList
          style={{ marginBottom: 30 }}
          leaderboardData={leaderBoardData}
          username={initialUserData && initialUserData.name}
        />
        <GameButton style={{ marginBottom: 30 }} text="Play Now" onPress={handlePlayNowButtonPress} />
        <LinkButton
          style={{ marginBottom: 30 }}
          text={"How To Play Turbo Scratch >"}
          handlePress={() => navigate("/how_to_play")}
        />
        <GamesAvailableCard style={{ marginBottom: 30 }} cardsLeft={initialScratchCardLeft} />
        <NextDrawCard
          style={{ marginBottom: 30 }}
          days={timeLeft.days}
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
  },
  tinyLogo: {
    width: "100%",
    height: 144,
    resizeMode: "contain",
  },
});

export default LeaderBoardScreen;
