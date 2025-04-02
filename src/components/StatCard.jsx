import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconStarResultScreen } from "../assets/icons/IconStarResultScreen";
import  {ActivityIndicator} from "react-native-web";
import { Fonts } from "../util/constants";

const StatCard = ({ title = "Title", titleIcon = <IconStarResultScreen />, stat = "0", loading, children }) => {
    const LoadingView = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
        );
    };
    return (<View style={styles.card}>
        <View style={styles.viewRow}>
            {titleIcon}
            <Text style={styles.title}>{title}</Text>
        </View>
        {loading ? (
            <LoadingView />
        ) : (
            !children ? <Text style={styles.statText}>{stat}</Text> : children
        )}

    </View>);
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #3D3D3D",
        borderRadius: 12,
        paddingVertical: "5%",
        paddingHorizontal: "3%",
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
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
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#FFEEC0",
    }
});

export default StatCard;