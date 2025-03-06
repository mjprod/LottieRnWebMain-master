import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import DiagonalGradientCard from "./DiagonalGradientCard";

const StatCard = ({ title = "Title", titleIcon = <IconStarResultScreen />, stat = "+9999", children }) => {
    return (<DiagonalGradientCard style={styles.card}>
        <View style={styles.viewRow}>
            {titleIcon}
            <Text style={styles.title}>{title}</Text>
        </View>
        {!children ? <Text style={styles.statText}>{stat}</Text> : children}
    </DiagonalGradientCard>);
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #4B595D",
        borderRadius: 12,
        padding: 8,
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontFamily: "Teko-Medium",
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 3,
        textTransform: "uppercase",
    },
    statText: {
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#00ff00",
    }
});

export default StatCard;