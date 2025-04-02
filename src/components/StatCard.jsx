import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import { ActivityIndicator } from "react-native-web";
import { Dimentions, Fonts } from "../util/constants";

const StatCard = ({ title = "Title", titleIcon = <IconStarResultScreen />, stat = "0", children }) => {
    return (<View style={styles.card}>
        <View style={styles.viewRow}>
            {titleIcon}
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ borderBottomWidth: 1, width: "100%", borderColor: "#3D3D3D", marginVertical: Dimentions.marginS }} />
        {!children ? <Text style={styles.statText}>{stat}</Text> : children}
    </View>);
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid #3D3D3D",
        borderRadius: 12,
        backgroundColor: "#131313",
        padding: Dimentions.contentPadding,
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.InterRegular,
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 3,
    },
    statText: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 40,
        color: "#FFEEC0",
        margin: -5,
    }
});

export default StatCard;