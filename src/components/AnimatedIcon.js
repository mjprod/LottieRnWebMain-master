import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "react-native-web-lottie";
import PopUpText from "./PopUpText";
import themes from "../global/themeConfig";
import { useTheme } from "../hook/useTheme";

const lottieAnimations = {
  lottieScratchieBubbleBlue: require("./../assets/lotties/lottieScratchieBubbleBlue.json"),
  lottieScratchieBubbleGreen: require("./../assets/lotties/lottieScratchieBubbleGreen.json"),
  lottieScratchieBubblePink: require("./../assets/lotties/lottieScratchieBubblePink.json"),
  lottieScratchieBubbleOrange: require("./../assets/lotties/lottieScratchieBubbleOrange.json"),
};

const AnimatedIcon = ({ iconIndex, onClick, timerGame, bobble }) => {
  const selectedBobbleColour = lottieAnimations[bobble];
  const [iconComponentsDefault, setIconComponentsDefault] = useState([]);
  const { currentTheme } = useTheme();

  const handleIconClick = () => {
    if (onClick) onClick(iconIndex);
  };

  useEffect(() => {
    if (themes[currentTheme].iconsActive) {
      setIconComponentsDefault(themes[currentTheme].iconsActive);
    }
  }, [currentTheme]);

  return (
    <View style={[styles.iconWrapper, { pointerEvents: "box-none" }]} onTouchStart={handleIconClick} onMouseDown={handleIconClick}>
      {iconComponentsDefault[iconIndex]}
      <View style={{ ...styles.overlay, pointerEvents: "box-none" }}>
        {selectedBobbleColour && (
          <LottieView
            style={styles.lottieAnimation}
            source={selectedBobbleColour}
            autoPlay
            loop={true}
          />
        )}
        {timerGame > 0 && (
          <View style={styles.centeredTextWrapper}>
            <PopUpText value={timerGame} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
  },
  centeredTextWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 65,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
  },
  lottieAnimation: {
    width: "100%",
    height: "100%",
  },
});

export default AnimatedIcon;