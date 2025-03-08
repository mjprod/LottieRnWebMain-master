import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TimerComponent = ({ days, hours, minutes, seconds, style }) => {
  return (
    <View style={{...styles.timerSection, ...style}}>
      <View style={styles.backgroundRounded}>
        <Text style={styles.timerTitle}>Time till Next Draw</Text>
      </View>
      <Text style={styles.timerContainer}>
        <Text style={styles.timerNumberValue}>{days}</Text>
        <Text style={styles.timerStringValue}> Days </Text>
        <Text style={styles.timerNumberValue}>{hours}</Text>
        <Text style={styles.timerStringValue}> Hrs </Text>
        <Text style={styles.timerNumberValue}>{minutes}</Text>
        <Text style={styles.timerStringValue}> Mins </Text>
        <Text style={styles.timerNumberValue}>{seconds}</Text>
        <Text style={styles.timerStringValue}> Secs</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundRounded: {
    backgroundColor: "#1D1811",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 25,
    marginBottom: 10,
    border: "1px solid #382E23",
  },
  timerSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerTitle: {
    fontFamily: "Inter-Medium",
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
