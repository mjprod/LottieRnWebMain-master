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
import { useGame } from "../context/GameContext";
import LoadingView from "../components/LoadingView";
import TopNavTemplate from "../templates/TopNavTemplate";
import { TopBannerNavType } from "../components/TopBannerNav";
import SectionTitle from "../components/SectionTitle";

const GameOverScreen = () => {
  const appNavigation = useAppNavigation()
  const { fetchUserDetails } = useApiRequest();

  const location = useLocation()
  const { user, setUser } = useGame();

  useEffect(() => {
    if (location.state) {
      const { username, email, user_id } = location.state;
      if (user_id && username && email) {
        fetchUserDetails(user_id, username, email).then((response) => {
          setUser(response.user);
        }).catch((error) => {
          console.error('Login failed:', error);
        });
      } else {
        appNavigation.goToNotFoundPage();
      }
    } else {
      appNavigation.goToNotFoundPage();
    }
  }, [location]);

  if (!user) {
    return <LoadingView />;
  }

  return (
    <TopNavTemplate
      title={user.name} subtitle={"Claim what’s yours"}
      type={TopBannerNavType.startFinish}
      navBackgroudImage={AssetPack.backgrounds.TOP_NAV_LEARN}
      navBackgroudVideo={AssetPack.videos.TOP_NAV_LEARN}
      showProfileHeader={false}
      showCopyright={false}>
      <View style={styles.body}>
        <SectionTitle style={{ marginBottom: 24 }} text={"Game summary"} />
        <View style={styles.resultRow}>
          <StatCard title="Total Points" stat={user.total_score} />
          <View style={{ width: 10 }} />
          <LuckySymbolCard />
        </View>
        <RaffleTicketCard
          containerStyle={{ marginTop: 8 }}
          score={user.total_score}
          ticketCount={user.ticket_balance}
        />
        <View style={{ flexGrow: 1 }} />
        <GameButton
          style={{ marginBottom: Dimentions.marginL, marginTop: 48 }}
          text="BACK HOME"
          onPress={() => {
            appNavigation.goToLaunchScreen(
              user.user_id,
              user.name,
              user.email
            );
          }}
        />
      </View>
    </TopNavTemplate>
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
    flex: 1,
    borderTopColor: Colors.jokerBlack200,
    borderTopWidth: 1,
    paddingTop: 32,
    marginHorizontal: Dimentions.pageMargin,
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
