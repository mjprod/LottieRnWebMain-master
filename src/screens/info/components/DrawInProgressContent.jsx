import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "react-native-web";
import AssetPack from "../../../util/AssetsPack";
import { Colors, Dimentions, Fonts } from "../../../util/constants";
import LottieView from "react-native-web-lottie";
import ResourceTile from "../../../components/ResourceTile";

const DrawInProgressContent = ({ ticketsEarned = 0 }) => {
    return (
        <>
            <View style={styles.topContainer}>
                <Text style={styles.topText}>Draw in progress</Text>
                <Text style={styles.bottomText}>That’s a wrap! Winner revealed soon and via email.</Text>
                <ResourceTile title="Tickets in draw" icon={AssetPack.icons.GOLDEN_TICKET} number={ticketsEarned} unit="ENTRIES" />
            </View>
            <View style={{ flexGrow: 1, justifyContent: "center", marginVertical: 32 }} >
                <Image
                    style={{ width: 242, height: 242 }}
                    source={AssetPack.images.DRAW_IN_PROGRESS} />
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
    },
    bottomText: {
        fontFamily: Fonts.InterRegular,
        fontSize: 16,
        color: Colors.jokerBlack50,
        textAlign: "center",
        marginBottom: 32,
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
        marginBottom: 8
    },
});

export default DrawInProgressContent;
