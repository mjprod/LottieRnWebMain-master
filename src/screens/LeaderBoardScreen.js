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
import { COLOR_BACKGROUND } from "../util/constants";
import useAppNavigation from "../hook/useAppNavigation";
import { useGame } from "../context/GameContext";

const LeaderBoardScreen = () => {
  const location = useLocation();
  const appNavigation = useAppNavigation()

  const { user, setUser } = useGame()

  const { fetchUserDetails, response } = useApiRequest();

  useEffect(() => {
    if (location.state) {
      const id = location.state.user_id;
      const username = location.state.name;
      const email = location.state.email;

      fetchUserDetails(id, username, email);
    }
  }, [location]);

  useEffect(() => {
    if (response && response.user) {
      console.log(response.user)
      setUser(response.user);
    }
  }, [response]);

  const handlePlayNowButtonPress = () => {
    appNavigation.goToGamePage(user.user_id, user.name, user.email)
  }
  return (
    <ScrollView style={styles.container}>
      <TopBannerNav hasBackButton={true} />
      <View style={{ marginHorizontal: 25 }}>
        <SectionTitle text="LeaderBard" style={{ marginBottom: 10 }} />
        <LeaderBoardList
          style={{ marginBottom: 30 }}
          username={user && user.name} />
        <GameButton style={{ marginBottom: 30 }} text="Play Now" onPress={handlePlayNowButtonPress} />
        <LinkButton
          style={{ marginBottom: 30 }}
          text={"How To Play Turbo Scratch >"}
          handlePress={appNavigation.goToHowToPlayPage} />
        <GamesAvailableCard style={{ marginBottom: 30 }} cardsLeft={user ? user.card_balance : 0} />
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
