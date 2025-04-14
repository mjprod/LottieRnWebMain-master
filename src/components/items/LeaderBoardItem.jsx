import React from "react";
import { Text, StyleSheet, ImageBackground, Image, View } from "react-native";
import { Colors, Dimentions, Fonts, LeaderBoardStatus } from "../../util/constants";
import { maskString } from "../../util/Helpers";
import { IconTypeLeaderBoardArrow } from "../../assets/icons/ArrowSolid";
import { PointsIcon } from "../../assets/icons/PointsIcon";
import AssetPack from "../../util/AssetsPack";
import Avatar, { AvatarSize } from "../Avatar";

const LeaderBoardItem = ({ rank, username, points, status, selected }) => {
  const getStatusIcon = () => {
    switch (status) {
      case LeaderBoardStatus.up:
        return (
          <IconTypeLeaderBoardArrow
            style={selected ? styles.statusIconSelected : styles.statusIcon}
          />
        );
      case LeaderBoardStatus.down:
        return (
          <IconTypeLeaderBoardArrow
            fill="red"
            style={[selected ? styles.statusIconSelected : styles.statusIcon, { transform: [{ rotate: "180deg" }] }]}
          />
        );
      case LeaderBoardStatus.same:
        return <Image style={selected ? styles.statusIconSelected : styles.statusIcon} source={AssetPack.icons.DOUBLE_DASH} />
      default:
        return (
          <IconTypeLeaderBoardArrow
            fill="red"
            style={[selected ? styles.statusIconSelected : styles.statusIcon, { transform: [{ rotate: "180deg" }] }]}
          />
        );
    }
  };
  return (
    <ImageBackground
      style={[styles.container, selected && styles.selectedContainer]}>
      <Text
        style={[styles.text, styles.rankText, selected && styles.rankTextSelected]}
      >
        {rank}
      </Text>
      <Text
        style={[
          styles.text,
          styles.usernameText,
          selected && styles.usernameTextSelected,
        ]}
      >
        {!selected ? maskString(username) :
          <View style={{ flexDirection: "row" }}>
            <Avatar size={AvatarSize.small} name={username} />
            <Text style={{ paddingTop: 2 }}>You</Text>
          </View>
        }
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "start", width: 150 }}>
        <PointsIcon style={{ width: 16, height: 16, marginRight: 10 }} />
        <Text
          style={[
            styles.text,
            styles.pointsText,
            selected && styles.pointsTextSelected,
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
    paddingHorizontal: Dimentions.innerCardPadding,
    paddingVertical: 12,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: Colors.jokerBlack700,
    borderColor: Colors.jokerBlack200,
  },
  selectedContainer: {
    backgroundColor: Colors.jokerGold1000,
    borderColor: Colors.jokerGold400,
  },
  rankText: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
    width: 35,
    marginRight: 22,
  },
  rankTextSelected: {
    fontSize: 16,
  },
  usernameText: {
    fontFamily: Fonts.InterRegular,
    fontSize: 16,
    flex: 1,
    width: 80,
  },
  usernameTextSelected: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
  },
  pointsText: {
    fontFamily: Fonts.TekoMedium,
    fontSize: 20,
    paddingTop: 3,
    textTransform: "uppercase",
  },
  pointsTextSelected: {
    fontSize: 20,
  },
  text: {
    color: Colors.jokerWhite50,
  },
  statusIcon: {
    width: 15,
    height: 10,
    marginLeft: 10,
  },
  statusIconSelected: {
    width: 15,
    height: 10,
    marginLeft: 10,
  }
});

export default LeaderBoardItem;
