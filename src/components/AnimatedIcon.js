import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
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
import CenteredText from "./CenteredText";

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

const AnimatedIcon = ({ iconIndex, onClick,timerGame }) => {
  const handleIconClick = () => {
    if (onClick) {
      onClick(iconIndex);
    }
  };

  return (
    <View style={styles.iconWrapper}>
      <View style={styles.centeredTextWrapper}>
        <CenteredText value={timerGame}/>
      </View>
      
      {iconComponentsActive[iconIndex]}

      <TouchableWithoutFeedback onPress={handleIconClick}>
        <View style={styles.overlay}>
          <LottieView
            style={styles.lottieAnimation}
            source={require("./../assets/lotties/lottieScratchieBubble.json")}
            autoPlay
            loop={true}
          />
        </View>
      </TouchableWithoutFeedback>
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
    elevation: 999,
  },
  centeredTextWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
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
