import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import { Dimentions, Fonts, Colors } from "../../../util/constants";
import TimerComponent from "../../../components/TimerComponent";

const ThankYouContent = () => {
    return (<>
        <Image
            style={{ width: 175, height: 46, marginBottom: 20 }}
            source={AssetPack.logos.TURBO_SCRATCH} />
        <Text style={styles.topText}>Thank You For Playing!</Text>
        <Text style={styles.text}>
            Thanks for playing! The next round starts Monday. Stay tuned.
        </Text>
        <View style={{ flexGrow: 1 }} />
        <TimerComponent />
    </>);
};

const styles = StyleSheet.create({
    text: {
        color: "#A6A6A6",
        fontFamily: Fonts.InterRegular,
        textAlign: "center",
        fontSize: 16,
    },
    topText: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 32,
        color: Colors.jokerWhite50,
        textTransform: "uppercase",
        textAlign: "center",
        marginHorizontal: Dimentions.pageMargin,
    },
    container: {
        flex: 1, width: "100%",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    text: {
        color: "#A6A6A6",
        fontFamily: Fonts.InterRegular,
        textAlign: "center",
        fontSize: 16,
    },
    roundedTextContainer: {
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171717",
        borderColor: "#D6BC9E",
        borderWidth: 1.5,
        paddingHorizontal: 35.5,
        paddingVertical: 15,
        borderRadius: 30,
        boxShadow: "1px 2px 3.84px 0 rgba(255, 222, 168, 0.25)",
        elevation: 5,
    },
    roundedText: {
        color: "#FFDEA8",
        fontSize: 16,
        fontFamily: Fonts.InterRegular,
    }
});

export default ThankYouContent;
