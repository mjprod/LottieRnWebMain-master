import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, Image, View } from "react-native-web";
import SectionTitle from "../components/SectionTitle";
import { leaderboardData } from "../data/LeaderBoardData";
import LeaderBoardItem from "../components/items/LeaderBoardItem";

const LeaderBoardScreen = () => {
  const logo = require("./../assets/image/background_top_nav.png");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: logo,
          }}
        />
      </View>
      <SectionTitle style={{ padding: 20 }} />
      <FlatList
        style={{ width: "100%", paddingHorizontal: 25 }}
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <LeaderBoardItem
              rank={item.rank}
              username={item.username}
              points={item.points}
            />
          </View>
        )}
      />
    </View>
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
