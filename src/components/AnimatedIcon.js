import React, { useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import LottieView from "react-native-web-lottie";
import { IconTypeAnhkActive } from "./../assets/icons/IconTypeAnhkActive";
import { IconTypeAnubisActive } from "./../assets/icons/IconTypeAnubisActive";
import { IconTypeFeatherActive } from "./../assets/icons/IconTypeFeatherActive";
import { IconTypeHorusActive } from "./../assets/icons/IconTypeHorusActive";
import { IconTypePyramidActive } from "./../assets/icons/IconTypePyramidActive";
import { IconTypeScarabActive } from "./../assets/icons/IconTypeScarabActive";
import { IconTypeSphinxActive } from "./../assets/icons/IconTypeSphinxActive";
import { IconTypeTabletActive } from "./../assets/icons/IconTypeTabletActive";
import { IconTypeSunRaActive } from "./../assets/icons/IconTypeSunRaActive";
import { IconTypeEyePyramidActive } from "./../assets/icons/IconTypeEyePyramidActive";
import { IconTypeSleighActive } from "./../assets/icons/IconTypeSleighActive";
import { IconTypePharoahActive } from "../assets/icons/IconTypePharoahActive";
import PopUpText from "./PopUpText";

// Mapeamento de ícones ativos
const iconComponentsActive = [
  <IconTypeAnubisActive key="0" />,
  <IconTypeAnhkActive key="1" />,
  <IconTypeFeatherActive key="2" />,
  <IconTypeHorusActive key="3" />,
  <IconTypePyramidActive key="4" />,
  <IconTypeScarabActive key="5" />,
  <IconTypeSphinxActive key="6" />,
  <IconTypeTabletActive key="7" />,
  <IconTypeSunRaActive key="8" />,
  <IconTypeEyePyramidActive key="9" />,
  <IconTypePharoahActive key="10" />,
  <IconTypeSleighActive key="11" />,
];

const lottieAnimations = {
  lottieScratchieBubbleBlue: require('./../assets/lotties/lottieScratchieBubbleBlue.json'),
  lottieScratchieBubbleGreen: require('./../assets/lotties/lottieScratchieBubbleGreen.json'),
  lottieScratchieBubblePink: require('./../assets/lotties/lottieScratchieBubblePink.json'),
  lottieScratchieBubbleOrange: require('./../assets/lotties/lottieScratchieBubbleOrange.json'),
};

const AnimatedIcon = ({ iconIndex, onClick, timerGame, bobble }) => {
  const selectedBobbleColour = lottieAnimations[bobble];

  const handleIconClick = () => {
    if (onClick) {
      onClick(iconIndex);
    }
  };


  return (
    <View style={styles.iconWrapper}>
      {iconComponentsActive[iconIndex]}
      <TouchableWithoutFeedback hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={handleIconClick}>
        <View style={styles.overlay}>
          {selectedBobbleColour && (
            <LottieView
              style={styles.lottieAnimation}
              source={selectedBobbleColour}
              autoPlay
              loop={true}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      {timerGame > 0 && (
        <View style={styles.centeredTextWrapper}  pointerEvents='none' >
          <PopUpText value={timerGame} />
        </View>
      )}
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
