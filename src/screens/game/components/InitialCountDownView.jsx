import React from "react";
import { View, StyleSheet, Platform, Pressable } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import LottieView from "react-native-web-lottie";

const InitialCountDownView = ({ countDownLottieRef, onCountDownComplete }) => {
  return (
    <View
      key="overlay"
      style={{
        ...styles.blackOverlayWin,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        zIndex: 9999,
        elevation: 10,
      }}
    >
      <Pressable style={{ width: "80%" }}>
        <View style={styles.rowCountDown}>
          <LottieView
            ref={countDownLottieRef}
            source={AssetPack.lotties.COUNT_DOWN}
            speed={1}
            loop={false}
            onAnimationFinish={onCountDownComplete}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  blackOverlayWin: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
});

export default InitialCountDownView;
