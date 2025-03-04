import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { LeaderBoardStatus } from "../../util/constants";
import { maskString } from "../../util/Helpers";
import { IconTypeLeaderBoardArrow } from "../../assets/icons/ArrowSolid";
import { PointsIcon } from "../../assets/icons/PointsIcon";
import AssetPack from "../../util/AssetsPack";

const LeaderBoardItem = ({ rank, username, points, status, selected }) => {
  const getStatusIcon = () => {
    switch (status) {
      case LeaderBoardStatus.up:
        return (
          <IconTypeLeaderBoardArrow
            style={{
              width: 15,
              height: 10,
              marginLeft: 10,
            }}
          />
        );
      case LeaderBoardStatus.down:
        return (
          <IconTypeLeaderBoardArrow
            fill="red"
            style={{
              transform: [{ rotate: "180deg" }],
              width: 15,
              height: 10,
              marginLeft: 10,
            }}
          />
        );
      default:
        return (
          <IconTypeLeaderBoardArrow
            fill="red"
            style={{
              transform: [{ rotate: "180deg" }],
              width: 15,
              height: 10,
              marginLeft: 10,
            }}
          />
        );
    }
  };
  return (
    <ImageBackground
      style={selected ? styles.containerSelected : styles.container}
      source={selected && AssetPack.backgrounds.GOLDEN_BACKGROUND_GRADIENT}
    >
      <Text
        style={[selected ? styles.selectedText : styles.text, styles.rankText]}
      >
        {rank}
      </Text>
      <Text
        style={[
          selected ? styles.selectedText : styles.text,
          styles.usernameText,
        ]}
      >
        {maskString(username)}
      </Text>
      <PointsIcon
        fill={selected ? "#212121" : null}
        style={{ width: 15, height: 15, marginRight: 10 }}
      />
      <Text
        style={[
          selected ? styles.selectedText : styles.text,
          styles.pointsText,
        ]}
      >{`${points} Points`}</Text>
      {getStatusIcon()}
    </ImageBackground>
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
    overflow: "hidden",
    borderColor: "#FFFFFF33",
  },
  containerSelected: {
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFDEA8",
  },
  rankText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    width: "15%",
  },
  usernameText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    flex: 1,
  },
  pointsText: {
    fontFamily: "Teko-Medium",
    fontSize: 18,
    paddingTop: 3,
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Inter-Medium",
    color: "#fff",
  },
  selectedText: {
    fontFamily: "Inter-Medium",
    color: "#212121",
  },
});

export default LeaderBoardItem;
