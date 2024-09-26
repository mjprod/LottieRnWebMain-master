import React from "react";
import { View, Image, StyleSheet, Platform, Text } from "react-native";
import { ImageBackground } from "react-native-web";
import { LottieView } from "react-native-web-lottie";
import { IconJokerPlus } from "../assets/icons/IconJokerPlus";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import { IconFourLeafClover } from "../assets/icons/IconFourLeafClover";

const GameOverScreen = () => {
  const backgroundResult = require("./../assets/image/background_result_page.png");

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundResult}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <IconJokerPlus />
            </View>

            <Text style={styles.title}>TURBO SCRATCH RESULTS</Text>
          </View>

          <View style={styles.resultRow}>
            <View style={styles.resultCard}>
              <IconStarResultScreen />
              <Text style={styles.resultTitle}>TOTAL POINTS</Text>
              <Text style={styles.resultPoints}>+9999</Text>
            </View>

            <View style={styles.resultCard}>
              <IconFourLeafClover />
              <Text style={styles.resultTitle}>LUCKY SYMBOLS</Text>
              <View style={styles.luckySymbols}>
                {/* 

                 <View style={styles.symbol}>
                  <LottieView
                    style={styles.symbolImage}
                    source={require("./../assets/lotties/lottie3DCoinSlot.json")}
                    autoPlay
                    speed={1}
                    loop={false}
                  />
                </View>

                <View style={styles.symbol}>
                  <LottieView
                    style={styles.symbolImage}
                    source={require("./../assets/lotties/lottie3DCoinSlot.json")}
                    autoPlay
                    speed={1}
                    loop={false}
                  />
                </View>
                <View style={styles.symbol}>
                  <LottieView
                    style={styles.symbolImage}
                    source={require("./../assets/lotties/lottie3DCoinSlot.json")}
                    autoPlay
                    speed={1}
                    loop={false}
                  />
                </View>*/}
              </View>
            </View>
          </View>

          {/* Total Tickets Earned Section */}
          <View style={styles.ticketsSection}>
            <Text style={styles.ticketTitle}>TOTAL TICKETS EARNED</Text>
            <Text style={styles.nextTicketText}>Next Ticket</Text>

            <Text style={styles.ticketProgress}>12456 / 20000</Text>
            <Text style={styles.addedPoints}>+9999</Text>
          </View>

          {/* Timer Section */}
          <View style={styles.timerSection}>
            <Text style={styles.timerTitle}>Time till Next Draw</Text>
            <Text style={styles.timerValue}>
              88 Days 88 Hrs 88 Mins 88 Secs
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for win screen
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
       // backgroundColor: "rgba(0, 0, 0, 0.5)", // Same semi-transparent background for mobile
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  imageBackground: {
    width: "100%",
    height: "95%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "12%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  title: {
    color: "#FFDEA8",
    fontFamily: "Teko-Medium",
    fontSize: 32,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  resultCard: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
    margin: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: "Teko-Medium",
    color: "#fff",
  },
  resultPoints: {
    fontFamily: "Teko-Medium",
    fontSize: 22,
    color: "#00ff00",
  },
  luckySymbols: {
    flexDirection: "row",
  },
  symbol: {
    marginHorizontal: 5,
  },
  symbolImage: {
    width: 50,
    height: 50,
  },
  ticketsSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
  },
  ticketTitle: {
    fontFamily: "Teko-Medium",
    fontSize: 18,
    color: "#fff",
  },
  nextTicketText: {
    fontFamily: "Teko-Medium",
    fontSize: 16,
    color: "#aaa",
  },
  ticketProgress: {
    fontFamily: "Teko-Medium",
    fontSize: 14,
    color: "#fff",
  },
  addedPoints: {
    fontFamily: "Teko-Medium",
    fontSize: 22,
    color: "#00ff00",
  },
  timerSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timerTitle: {
    fontFamily: "Teko-Medium",
    fontSize: 18,
    color: "#fff",
  },
  timerValue: {
    fontFamily: "Teko-Medium",
    fontSize: 22,
    color: "#fff",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
