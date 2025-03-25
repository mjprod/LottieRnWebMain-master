import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AssetPack from "../../../util/AssetsPack";
import LinearGradient from "react-native-web-linear-gradient";
import { Colors, Dimentions, Fonts } from "../../../util/constants";
import LottieView from "react-native-web-lottie";
import { ScrollView } from "react-native-web";
import DiagonalGradientCard from "../../../components/DiagonalGradientCard";

const DrawInProgressContent = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.roundedBox}>
                <video
                    style={styles.backgroundVideo}
                    src={AssetPack.videos.DRAW_IN_PROGRESS_BACKGROUND}
                    loop
                    autoPlay
                    muted
                    playsInline />
                <LinearGradient style={styles.backgroundGradient}
                    colors={[Colors.background, Colors.transparent, Colors.transparent,]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.0, y: 1.0 }}
                    locations={[0.4, 0.6, 1.0]} />
                <View style={styles.topContainer}>
                    <LottieView style={styles.lottieAnimation}
                        source={AssetPack.lotties.WIN}
                        autoPlay
                        loop={true}
                        resizeMode="cover" />
                    <Text style={styles.topText}>Draw in progress</Text>
                    <Text style={styles.bottomText}>This week's draw is closed! The winner will be announced in-app within the hour and notified by email. Good luck!</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <LottieView style={styles.spinnerWheelAnimation}
                        source={AssetPack.lotties.SPIN_WHEEL}
                        autoPlay
                        loop={true}
                        resizeMode="cover" />
                </View>
            </View>
            <DiagonalGradientCard style={styles.gradientCard}>
                <Image style={{ width: 15, height: 15 }} source={AssetPack.icons.TICKET} />
                <Text style={styles.gardientCardText}>You Have</Text><Text style={styles.gradientCardTicketNumber}>12</Text><Text style={styles.gardientCardText}>Tickets in this week's draw</Text>
            </DiagonalGradientCard>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientCard: {
        marginTop: Dimentions.pageMargin,
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 25
    },
    gradientCardTicketNumber: {
        color: "#3EDA41",
        fontFamily: Fonts.TekoMedium,
        fontSize: 30,
        textTransform: "uppercase",
    },
    gardientCardText: {
        color: "#FFFFFF",
        fontFamily: Fonts.TekoMedium,
        fontSize: 18,
        textTransform: "uppercase",
    },
    lottieAnimation: {
        width: 142,
        height: 65,
    },
    spinnerWheelAnimation: {
        width: "70%",
        height: "100%",
    },
    topText: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 32,
        color: "#FFDEA8",
        textTransform: "uppercase",
        textAlign: "center",
        marginHorizontal: Dimentions.pageMargin,
    },
    bottomText: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: "#A6A6A6",
        textAlign: "center",
        marginHorizontal: Dimentions.pageMargin,
    },
    roundedBox: {
        borderRadius: 12,
        borderColor: "#FFFFFF33",
        borderWidth: 1,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    backgroundVideoContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    backgroundVideo: {
        position: "absolute",
        left: 0,
        top: 200,
        width: "100%",
        height: "60%",
        objectFit: "fill",
        zIndex: -9999,
    },
    topContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Dimentions.pageMargin,
    },
    bottomContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    gradient: {
        width: "100%",
        height: 200,
    }
});

export default DrawInProgressContent;
