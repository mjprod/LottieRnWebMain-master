import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import AssetPack from "../util/AssetsPack";
import PurplePill from "./BetaCompetitionPill";
import LinearGradient from "react-native-web-linear-gradient";
import { Colors, Dimentions, Fonts } from "../util/constants";
import { useNavigate } from "react-router";

const TopBannerNav = ({
  title = "Scratch to win!",
  subtitle = "Your next prize awaits.",
  backgroundImage = AssetPack.backgrounds.TOP_NAV_HEROES,
  onBackPress,
  hasBackButton = false,
}) => {
  const navigate = useNavigate();

  const onBackPressLocal = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigate(-1);
    }
  };

  return (
    <View style={{ alignItems: "start", height: 284}} >
      <Image source={backgroundImage} style={{ width: "100%", height: 284 , position: "absolute", top: -40}} />
      <LinearGradient
        colors={[Colors.transparent, Colors.transparent, Colors.background, Colors.background]}
        locations={[0, 0.5, 0.9, 1]}
        style={styles.linearGradient}>
        <View style={styles.topContainer}>
          {hasBackButton && (
            <Pressable onPress={onBackPressLocal} style={{ alignContent: "center", alignItems: "center", justifyContent: "center" }}>
              <Image
                resizeMode="contain"
                style={styles.arrowIcon}
                source={AssetPack.icons.ARROW_LEFT} />
            </Pressable>
          )}
          <PurplePill
            text={"Beta Competition"}
            style={styles.betaCompetitionText} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: Dimentions.marginL,
    marginBottom: 28,
  },
  arrowIcon: {
    width: 21,
    height: 21,
    marginRight: Dimentions.marginL,
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
    justifyContent: "start",
    paddingBottom: Dimentions.sectionMargin,
    paddingTop: Dimentions.pageMargin,
  },
});

export default TopBannerNav;
