import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import PurplePill from "../../../components/PurplePill";
import { Dimentions, Fonts, Colors } from "../../../util/constants";
import LinkButton from "../../../components/LinkButton";
import LinearGradient from "react-native-web-linear-gradient";
import LottieView from "react-native-web-lottie";

const ThankYouContent = () => {

    return (
        <View style={styles.mainContainer}>
            <ImageBackground
                blurRadius={10}
                resizeMode="cover"
                source={AssetPack.backgrounds.GOLD_RUSH}
                style={{
                    flex: 1,
                    justifyContent: "stretch",
                    backgroundColor: "#000",
                    overflow: "hidden",
                    borderColor: "#FFEEC0",
                    borderWidth: 1,
                    borderRadius: 12,
                }}>
                <View style={{
                    backgroundColor: "#00000099",
                    height: "100%",
                    padding: 10,
                    paddingTop: 25,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Image
                        style={styles.backgroundImage}
                        source={AssetPack.images.AMAZON_GOLD_GIFT_CARD}
                    />
                    <LinearGradient style={styles.backgroundGradient}
                        colors={[Colors.transparent, Colors.transparent, Colors.background]}
                        start={{ x: 0.0, y: 0.0 }}
                        end={{ x: 0.0, y: 1.0 }}
                        locations={[0.2, 0.4, 1.0]} />

                    <PurplePill text={"Beta Winner"} style={{ marginBottom: 20 }} />
                    <Text style={styles.title}>$1000 Amazon Voucher</Text>

                    <Text style={styles.message}>
                        Your <Text style={styles.textHighlighted}>Amazon Gift Card </Text>will be sent to your email within three business days.
                    </Text>
                    <LinkButton
                        style={{ marginVertical: Dimentions.sectionMargin }}
                        text={"Contact us for any concerns"} />
                    <LottieView
                        style={{ position: "absolute", right: 0, bottom: 0  }}
                        source={AssetPack.lotties.CONFETTI}
                        speed={1}
                        loop={true}
                        resizeMode="cover"
                        autoPlay={true} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: Dimentions.pageMargin * 3.5
    },
    title: {
        fontFamily: Fonts.InterSemiBold,
        color: "#FFFFFF",
        marginBottom: 20,
    },
    backgroundImage: {
        position: "absolute",
        flex: 1,
        top: 100,
        left: 0,
        resizeMode: "contain",
        margin: Dimentions.pageMargin,
        width: "80%",
        height: 300,
    },
    message: {
        marginTop: 270,
        fontFamily: Fonts.InterRegular,
        color: "#FFFFFF",
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

export default ThankYouContent;
