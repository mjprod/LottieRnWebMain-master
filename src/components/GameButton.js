import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

const buttonBackground = require("./../assets/image/button_play_game.png");
const buttonAutoIcon = require("./../assets/image/icon_auto_fill.png");
const buttonClaimIcon = require("./../assets/image/icon_currency_joker_coin.png");
const buttonNextIcon = require("./../assets/image/icon_next_card.png");

const GameButton = ({
  onPress,
  text,
  type = "AUTO",
  loading = false,
  style = {},
}) => {
  let buttonIcon;
  switch (type) {
    case "CLAIM":
      buttonIcon = buttonClaimIcon;
      break;
    case "NEXT":
      buttonIcon = buttonNextIcon;
      break;
    case "AUTO":
    default:
      buttonIcon = buttonAutoIcon;
  }

  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <ImageBackground source={buttonBackground} style={styles.imageBackground}>
        {loading ? (
          <ActivityIndicator size="small" color="#000000" />
        ) : (
          <View style={styles.content}>
            <Image source={buttonIcon} style={styles.img} />
            <Text style={styles.text}>{text}</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    zIndex: 999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  text: {
    color: "#3E362A",
    fontSize: 22,
    fontFamily: "Teko-Medium",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default GameButton;
