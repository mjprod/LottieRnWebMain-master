import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { ImageBackground } from "react-native-web";
import { IconJokerPlus } from "../assets/icons/IconJokerPlus";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import { IconFourLeafClover } from "../assets/icons/IconFourLeafClover";
import LottieLuckySymbolCoinSlot from "./LottieLuckySymbolCoinSlot";

const GameOverScreen = ({ luckySymbolCount }) => {
  const backgroundResult = require("./../assets/image/background_result_page.png");
  const backgroundLuckySymbol = require("./../assets/image/background_result_lucky_symbol.png");

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={backgroundResult}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <View style={styles.margim}>
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <IconJokerPlus />
              </View>
              <Text style={styles.title}>TURBO SCRATCH RESULTS</Text>
            </View>

            <View style={styles.resultRow}>
              <View style={styles.resultCard}>
                <View style={styles.viewRow}>
                  <IconStarResultScreen />
                  <Text style={styles.resultTitle}>TOTAL POINTS</Text>
                </View>
                <Text style={styles.resultPoints}>+9999</Text>
              </View>
              <View style={{ width: 10 }} />
              <View style={styles.resultCard}>
                <View style={styles.viewRow}>
                  <IconFourLeafClover />
                  <Text style={styles.resultTitle}>LUCKY SYMBOLS</Text>
                </View>

                <ImageBackground
                  resizeMode="contain"
                  source={backgroundLuckySymbol}
                  style={styles.imageBackgroundLuckySymbol}
                >
                  <LottieLuckySymbolCoinSlot
                    luckySymbolCount={luckySymbolCount}
                    topLayout={false}
                  />
                </ImageBackground>
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
              <View style={styles.containerTotalTicket}>
                <Text style={styles.nextTicketText}>Next Ticket</Text>
                <Text style={styles.ticketProgress}>12456 / 20000</Text>
              </View>

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
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  margim: {
    width: "85%",
  },
  imageBackground: {
    width: "100%",
    height: "96%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "12%",
  },
  imageBackgroundLuckySymbol: {
    width: 100,
    height: 45,
    alignItems: "center",
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
    padding: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontFamily: "Teko-Medium",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 3,
  },
  resultPoints: {
    fontFamily: "Teko-Medium",
    fontSize: 30,
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
    padding: 8,
  },
  ticketTitle: {
    fontFamily: "Teko-Medium",
    fontSize: 18,
    color: "#fff",
  },
  nextTicketText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  ticketProgress: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  addedPoints: {
    width: "100%",
    fontFamily: "Teko-Medium",
    fontSize: 22,
    color: "#00ff00",
    textAlign: "end",       // Alinha o texto à direita
    paddingRight: "10px",   // Adiciona espaço à direita para afastar o texto da borda
    marginRight: "10px", 
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
  viewRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textColumnRigth: {
    position: "relative",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  containerTotalTicket: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default GameOverScreen;
