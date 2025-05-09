import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native-web";
import useApiRequest from "../hook/useApiRequest";
import { Dimentions } from "../util/constants";
import LeaderBoardItem from "./items/LeaderBoardItem";
import Pagination from "./Pagination";

const LeaderBoardList = ({ username, style, numberOfItems = 10, beta_block_id, showPagination = true }) => {
  const { getLeaderBoard } = useApiRequest();

  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getLeaderBoard(beta_block_id, numberOfItems, currentPage).then((response) => {
      if (response) {
        setTotalPages(response.totalPages);
        const newData = Object.values(response.data).map((item) => ({
          id: item.user_id,
          rank: item.current_rank,
          username: item.name,
          points: item.total_score,
          status: item.trend,
        }));
        setLeaderBoardData(newData);
      }
    },
    ).catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    },
    );
  }, [currentPage]);

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
          <LeaderBoardItem
            rank={item.rank}
            username={item.username}
            points={item.points}
            status={item.status}
            selected={item.username === username}
          />
        )}
      />
      {showPagination && (totalPages > 1 &&
        <Pagination
          containerStyle={{ marginBottom: Dimentions.marginL }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </View>
  );
};

export default LeaderBoardList;
