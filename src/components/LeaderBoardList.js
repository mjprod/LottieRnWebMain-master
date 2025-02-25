import React from "react";
import { View, FlatList } from "react-native-web";
import LeaderBoardItem from "./items/LeaderBoardItem";

const LeaderBoardList = ({ leaderboardData, username }) => {
  return (
    <FlatList
      style={{ width: "100%" }}
      data={leaderboardData}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <View>
          <LeaderBoardItem
            rank={item.rank}
            username={item.username}
            points={item.points}
            status={item.status}
            selected={item.username === username}
          />
        </View>
      )}
    />
  );
};

export default LeaderBoardList;
