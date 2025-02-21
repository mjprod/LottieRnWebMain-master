import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import AssetPack from "../../util/AssetsPack";
import { maskString } from "../../util/constants";

const LeaderBoardItem = ({ rank, username, points, status }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rankText}>{rank}</Text>
      <Text style={styles.usernameText}>{maskString(username)}</Text>
      <Image
        style={{ width: 15, height: 15, marginRight: 10 }}
        source={AssetPack.icons.POINTS}
      />
      <Text style={styles.pointsText}>{`${points} Points`}</Text>
      <Text style={styles.text}>{status}</Text>
      <Image
        style={{ width: 15, height: 10, marginLeft: 10 }}
        source={AssetPack.icons.GREEN_ARROW_UP}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF33",
  },
  rankText: {
    fontFamily: "Inter-Medium",
    color: "#fff",
    fontSize: 14,
    width: "15%",
  },
  usernameText: {
    fontFamily: "Inter-Medium",
    color: "#fff",
    fontSize: 14,
    flex: 1,
    color: "#fff",
  },
  pointsText: {
    fontFamily: "Teko-Medium",
    color: "#fff",
    fontSize: 18,
    paddingTop: 3,
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Inter-Medium",
    color: "#fff",
    fontSize: 14,
    flexDirection: "row",
  },
});

export default LeaderBoardItem;
