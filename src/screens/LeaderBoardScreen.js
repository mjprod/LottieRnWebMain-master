import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SectionTitle from "../components/SectionTitle";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import { useLocation } from "react-router-dom";
import TopBannerNav from "../components/TopBannerNav";
import LinkButton from "../components/LinkButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
import NextDrawCard from "../components/NextDrawCard";
import useApiRequest from "../hook/useApiRequest";
import { LeaderBoardStatus } from "../util/constants";
import { COLOR_BACKGROUND } from "../util/constants";
import useAppNavigation from "../hook/useAppNavigation";

const LeaderBoardScreen = () => {
  const location = useLocation();
  const appNavigation = useAppNavigation()

  const [initialUserData, setInitialUserData] = useState();
  const { getLeaderBoard, fetchUserDetails, response } = useApiRequest();
  const [leaderBoardData, setLeaderBoardData] = useState();

  useEffect(() => {
    getLeaderBoard(10);
  }, []);

  useEffect(() => {
    if (location.state) {
      const id = location.state.user_id;
      const username = location.state.name;
      const email = location.state.email;

      fetchUserDetails(id, username, email);
    }
  }, [location]);

  useEffect(() => {
    if (response) {
      if (response.user) {
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
    appNavigation.goToGamePage(initialUserData.user_id, initialUserData.name, initialUserData.email)
  }
  return (
    <ScrollView style={styles.container}>
      <TopBannerNav hasBackButton={initialUserData ? true : false} />
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
          handlePress={appNavigation.goToHowToPlayPage}
        />
        <GamesAvailableCard style={{ marginBottom: 30 }} cardsLeft={initialUserData ? initialUserData.card_balance : 0} />
        <NextDrawCard style={{ marginBottom: 30 }} />
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
