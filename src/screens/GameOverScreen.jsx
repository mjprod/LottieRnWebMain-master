import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { useLocation } from "react-router";
import { IconJokerPlus } from "../assets/icons/IconJokerPlus";
import GameButton from "../components/GameButton";
import TimerComponent from "../components/TimerComponent";
import { Colors, Dimentions, Fonts } from "../util/constants";
import RaffleTicketCard from "../components/RaffleTicketCard";
import useAppNavigation from "../hook/useAppNavigation";
import useApiRequest from "../hook/useApiRequest";
import StatCard from "../components/StatCard";
import LuckySymbolCard from "../components/LuckySymbolCard";
import AssetPack from "../util/AssetsPack";
import LinearGradient from "react-native-web-linear-gradient";
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
      const username = location.state.username;
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
      <ImageBackground style={styles.header} source={AssetPack.backgrounds.TOP_NAV_HEROES}>
        <LinearGradient
          colors={[Colors.transparent, Colors.transparent, Colors.background, Colors.background]}
          locations={[0, 0.5, 0.9, 1]}
          style={styles.linearGradient}>
          <View style={styles.iconWrapper}>
            <IconJokerPlus />
          </View>
          <Text style={styles.title}>TURBO SCRATCH RESULTS</Text>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.body}>
        <View style={styles.resultRow}>
          <StatCard title="Total Points" stat={userData.total_score} />
          <View style={{ width: 10 }} />
          <LuckySymbolCard />
        </View>
        <RaffleTicketCard
          containerStyle={{ marginTop: 8 }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  linearGradient: {
    width: "100%",
    height: "auto",
    paddingHorizontal: Dimentions.pageMargin,
    flex: 1,
    alignItems: "start",
    justifyContent: "start",
    paddingBottom: Dimentions.sectionMargin,
    paddingTop: Dimentions.marginXL,
    alignItems: "center",
    resizeMode: "cover",
  },
  header: {
    height: 367,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  title: {
    color: Colors.jokerWhite50,
    fontFamily: Fonts.TekoMedium,
    marginVertical: Dimentions.marginS,
    fontSize: 32,
  },
  body: {
    marginTop: -150,
    paddingHorizontal: Dimentions.pageMargin,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  timerContainer: {
    flexGrow: 1,
    marginTop: Dimentions.marginL,
    marginBottom: Dimentions.marginL,
  },
});

export default GameOverScreen;
