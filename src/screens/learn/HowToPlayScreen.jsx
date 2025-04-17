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
      title: "Reveal card",
      description: "Scratch the surface to reveal the full card underneath.",
      image: AssetPack.images.CAROUSEL_ITEM_1,
    },
    {
      title: "Lvl 1 combos",
      description: "Match 3 of the same symbol to earn 1 scratch ticket.",
      image: AssetPack.images.CAROUSEL_ITEM_2,
    },
    {
      title: "Lvl 2 combos",
      description: "Match 3 of the same symbol to earn 1 scratch ticket.",
      image: AssetPack.images.CAROUSEL_ITEM_3,
    },
    {
      title: "Lvl 3 combos",
      description: "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_4,
    },
    {
      title: "Lvl 4 combos",
      description: "Write some text about this stage in the game for users to follow",
      image: AssetPack.images.CAROUSEL_ITEM_5,
    },
  ];
  return (
    <View style={{ flex: 1, paddingBottom: 20, backgroundColor: Colors.background }}>
      <TopBannerNav
        title="Master the Game"
        subtitle="Simple steps. Epic rewards."
        backgroundImage={AssetPack.backgrounds.TOP_NAV_LEARN}
        backgroundVideo={AssetPack.videos.TOP_NAV_LEARN}
        hasBackButton={true}
        onBackPress={handleBackPress}
      />
      <ShowCaseCarousel slideList={carouselItems} />
    </View>
  );
};

export default HowToPlayScreen;
