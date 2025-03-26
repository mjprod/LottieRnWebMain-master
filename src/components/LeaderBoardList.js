import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native-web";
import LeaderBoardItem from "./items/LeaderBoardItem";
import { LeaderBoardStatus } from "../util/constants";
import useApiRequest from "../hook/useApiRequest";

const LeaderBoardList = ({ username, style, numberOfItems = 10 }) => {
  const { response, getLeaderBoard } = useApiRequest();

  const [leaderboardData, setLeaderBoardData] = useState([]);

  useEffect(() => {
    getLeaderBoard(numberOfItems);
  }, []);
  
  useEffect(() => {
    if (response) {
      setLeaderBoardData(Object.values(response.data).map((item) => {
        console.log("Item", item)
        return {
          id: item.user_id,
          rank: item.current_rank,
          username: item.name,
          points: item.total_score,
          status: item.trend ,
        }
      }));
    }
  }, [response]);

  return (
    <FlatList
      style={{ width: "100%", ...style }}
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
