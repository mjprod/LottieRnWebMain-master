import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AssetPack from "../util/AssetsPack";
import LottieView from "react-native-web-lottie";

export const ButtonSize = {
  FULL: AssetPack.lotties.CTA_BUTTON_FULL_WIDTH,
  HALF: AssetPack.lotties.CTA_BUTTON_HALF_WIDTH,
  TWO_THIRD: AssetPack.lotties.CTA_BUTTON_TWO_THIRD,
};

const GameButton = ({ text, onPress, buttonSize = ButtonSize.FULL, loading = false, style = {} }) => {
  return (
    <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
      <LottieView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        source={buttonSize}
        autoPlay
        speed={1}
        loop={true}
      />
      {loading ? (
        <ActivityIndicator size="small" color="#000000" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
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
  text: {
    justifyContent: "center",
    alignItems: "center",
    color: "#3E362A",
    fontSize: 22,
    textTransform: "uppercase",
    fontFamily: "Teko-Medium",
  },
});

export default GameButton;
