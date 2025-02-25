import React from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import { Image, View } from "react-native-web";
import SectionTitle from "../components/SectionTitle";
import { leaderboardData } from "../data/LeaderBoardData";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";

const LeaderBoardScreen = () => {
  const logo = require("./../assets/image/background_top_nav.png");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: logo,
          }}
        />
      </View>
      <SectionTitle text="LeaderBard" style={{ padding: 20 }} />
      <LeaderBoardList leaderboardData={leaderboardData} username={"ShirishKoirala"} />
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
