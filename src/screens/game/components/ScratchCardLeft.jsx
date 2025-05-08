import React, { useEffect, useRef, useState, memo } from "react";
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LottieView from "react-native-web-lottie";
import { useSound } from "../../../hook/useSoundPlayer";
import { useTheme } from "../../../hook/useTheme";
import AssetPack from "../../../util/AssetsPack";
import useStorage, { storageKeys } from "../../../hook/useStorage";
ScratchCardLeft.propTypes = {
  scratchCardLeft: PropTypes.number.isRequired,
  scratchStarted: PropTypes.bool,
};

ScratchCardLeft.defaultProps = {
  scratchStarted: false,
};

export default memo(ScratchCardLeft);
function ScratchCardLeft({ scratchCardLeft, scratchStarted = false }) {
  const { soundMuteOnBackground, soundMuteOffBackground } = useTheme();

  const [displayedScratchCardsLeft, setDisplayedScratchCardsLeft] = useState(0);

  console.log("ScratchCardLeft:", scratchCardLeft);

  const lottieRef = useRef();
  const { saveData } = useStorage();
  const { isSoundEnabled, setIsSoundEnabled } = useSound();

  useEffect(() => {
    setDisplayedScratchCardsLeft(scratchCardLeft);
  }, [scratchCardLeft]);

  useEffect(() => {
    lottieRef.current && lottieRef.current.reset();
    if (scratchStarted) {
      setDisplayedScratchCardsLeft(scratchCardLeft - 1);
      lottieRef.current && lottieRef.current.play();
    }
  }, [scratchStarted, scratchCardLeft, lottieRef]);

  const toggleSound = () => {
    setIsSoundEnabled((oldVal) => {
      saveData(storageKeys.soundEnabled, !oldVal);
      return !oldVal;
    });
  };
  console.log(isSoundEnabled);
  const renderCounter = () => {
    return (
      <TouchableOpacity onPress={toggleSound}>
        <Image
          resizeMode="contain"
          source={
            isSoundEnabled ? soundMuteOnBackground : soundMuteOffBackground
          }
          style={{ width: 75, height: 30 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <LottieView
          ref={lottieRef}
          style={styles.lottieAnimation}
          source={AssetPack.lotties.CARD_COUNT_DOWN}
          autoPlay={false}
          loop={false}
          speed={1}
        />
        <View style={styles.textRow}>
          <Text style={styles.number}>{displayedScratchCardsLeft}</Text>
          <Text style={styles.text}>Scratch Cards Left</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>{renderCounter()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 40,
    height: 40,
    marginRight: 2,
    marginVertical: -12,
  },
  text: {
    userSelect: "none",
    fontFamily: "Inter-Medium",
    color: "#A9A9A9",
    fontSize: 12,
    marginHorizontal: 6,
  },
  number: {
    userSelect: "none",
    fontFamily: "Inter-Bold",
    color: "#FFDFAB",
    fontSize: 16,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
});
