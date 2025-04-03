import React from "react";
import { StyleSheet, View } from "react-native";
import StatCard from "./StatCard";
import LuckySymbolSlot from "./LuckySymbolSlot";
import { useGame } from "../context/GameContext";

const LuckySymbolCard = () => {
    const { luckySymbolCount } = useGame();
    return (
        <StatCard title="Lucky Charms">
            <View style={{ flexDirection: "row" }}>
                <LuckySymbolSlot showCoin={luckySymbolCount >= 1} />
                <LuckySymbolSlot showCoin={luckySymbolCount >= 2} />
                <LuckySymbolSlot showCoin={luckySymbolCount >= 3} />
            </View>
        </StatCard>
    );
};

const styles = StyleSheet.create({

});

export default LuckySymbolCard;
