import React from "react";
import LuckySymbolSlot from "./LuckySymbolSlot";
import { useGame } from "../context/GameContext";
import { View } from "react-native-web";

const LuckySymbolsSlot = () => {
    const { luckySymbolCount } = useGame();
    return (
        <View style={{ flexDirection: "row" }}>
            <LuckySymbolSlot showCoin={luckySymbolCount >= 1} style={{ zIndex: 3 }} />
            <LuckySymbolSlot showCoin={luckySymbolCount >= 2} style={{ zIndex: 2 }} />
            <LuckySymbolSlot showCoin={luckySymbolCount >= 3} style={{ zIndex: 1 }} />
        </View>
    );
};

export default LuckySymbolsSlot;
