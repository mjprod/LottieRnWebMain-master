import React from "react";
import { Text, View, StyleSheet } from "react-native";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import { Colors, Fonts } from "../util/constants";
import PurplePill from "./BetaCompetitionPill";

const TimerComponent = ({ style }) => {
  const [timeLeft] = useTimeLeftForNextDraw();

  return (
    <View style={{ ...styles.timerSection, ...style }}>
      <PurplePill text="Time to next draw" />
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  timerContainer:{
    marginTop: 16,
  },
  timerSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  timerTitle: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 14,
    color: Colors.jokerWhite50,
  },
  timerNumberValue: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 16,
    width: 24,
    color: Colors.jokerWhite50,
    marginRight: 2,
  },
  timerStringValue: {
    fontFamily: Fonts.InterSemiBold,
    fontSize: 14,
    color: Colors.jokerBlack50,
    marginRight: 8
  },
});

export default TimerComponent;
