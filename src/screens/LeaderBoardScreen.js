import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SectionTitle from "../components/SectionTitle";
import { leaderboardData } from "../data/LeaderBoardData";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import { useLocation, useNavigate } from "react-router-dom";
import TopBannerNav from "../components/TopBannerNav";
import LinkButton from "../components/LinkButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import NextDrawCard from "../components/NextDrawCard";

const LeaderBoardScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialUserData, setInitialUserData] = useState();
  const [timeLeft] = useTimeLeftForNextDraw();
  useEffect(() => {
    if (
      location.pathname === "/leader_board" &&
      location.state &&
      location.state.initialUserData
    ) {
      setInitialUserData(location.state.initialUserData);
    }
  }, [location]);
  const handleBackPress = () => {
    navigate(-1);
  };
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
          leaderboardData={leaderboardData}
          username={initialUserData && initialUserData.name}
        />
        <GameButton style={{ marginBottom: 30 }} text="Play Now" />
        <LinkButton
          style={{ marginBottom: 30 }}
          text={"How To Play Turbo Scratch >"}
          handlePress={() => navigate("/how_to_play")}
        />
        <GamesAvailableCard numberOfSets={1} />
        <NextDrawCard
          style={{ marginBottom: 30 }}
          days={timeLeft.days}
          hours={timeLeft.hours}
          minutes={timeLeft.minutes}
          seconds={timeLeft.seconds}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: "100%",
    height: 144,
    resizeMode: "contain",
  },
});

export default LeaderBoardScreen;
