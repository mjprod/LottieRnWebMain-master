import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import SectionTitle from "../components/SectionTitle";
import { leaderboardData } from "../data/LeaderBoardData";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import { useLocation } from "react-router-dom";
import TopBannerNav from "../components/TopBannerNav";
import { useNavigate } from "react-router-dom";

const LeaderBoardScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [initialUserData, setInitialUserData] = useState();

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
      <SectionTitle
        text="LeaderBard"
        style={{ marginVertical: 55, paddingHorizontal: 25 }}
      />
      <LeaderBoardList
        style={{ paddingHorizontal: 25 }}
        leaderboardData={leaderboardData}
        username={initialUserData && initialUserData.name}
      />
      <GameButton
        style={{ marginVertical: 30, paddingHorizontal: 25 }}
        text="Play Now"
      />
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
