import React, { useEffect, useState } from "react";
import LottieView from "react-native-web-lottie";
import { StyleSheet, View } from "react-native";
import { useGame } from "../context/GameContext";

const LottieTicketSlot = ({ ticketCount }) => {
  const { ticketCount } = useGame();

  const [activeAnimation, setActiveAnimation] = useState(0);

  useEffect(() => {
    if (ticketCount > 0) {
      // Trigger each animation with a delay of 1 second between them
      for (let i = 0; i < ticketCount; i++) {
        setTimeout(() => {
          setActiveAnimation(i + 1);
        }, i * 1500); // 1500 ms = 1 second delay
      }
    }
  }, [ticketCount]);

  return (
    <View style={styles.lottieContainer}>
      {[...Array(ticketCount)].map((_, i) => (
        <View key={i} style={styles.lottieWrapper}>
          {activeAnimation > i && (
            <LottieView
              style={styles.lottieLuckyResultAnimation}
              source={require("../assets/lotties/lottieTicketEntry.json")}
              autoPlay
              speed={1}
              loop={false}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    position: "absolute",
    width: "50%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    left: -10,
    bottom: 18,
  },
  lottieLuckyResultAnimation: {
    width: "170%",
    height: "170%",
    marginHorizontal: -30,
    marginTop: 0,
    marginLeft: 0,
  },
  lottieWrapper: {
    width: "100%",
    height: "100%",
    marginHorizontal: -10,
  },
});

export default LottieTicketSlot;
