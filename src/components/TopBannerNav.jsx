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
import Video from "./Video";
import useAppNavigation from "../hook/useAppNavigation";

export const TopBannerNavType = {
  home: "home",
  startFinish: "startFinish",
};

const TopBannerNav = ({
  title,
  subtitle,
  backgroundImage = AssetPack.backgrounds.TOP_NAV_HEROES,
  backgroundVideo = AssetPack.videos.TOP_NAV_HEROES,
  onBackPress,
  hasBackButton = false,
  blur = false,
  type = TopBannerNavType.home,
  style = {},
}) => {
  const appNavigation = useAppNavigation();

  const onBackPressLocal = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      appNavigation.goBack();
    }
  };
  const hasText = (title !== null && typeof title === 'string' && title.trim() !== '') ||
    (subtitle !== null && typeof subtitle === 'string' && subtitle.trim() !== '');

  if (type === TopBannerNavType.home) {
    return (
      <View style={[style, { overflow: "hidden", alignItems: "start", height: 226 }]} >
        <Video
          source={backgroundVideo}
          poster={backgroundImage}
          loop={true}
          style={[{
            width: "100%",
            height: 226,
            position: "absolute",
            objectFit: "cover",
          }, blur && {
            filter: 'blur(2px)',
            WebkitFilter: 'blur(2px)',
          }]} />
        <LinearGradient
          colors={[blur ? "#00000033" : Colors.transparent, Colors.background]}
          locations={[0, 1]}
          style={styles.linearGradient}>
          <View style={[styles.topContainer, !hasText && { marginBottom: 100 }]}>
            {hasBackButton && (
              <Pressable onPress={onBackPressLocal} style={{ alignContent: "flex-start", alignItems: "flex-start", justifyContent: "flex-start", height: "100%" }}>
                <Image
                  resizeMode="contain"
                  style={styles.arrowIcon}
                  source={AssetPack.icons.ARROW_LEFT} />
              </Pressable>
            )}
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  } else if (type === TopBannerNavType.startFinish) {
    return (
      <View style={[style, { alignItems: "start", height: 226, marginBottom: 0 }]} >
        <Video
          source={backgroundVideo}
          poster={backgroundImage}
          loop={true}
          style={[{ width: "100%", height: 226, position: "absolute" }, blur && { filter: 'blur(2px)', WebkitFilter: 'blur(2px)' }]} />
        <LinearGradient
          colors={[Colors.transparent, Colors.background]}
          locations={[0, 1]}
          style={{
            width: "100%",
            height: "auto",
            paddingHorizontal: Dimentions.pageMargin,
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 32,
          }}>
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
    marginBottom: 28,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginTop: 5,
    marginRight: 28,
  },
  title: {
    fontFamily: Fonts.TekoMedium,
    color: Colors.jokerWhite50,
    fontSize: 36,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginVertical: -10,
  },
  subtitle: {
    fontFamily: Fonts.InterRegular,
    color: Colors.jokerBlack50,
    fontSize: 18,
    letterSpacing: "1%",
    marginTop: 2,
  },
  linearGradient: {
    width: "100%",
    paddingHorizontal: Dimentions.pageMargin,
    flex: 1,
    alignItems: "start",
    paddingBottom: Dimentions.sectionMargin,
    paddingTop: 74,
  },
});

export default TopBannerNav;
