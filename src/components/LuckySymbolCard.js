import React from "react";
import { View } from "react-native";
import StatCard from "./StatCard";
import LuckySymbolSlot from "./LuckySymbolSlot";
import { useGame } from "../context/GameContext";
import { IconFourLeafClover } from "../assets/icons/IconFourLeafClover";

const LuckySymbolCard = () => {
  const { luckySymbolCount } = useGame();
  return (
    <StatCard title="Lucky charm" titleIcon={<IconFourLeafClover />}>
      <View style={{ flexDirection: "row" }}>
        <LuckySymbolSlot showCoin={luckySymbolCount >= 1} style={{ zIndex: 3 }} />
        <LuckySymbolSlot showCoin={luckySymbolCount >= 2} style={{ zIndex: 2 }} />
        <LuckySymbolSlot showCoin={luckySymbolCount >= 3} style={{ zIndex: 1 }} />
      </View>
    </StatCard>
  );
};

export default LuckySymbolCard;
