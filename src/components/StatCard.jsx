import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import DiagonalGradientCard from "./DiagonalGradientCard";
import  {ActivityIndicator} from "react-native-web";

const StatCard = ({ title = "Title", titleIcon = <IconStarResultScreen />, stat = "0", loading, children }) => {
    const LoadingView = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
        );
    };
    return (<DiagonalGradientCard style={styles.card}>
        <View style={styles.viewRow}>
            {titleIcon}
            <Text style={styles.title}>{title}</Text>
        </View>
        {loading ? (
            <LoadingView />
        ) : (
            !children ? <Text style={styles.statText}>{stat}</Text> : children
        )}

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