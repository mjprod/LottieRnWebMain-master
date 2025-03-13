import React from "react";
import { Text, View, StyleSheet } from "react-native";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";

const TimerComponent = ({ style }) => {
  const [timeLeft] = useTimeLeftForNextDraw();

  return (
    <View style={{ ...styles.timerSection, ...style }}>
      <View style={styles.backgroundRounded}>
        <Text style={styles.timerTitle}>Time till Next Draw</Text>
      </View>
      <Text style={styles.timerContainer}>
        <Text style={styles.timerNumberValue}>{timeLeft.days}</Text>
        <Text style={styles.timerStringValue}> Days </Text>
        <Text style={styles.timerNumberValue}>{timeLeft.hours}</Text>
        <Text style={styles.timerStringValue}> Hrs </Text>
        <Text style={styles.timerNumberValue}>{timeLeft.minutes}</Text>
        <Text style={styles.timerStringValue}> Mins </Text>
        <Text style={styles.timerNumberValue}>{timeLeft.seconds}</Text>
        <Text style={styles.timerStringValue}> Secs</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundRounded: {
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 43.5,
    border: "1px solid #FFFFFF4D",
    marginBottom: 20,
  },
  timerSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "#FFDEA8",
  },
  timerNumberValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#fff",
  },
  timerStringValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#A6A6A6",
  },
});

export default TimerComponent;
