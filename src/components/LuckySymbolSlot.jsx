import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "react-native-web-lottie";

const LuckySymbolSlot = ({ showCoin = false, style }) => {
  return (
    <View style={[styles.container, style, showCoin ? styles.containerActive : {}]}>
      {showCoin && <LottieView
        style={{ margin: -5 }}
        source={require("../assets/lotties/lottie3DCoinSlot.json")}
        autoPlay
        speed={1}
        loop={false}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  containerActive: {
    boxShadow: '0px 0px 10px 1px #A78953',
  },
  container: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    boxShadow: '0px 2px 1px #FFFFFF1A, inset 0px 2px 1px #000000',
    backgroundColor: "#1E1E1E",
    alignContent: "center",
  },
});

export default LuckySymbolSlot;
