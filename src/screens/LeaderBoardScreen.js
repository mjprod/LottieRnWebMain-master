import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Image, View } from "react-native-web";
import SectionTitle from "../components/SectionTitle";
import { leaderboardData } from "../data/LeaderBoardData";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import { useLocation, useNavigate } from "react-router-dom";
const LeaderBoardScreen = () => {
  const logo = require("./../assets/image/background_top_nav.png");
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
    } else {
      navigate("/");
    }
  }, [location]);

  useEffect(() => {
    console.log(initialUserData);
  }, [initialUserData]);

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
      <LeaderBoardList
        style={{ paddingHorizontal: 25 }}
        leaderboardData={leaderboardData}
        username={ initialUserData && initialUserData.name}
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
