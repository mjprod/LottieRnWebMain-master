import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AssetPack from "../util/AssetsPack";

const RoundedButton = ({
    title,
    onPress,
    style,
}) => {
    return (
        <View style={style}>
            <TouchableOpacity style={styles.background} onPress={onPress}>
                <Image
                    resizeMode="contain"
                    style={{ width: 20, height: 19 }}
                    source={AssetPack.icons.ARROW_LEFT} />
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 60,
        paddingVertical: 22,
        paddingHorizontal: 24,
        backgroundColor: "#262626",
        border: "2px solid #212121",
    },
    titleText: {
        fontFamily: "Inter-Medium",
        fontSize: 16,
        color: "#fff",
    },
});

export default RoundedButton;
