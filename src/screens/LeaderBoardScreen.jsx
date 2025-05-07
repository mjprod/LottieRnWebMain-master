import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SectionTitle from "../components/SectionTitle";
import GameButton from "../components/GameButton";
import LeaderBoardList from "../components/LeaderBoardList";
import { useLocation } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import NextDrawCard from "../components/NextDrawCard";
import useApiRequest from "../hook/useApiRequest";
import { Colors, Dimentions } from "../util/constants";
import useAppNavigation from "../hook/useAppNavigation";
import { useGame } from "../context/GameContext";
import { useSnackbar } from "../components/SnackbarContext";
import TopNavTemplate from "../templates/TopNavTemplate";
import AssetPack from "../util/AssetsPack";

const LeaderBoardScreen = () => {
  const location = useLocation();
  const appNavigation = useAppNavigation();
  const { showSnackbar } = useSnackbar();
  const { user, setUser } = useGame();

  const { fetchUserDetails, response } = useApiRequest();

  useEffect(() => {
    if (location.state) {
      const id = location.state.user_id;
      const username = location.state.name;
      const email = location.state.email;

      fetchUserDetails(id, username, email);
    }
  }, [location]);

  useEffect(() => {
    if (response && response.user) {
      console.log(response.user);
      setUser(response.user);
    }
  }, [response]);

  const handlePlayNowButtonPress = () => {
    if (user.card_balance <= 0) {
      showSnackbar("You don't have any cards left. Please wait till next day to play the game!");
    } else {
      appNavigation.goToStartPage(user.user_id, user.name, user.email);
    }
  };
  return (
    <TopNavTemplate
      title="Champions Rise"
      subtitle="The top players of the realm."
      navBackgroudImage={AssetPack.backgrounds.TOP_NAV_LEADER_BOARD}
      navBackgroudVideo={AssetPack.videos.TOP_NAV_LEADER_BOARD}
      hasBackButton={true}
      showProfileHeader={false}>
      <View style={styles.container}>
        <SectionTitle text="LeaderBard" style={{ marginBottom: 24 }} />
        <LeaderBoardList
          style={{ marginBottom: 32 }}
          username={user && user.name} 
          beta_block_id={user && user.current_beta_block}/>
        <GameButton style={{ marginBottom: 32 }} text="Play Now" onPress={handlePlayNowButtonPress} />
        <LinkButton
          style={{ marginBottom: 48 }}
          text={"How To Play Turbo Scratch >"}
          handlePress={appNavigation.goToHowToPlayPage} />
        <NextDrawCard />
      </View>
    </TopNavTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.jokerBlack800,
    borderColor: Colors.jokerBlack200,
    paddingTop: Dimentions.marginL,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopWidth: 1,
  },
});

export default LeaderBoardScreen;
