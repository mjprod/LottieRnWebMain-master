import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-web";
import AssetPack from "../../../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../../../util/constants";
import LottieView from "react-native-web-lottie";

const DrawInProgressContent = () => {
    return (
        <>
            <View style={styles.topContainer}>
                <LottieView style={styles.lottieAnimation}
                    source={AssetPack.lotties.WIN}
                    autoPlay
                    loop={true}
                    resizeMode="cover" />
                <Text style={styles.topText}>Draw in progress</Text>
                <Text style={styles.bottomText}>That’s a wrap! Winner revealed soon and via email.</Text>
            </View>
            <View style={{ flexGrow: 1 }} />
            <View style={styles.gradientCard}>
                <Image style={{ width: 15, height: 15, alignContent: "center" }} source={AssetPack.icons.TICKET} />
                <Text style={styles.gardientCardText}>You Have {" "} <Text style={styles.gradientCardTicketNumber}>12 </Text>{" "}Tickets in this week's draw</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Dimentions.pageMargin,
    },
    topText: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 32,
        color: Colors.jokerWhite50,
        textTransform: "uppercase",
        textAlign: "center",
        marginHorizontal: Dimentions.pageMargin,
        marginBottom: Dimentions.marginS,
    },
    bottomText: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerBlack50,
        textAlign: "center",
        marginHorizontal: Dimentions.pageMargin,
    },
    gradientCard: {
        borderRadius: 12,
        backgroundColor: Colors.jokerBlack800,
        borderColor: "#ADADAD33",
        borderWidth: 1,
        padding: 23,
        gap: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: Dimentions.pageMargin,
        flexDirection: "row"
    },
    gradientCardTicketNumber: {
        color: Colors.jokerGreen400,
        fontFamily: Fonts.TekoMedium,
        fontSize: 30,
        marginVertical: -10,
        textTransform: "uppercase",
    },
    gardientCardText: {
        color: "#FFFFFF",
        fontFamily: Fonts.TekoMedium,
        fontSize: 18,
        textTransform: "uppercase",
    },
    lottieAnimation: {
        width: 143,
        height: 65,
        marginBottom: Dimentions.marginL
    },
});

export default DrawInProgressContent;
