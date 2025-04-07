import React from "react";
import { Text, StyleSheet, ImageBackground, Image, View } from "react-native";
import { Colors, Fonts, LeaderBoardStatus } from "../../util/constants";
import { maskString } from "../../util/Helpers";
import { IconTypeLeaderBoardArrow } from "../../assets/icons/ArrowSolid";
import { PointsIcon } from "../../assets/icons/PointsIcon";
import AssetPack from "../../util/AssetsPack";

const LeaderBoardItem = ({ rank, username, points, status, selected}) => {
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
      case LeaderBoardStatus.same:
        return <Image style={{ height: 10, width: 15, marginLeft: 10 }} source={AssetPack.icons.DOUBLE_DASH} />
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
      style={selected ? styles.containerSelected : styles.container}>
      <Text
        style={[styles.text, styles.rankText]}
      >
        {rank}
      </Text>
      <Text
        style={[
          styles.text,
          styles.usernameText,
        ]}
      >
        {!selected ? maskString(username) : username}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "start", width: 130 }}>
        <PointsIcon style={{ width: 16, height: 16, marginRight: 10 }} />
        <Text
          style={[
            styles.text,
            styles.pointsText,
          ]}
        >{`${points} Points`}</Text>
      </View>
      {getStatusIcon()}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "#171717",
    borderColor: "#FFFFFF33",
  },
  containerSelected: {
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 14,
    overflow: "hidden",
    borderWidth: 1,
    backgroundColor: "#1D1811",
    borderColor: "#FFDEA8",
  },
  rankText: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
    width: 35,
    marginRight: 22,
  },
  usernameText: {
    fontFamily: Fonts.InterRegular,
    fontSize: 16,
    flex: 1,
    width: 80,
  },
  pointsText: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 18,
    paddingTop: 3,
    
    textTransform: "uppercase",
  },
  text: {
    color: Colors.jokerWhite50,
  }
});

export default LeaderBoardItem;
