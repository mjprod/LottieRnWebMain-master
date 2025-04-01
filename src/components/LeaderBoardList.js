import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native-web";
import LeaderBoardItem from "./items/LeaderBoardItem";
import useApiRequest from "../hook/useApiRequest";
import Pagination from "./Pagination";

const LeaderBoardList = ({ username, style, numberOfItems = 10 }) => {
  const { response, getLeaderBoard } = useApiRequest();

  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getLeaderBoard(numberOfItems, currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (response) {
      setTotalPages(response.totalPages);
      const newData = Object.values(response.data,).map((item) => ({
        id: item.user_id,
        rank: item.current_rank,
        username: item.name,
        points: item.total_score,
        status: item.trend,
      }));
      setLeaderBoardData(newData);
    }
  }, [response]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <View>
      <FlatList
        style={{ width: "100%", ...style }}
        data={leaderboardData}
        keyExtractor={(item) => item.id.toString()}
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
      {totalPages >= 1 &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      }
    </View>
  );
};

export default LeaderBoardList;
