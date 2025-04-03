import React from "react";
import { View } from "react-native";
import { useNavigate } from "react-router-dom";
import TopBannerNav from "../../components/TopBannerNav";
import AssetPack from "../../util/AssetsPack";
import ShowCaseCarousel from "./components/ShowCaseCarousel";
import { Colors } from "../../util/constants";

const HowToPlayScreen = () => {
  const navigate = useNavigate();

  const handleBackPress = () => {
    navigate(-1);
  };
  const carouselItems = [
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_1,
    },
    {
      description: "Scratch off the symbols to begin your game.",
      image: AssetPack.images.CAROUSEL_ITEM_2,
    },
    {
      description:
        "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_3,
    },
  ];
  return (
    <View style={{ flex: 1, paddingBottom: 20, backgroundColor: Colors.background }}>
      <TopBannerNav
        title="Master the Game"
        subtitle="Simple steps. Epic rewards."
        backgroundImage={AssetPack.backgrounds.TOP_NAV_LEARN}
        hasBackButton={true}
        onBackPress={handleBackPress}
      />
      <ShowCaseCarousel slideList={carouselItems} style={{ marginTop: -70 }} />
    </View>
  );
};

export default HowToPlayScreen;
