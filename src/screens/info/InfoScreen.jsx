import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import useApiRequest from "../../hook/useApiRequest";
import useAppNavigation from "../../hook/useAppNavigation";
import { useGame } from "../../context/GameContext";
import ThankYouContent from "./components/ThankYouContent";
import DrawInProgressContent from "./components/DrawInProgressContent";
import WeAreExtendingContent from "./components/WeAreExtendingContent";
import LoadingView from "../../components/LoadingView";
import Congratulations from "./components/Congratulations";
import TopNavScreenTemplate from "../../templates/TopNavTemplate";
import AssetPack from "../../util/AssetsPack";
import { Dimentions, Colors } from "../../util/constants";
import GameButton from "../../components/GameButton";
import PropTypes, { func } from 'prop-types';

InfoScreen.propTypes = {
  contentName: PropTypes.oneOf([
    InfoScreenContents.extending,
    InfoScreenContents.thank_you,
    InfoScreenContents.in_progress,
    InfoScreenContents.congratulations,
  ]).isRequired,
};

export const InfoScreenContents = {
  extending: "we_are_extending",
  thank_you: "thank_you",
  in_progress: "draw_in_progress",
  congratulations: "congratulations",
};

export function InfoScreen({ contentName }) {
  const appNavigation = useAppNavigation();

  const { user, setUser } = useGame();

  const { fetchUserDetails } = useApiRequest();

  const [content, setContent] = useState();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
  const [navBackgroudImage, setNavBackgroundImage] = useState();
  const [navBackgroudVideo, setNavBackgroundVideo] = useState();
  const [backgroundImage, setBackgroundImage] = useState();

  const [pillText, setPillText] = useState("Beta Competition");

  useEffect(() => {
    if (location.state && location.state !== null) {
      const id = location.state.user_id;
      const username = location.state.name;
      const email = location.state.email;

      fetchUserDetails(id, username, email).then((response) => {
        if (response.user) {
          setUser(response.user);
        }
      });
    }
  }, [location]);

  useEffect(() => {
    if (!user) {
      appNavigation.goToNotFoundPage();
    }
  }, [user]);

  useEffect(() => {
    switch (contentName) {
      case InfoScreenContents.extending:
        setContent(<WeAreExtendingContent />);
        setTitle("Time Is on Your Side");
        setSubtitle("One more week. Let’s go.");
        setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_EXTENDING_PLAY);
        setNavBackgroundVideo(AssetPack.videos.TOP_NAV_EXTENDING_PLAY);
        setBackgroundImage(AssetPack.backgrounds.INFO_PAGE);
        break;
      case InfoScreenContents.thank_you:
        setContent(<ThankYouContent />);
        setTitle("Round complete");
        setSubtitle("Get ready to scratch again soon.");
        setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_THANK_YOU);
        setNavBackgroundVideo(AssetPack.videos.TOP_NAV_THANK_YOU);
        setBackgroundImage(AssetPack.backgrounds.INFO_PAGE);
        break;
      case InfoScreenContents.in_progress:
        setContent(<DrawInProgressContent ticketsEarned={user.ticket_balance} />);
        setTitle("Fortune Is Deciding");
        setSubtitle("One player. One prize. One moment.");
        setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_DRAW_IN_PROGRESS);
        setNavBackgroundVideo(AssetPack.videos.TOP_NAV_DRAW_IN_PROGRESS);
        setBackgroundImage(AssetPack.backgrounds.INFO_PAGE);
        break;
      case InfoScreenContents.congratulations:
        setContent(<Congratulations />);
        setTitle("The gods are impressed");
        setSubtitle("Claim your prize. You've earned it.");
        setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_GODS_ARE_IMPRESSED);
        setNavBackgroundVideo(AssetPack.videos.TOP_NAV_GODS_ARE_IMPRESSED);
        setBackgroundImage(AssetPack.backgrounds.CONGRATS_BACKGROUND);
        setPillText("Beta Winner");
        break;
      default: appNavigation.goToNotFoundPage();
    }
  }, [contentName]);

  if (!user) {
    return (
      <LoadingView />
    );
  }
  return (
    <TopNavScreenTemplate
      title={title}
      subtitle={subtitle}
      navBackgroudImage={navBackgroudImage}
      navBackgroudVideo={navBackgroudVideo}
      hasBackButton={false}
      pillText={pillText}
      showProfileHeader={false}
      showCopyright={false}>
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImageContainer} resizeMode='cover' source={backgroundImage}>
          {content}
          <GameButton
            style={{ width: "100%", marginBottom: Dimentions.marginXL }}
            text="TAKE ME BACK"
            onPress={() => { }} />
        </ImageBackground>
      </View>
    </TopNavScreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: "hidden",
    backgroundColor: Colors.background,
    borderColor: Colors.jokerBlack200,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopWidth: 1,
  },
  backgroundImageContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
export default InfoScreen;
