import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "react-native-web";
import { useLocation } from "react-router";
import { IconJokerPlus } from "../assets/icons/IconJokerPlus";
import GameButton from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import TimerComponent from "../components/TimerComponent";
import LinearGradient from 'react-native-web-linear-gradient';
import AssetPack from "../util/AssetsPack";
import { Dimentions } from "../util/constants";
import RaffleTicketCard from "../components/RaffleTicketCard";
import useAppNavigation from "../hook/useAppNavigation";
import useApiRequest from "../hook/useApiRequest";
import StatCard from "../components/StatCard";

const GameOverScreen = () => {
  const appNavigation = useAppNavigation()
  const {
    response,
    fetchUserDetails,
  } = useApiRequest();

  const location = useLocation()
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (location.state !== null) {
      const id = location.state.user_id;
      const username = location.state.name;
      const email = location.state.email;

      fetchUserDetails(id, username, email);
    }
  }, [location]);

  useEffect(() => {
    if (response) {
      if (response.user) {
        setUserData(response.user);
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <LinearGradient start={{ x: 0.0, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.3, 0.45, 0.55, 1.0]}
        colors={['#212121', '#262E33', '#1D4A64', '#24282B', '#212121']}
        style={styles.imageBackground}>

        <View style={styles.rotatingBackgroundContainer}>
          <RotatingCirclesBackground />
        </View>

        <View style={styles.container}>
          <View style={styles.margim}>
            <View style={styles.header}>
              <View style={styles.iconWrapper}>
                <IconJokerPlus />
              </View>
              <Text style={styles.title}>TURBO SCRATCH RESULTS</Text>
            </View>

            <View style={styles.resultRow}>
              <StatCard title="Total Points" stat={userData.total_score} />
              <View style={{ width: 10 }} />
              <StatCard title="LUCKY SYMBOLS">
                <ImageBackground
                  resizeMode="contain"
                  source={AssetPack.backgrounds.LUCKY_SYMBOL}
                  style={styles.imageBackgroundLuckySymbol}>
                  <LottieLuckySymbolCoinSlot topLayout={false} />
                </ImageBackground>
                <View style={styles.luckySymbols}></View>
              </StatCard>
            </View>
            <RaffleTicketCard
              score={userData.total_score}
              ticketCount={userData.ticket_balance}
            />
            <TimerComponent
              style={styles.timerContainer} />
            <GameButton
              text="BACK HOME"
              onPress={() => {
                appNavigation.goToLaunchScreen(
                  userData.user_id,
                  userData.name,
                  userData.email
                );
              }}
            />
          </View>
        </View>
      </LinearGradient>
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
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 1000,
      },
      default: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: 1000,
      },
    }),
  },
  margim: {
    marginTop: 10,
    width: "85%",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "0%",
  },
  imageBackgroundLuckySymbol: {
    width: 100,
    height: 45,
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
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
  symbolImage: {
    width: 50,
    height: 50,
  },
  ticketsSection: {
    marginTop: 20,
    marginBottom: Dimentions.pageMargin,
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #4B595D",
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    textAlign: "end",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
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
  },
  slider: {
    height: 1,
    maxHeight: 1,
    transform: [{ scaleY: 4, scaleX: 4 }],
    zIndex: 999,
    elevation: 10,
  },
  thumb: {
    width: 0,
    height: 0,
  },
  sliderContainer: {
    width: "100%",
    //height: 20,
    marginVertical: 10,
    borderRadius: 50,
    backgroundColor: "#000000",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  timerContainer: {
    marginVertical: Dimentions.sectionMargin,
    alignItems: "center",
  },
  rotatingBackgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default GameOverScreen;
