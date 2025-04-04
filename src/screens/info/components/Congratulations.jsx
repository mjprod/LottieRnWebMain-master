import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import { Dimentions, Fonts, Colors } from "../../../util/constants";
import LinkButton from "../../../components/LinkButton";
import LottieView from "react-native-web-lottie";
import { useGame } from "../../../context/GameContext";
import LoadingView from "../../../components/LoadingView";

const Congratulations = () => {
    const { user } = useGame();

    if (!user) {
        return <LoadingView />;
    } else {
        return (
            <>
                <Image
                    style={{ width: 175, height: 46, marginBottom: 20 }}
                    source={AssetPack.logos.TURBO_SCRATCH} />
                <Text style={styles.heading}>Congratulations to</Text>
                <Text style={styles.title}>{user && user.name}</Text>
                <Image
                    style={styles.backgroundImage}
                    source={AssetPack.images.AMAZON_GOLD_GIFT_CARD}
                    resizeMode={"contain"}
                />
                <Text style={styles.message}>
                    Your <Text style={styles.textHighlighted}>Amazon Gift Card </Text>will be sent to your email within three business days.
                </Text>
                <LinkButton
                    style={{ marginVertical: Dimentions.sectionMargin }}
                    text={"Contact us for any concerns"} />
                <LottieView
                    style={{ flex: 1, position: "absolute", right: 0, top: 0, width: "100%", height: "100%" }}
                    source={AssetPack.lotties.CONFETTI}
                    speed={1}
                    loop={true}
                    autoPlay={true} />
            </>
        );
    }

};

const styles = StyleSheet.create({
    heading: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 32,
        color: Colors.jokerWhite50,
        textTransform: "uppercase",
        textAlign: "center",
        marginHorizontal: Dimentions.pageMargin,
    },
    title: {
        fontFamily: Fonts.InterMedium,
        fontSize: 18,
        color: "#FFFFFF",
        marginBottom: Dimentions.pageMargin,
        textAlign: "center",
    },
    mainContainer: {
        flex: 1,
        alignItems: "center",
    },
    text: {
        fontFamily: Fonts.InterSemiBold,
        color: "#FFFFFF",
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        margin: Dimentions.pageMargin,
        width: "80%",
    },
    message: {
        fontFamily: Fonts.InterRegular,
        color: Colors.jokerBlack50,
        fontSize: 16,
        textAlign: "center"
    },
    textHighlighted: {
        fontFamily: Fonts.InterRegular,
        color: "#FFEEC0",
        textAlign: "center",
        fontSize: 16,
    },
    backgroundGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
});

export default Congratulations;
