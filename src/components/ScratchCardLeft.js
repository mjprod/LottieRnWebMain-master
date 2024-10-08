import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "react-native-web-lottie";

const ScratchCardLeft = ({ scratchCardLeft }) => {
  const [displayedScratchCardsLeft, setDisplayedScratchCardsLeft] =
    useState(scratchCardLeft);
  
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    setShowLottie(false);

    const timeoutId = setTimeout(() => {
      setDisplayedScratchCardsLeft(scratchCardLeft - 1);
      setShowLottie(true);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [scratchCardLeft]);

  const renderCounter = () => {
    const counters = [];
    for (let i = 0; i < 5; i++) {
      counters.push(
        <View
          key={i}
          style={[
            styles.counter,
            i < displayedScratchCardsLeft
              ? styles.activeCounter
              : styles.inactiveCounter,
          ]}
        />
      );
    }
    return counters;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showLottie && (
          <LottieView
            style={styles.lottieAnimation}
            source={require("./../assets/lotties/lottieCardCountdown.json")}
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
      <View style={styles.rightContainer}>
        <View style={styles.firstCounter} />
        {renderCounter()}
      </View>
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
    fontFamily: "Inter-Medium",
    color: "#A9A9A9",
    fontSize: 12,
    marginHorizontal: 6,
  },
  number: {
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
  firstCounter: {
    width: 30,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFDEA7",
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
