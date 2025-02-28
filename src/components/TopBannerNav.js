import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AssetPack from "../util/AssetsPack";
import PurplePill from "./PurplePill";

const TopBannerNav = ({
  title = "Be in to win Prizes!",
  subtitle = "Scratch for more chances to win!",
  backgroundImage = AssetPack.backgrounds.TOP_NAV_BACKGROUND,
  onBackPress = () => {},
  hasBackButton = false,
}) => {
  return (
    <ImageBackground
      imageStyle={{ resizeMode: "stretch" }}
      style={{ flex: 1, padding: 30, alignItems: "start" }}
      source={backgroundImage}
    >
      {hasBackButton && (
        <TouchableOpacity onPress={onBackPress}>
          <Image style={styles.arrowIcon} source={AssetPack.icons.ARROW_LEFT} />
        </TouchableOpacity>
      )}
      <PurplePill
        text={"Beta Competition"}
        style={styles.betaCompetitionText}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  arrowIcon: { flex: 1, width: 21, height: 21, resizeMode: "contain" },
  betaCompetitionText: {
    marginBottom: 20,
    marginTop: 20,
    letterSpacing: 1,
  },
  title: {
    fontFamily: "Inter-Bold",
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default TopBannerNav;
