import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import PurplePill from "../../../components/BetaCompetitionPill";
import { Dimentions, Fonts, Colors } from "../../../util/constants";
import LinkButton from "../../../components/LinkButton";
import LinearGradient from "react-native-web-linear-gradient";
import LottieView from "react-native-web-lottie";
import TimerComponent from "../../../components/TimerComponent";

const ThankYouContent = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Thank You For Playing!</Text>
            <Text style={styles.text}>
                We appreciate you joining this round of the game. Get ready to play again, as the next round starts Monday. Stay tuned and best of luck!
            </Text>
            <Image style={{ width: "100%", height: 200, marginBottom: 20,  marginTop: 30 }} resizeMode='contain' source={AssetPack.images.TURBO_GAME_CARDS_SHOW} />
            <TimerComponent />
        </View>
    );
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
        color: "#FFDEA8",
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
