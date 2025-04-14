import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import AssetPack from "../util/AssetsPack";
import PurplePill from "./BetaCompetitionPill";
import LinearGradient from "react-native-web-linear-gradient";
import { Colors, Dimentions, Fonts } from "../util/constants";
import { useNavigate } from "react-router";
import useIsIosWebview from "../hook/useIosWebview";
import Video from "./Video";

export const TopBannerNavType = {
  home: "home",
  startFinish: "startFinish",
}

const TopBannerNav = ({
  title,
  subtitle,
  backgroundImage = AssetPack.backgrounds.TOP_NAV_HEROES,
  onBackPress,
  hasBackButton = false,
  pillText = "Beta Competition",
  type = TopBannerNavType.home,
  style = {},
}) => {
  const navigate = useNavigate();
  const isIosWebview = useIsIosWebview();

  const onBackPressLocal = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigate(-1);
    }
  };

  if (type === TopBannerNavType.home) {
    return (
      <View style={[style, { overflow: "hidden", alignItems: "start", height: 226 }]} >
        <Video
          source={AssetPack.videos.TOP_NAV_LANDING}
          loop={true}
          style={[{ width: "100%", height: 284, position: "absolute" }]} />
        <LinearGradient
          colors={[Colors.transparent, Colors.background]}
          locations={[0, 1]}
          style={styles.linearGradient}>
          <View style={[styles.topContainer]}>
            {hasBackButton && (
              <Pressable onPress={onBackPressLocal} style={{ alignContent: "center", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <Image
                  resizeMode="contain"
                  style={styles.arrowIcon}
                  source={AssetPack.icons.ARROW_LEFT} />
              </Pressable>
            )}
            <PurplePill
              text={pillText}
              style={styles.betaCompetitionText} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </LinearGradient>
      </View>
    );
  } else if (type === TopBannerNavType.startFinish) {
    return (
      <View style={[style, { alignItems: "start", height: 226 }]} >
        <Video
          source={AssetPack.videos.TOP_NAV_LANDING}
          loop={true}
          style={[{ width: "100%", height: 284, position: "absolute" }]} />
        <LinearGradient
          colors={[Colors.transparent, Colors.background]}
          locations={[0, 1]}
          style={[{
            width: "100%",
            height: "auto",
            paddingHorizontal: Dimentions.pageMargin,
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 32
          }]}>
          <Text style={{ fontFamily: Fonts.InterSemiBold, color: Colors.jokerWhite50, fontSize: 16, marginBottom: 8 }}>{subtitle}</Text>
          <Text style={{ fontFamily: Fonts.TekoMedium, color: Colors.jokerGold400, fontSize: 38, textTransform: "uppercase" }}>{title}</Text>
        </LinearGradient>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 28,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginRight: 28,
  },
  betaCompetitionText: {
    letterSpacing: 1,
  },
  title: {
    fontFamily: Fonts.TekoMedium,
    color: Colors.jokerWhite50,
    fontSize: 36,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginVertical: -10
  },
  subtitle: {
    fontFamily: Fonts.InterRegular,
    color: Colors.jokerBlack50,
    fontSize: 18,
    letterSpacing: "1%",
    marginTop: 2
  },
  linearGradient: {
    width: "100%",
    height: "auto",
    paddingHorizontal: Dimentions.pageMargin,
    flex: 1,
    alignItems: "start",
    justifyContent: "center",
    paddingBottom: Dimentions.sectionMargin,
    paddingTop: Dimentions.pageMargin,
  },
});

export default TopBannerNav;
