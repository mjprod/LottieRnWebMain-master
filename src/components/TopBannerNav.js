import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import AssetPack from "../util/AssetsPack";
import PurplePill from "./PurplePill";
import LinearGradient from "react-native-web-linear-gradient";
import { Colors, Dimentions, Fonts } from "../util/constants";
import { useNavigate } from "react-router";

const TopBannerNav = ({
  title = "Be in to win Prizes!",
  subtitle = "Scratch for more chances to win!",
  backgroundImage = AssetPack.backgrounds.TOP_NAV_BACKGROUND,
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
    <ImageBackground style={{ alignItems: "start" }} resizeMode="cover" source={backgroundImage} >
      <LinearGradient
        colors={[Colors.transparent, Colors.transparent, Colors.background]}
        style={styles.linearGradient}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          {hasBackButton && (
            <TouchableOpacity onPress={onBackPressLocal}>
              <Image
                resizeMode="contain"
                style={styles.arrowIcon}
                source={AssetPack.icons.ARROW_LEFT} />
            </TouchableOpacity>
          )}
          <PurplePill
            text={"Beta Competition"}
            style={styles.betaCompetitionText} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    width: 21,
    height: 21,
    marginRight: Dimentions.marginS
  },
  betaCompetitionText: {
    marginBottom: Dimentions.pageMargin,
    marginTop: 20,
    letterSpacing: 1,
    zIndex: 9999,
  },
  title: {
    fontFamily: Fonts.TekoMedium,
    color: "#fff",
    fontSize: 28,
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: Fonts.InterRegular,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  linearGradient: {
    width: "100%",
    height: "auto",
    paddingHorizontal: Dimentions.pageMargin,
    flex: 1,
    alignItems: "start",
    paddingBottom: Dimentions.sectionMargin,
    paddingTop: Dimentions.pageMargin,
  },
});

export default TopBannerNav;
