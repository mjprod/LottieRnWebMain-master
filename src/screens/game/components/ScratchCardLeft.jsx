import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LottieView from "react-native-web-lottie";
import { useSound } from "../../../hook/useSoundPlayer";
import { useTheme } from "../../../hook/useTheme";
import AssetPack from "../../../util/AssetsPack";

const ScratchCardLeft = ({ scratchCardLeft }) => {
  const { soundMuteOnBackground, soundMuteOffBackground } = useTheme();

  const [displayedScratchCardsLeft, setDisplayedScratchCardsLeft] = useState(
    scratchCardLeft,
  );

  const [showLottie, setShowLottie] = useState(true);
  const { isSoundEnabled, setIsSoundEnabled } = useSound();

  useEffect(() => {
    setShowLottie(false);

    const timeoutId = setTimeout(() => {
      setDisplayedScratchCardsLeft(scratchCardLeft - 1);
      setShowLottie(true);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [scratchCardLeft]);

  const toggleSound = async(value) => {
    try {
      //await AsyncStorage.setItem("soundPreference", JSON.stringify(value));
      setIsSoundEnabled(!isSoundEnabled);
      //console.error(isSoundOn);
      // Optional: Play or stop sound based on toggle state
      if (value) {
        //playSound();
      } else {
        //stopSound();
      }
    } catch (e) {
      console.error("Failed to save sound preference", e);
    }
  };

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
        {showLottie && (
          <LottieView
            style={styles.lottieAnimation}
            source={AssetPack.lotties.CARD_COUNT_DOWN}
            autoPlay={true}
            loop={false}
            speed={1}
          />
        )}
        <View style={styles.textRow}>
          <Text style={styles.number}>{displayedScratchCardsLeft}</Text>
          <Text style={styles.text}>Scratch Cards Left</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>{renderCounter()}</View>
    </View>
  );
};

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
  counter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  activeCounter: {
    backgroundColor: "#646464",
  },
  inactiveCounter: {
    backgroundColor: "#434343",
  },
});

export default ScratchCardLeft;
