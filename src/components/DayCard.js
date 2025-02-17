import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

const DayCard = ({ cardSet, isActive, day }) => {
    const logo = require("./../assets/image/day_card_background.png");
    const cardSetNumberBackground = require("./../assets/icons/card_set_number_background.svg");
    return (
        <View source={{ uri: logo }} style={styles.mainContainer}>
            <Text style={styles.day}>{`DAY ${day}`}</Text>
            <ImageBackground source={{ uri: logo }} style={styles.container}>
                <View style={styles.topSection}>
                    <ImageBackground source={{ uri: cardSetNumberBackground }} style={styles.cardSetNumberBackground}>
                        <Text style={styles.cardSetValue}>{`${cardSet}`}</Text>
                        <Text style={styles.cardSetX}>{"x"}</Text>
                    </ImageBackground>
                    <Text style={styles.cardSet}>{"Card Set"}</Text>
                </View>
                <View style={styles.bottomSection}>
                    <Image source={require("./../assets/icons/icon_cards_small.svg")}  style={styles.scratchCardIcon}/>
                    <Text style={styles.scratchCardValue}>{"12"}</Text>
                    <Text style={styles.scratchCard}>{"Scratch Cards"}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        overflow: "hidden",
    },
    day: {
        color: "#382E23",
        fontFamily: "Teko-Medium",
        fontSize: 18,
        backgroundColor: '#FFEEC0',
        flex: 1,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        textAlign: 'center',
        paddingTop: 5,
        lineHeight: 15,
        borderColor: '#FFDEA8',
        borderWidth: 1,
    },
    container: {
        backgroundColor: '#FFDEA8',
        borderColor: '#FFDEA866',
        overflow: "hidden",
        paddingTop: 37,
        borderWidth: 1,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderColor: '#FFDEA8',
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 16,
    },
    bottomSection: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000055',
        paddingTop: 14,
        paddingBottom: 14,
        paddingRight: 16,
        paddingLeft: 16,
    },
    cardSetNumberBackground: {
        width: 61,
        height: 61,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        paddingTop: 4,
        flexDirection: 'row',
    },
    cardSetValue: {
        fontFamily: "Teko-Medium",
        color: '#FFFFFF',
        fontSize: 38,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        elevation: 2,
    },
    cardSetX: {
        fontFamily: "Inter-SemiBold",
        color: '#FFFFFF',
        fontSize: 25,
        paddingBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        elevation: 2,
    },
    cardSet: {
        fontFamily: "Teko-Medium",
        color: '#FFFFFF',
        fontSize: 30,
        textTransform: "uppercase",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        elevation: 2,
        lineHeight: 25,
    },
    scratchCardValue: {
        color: '#FFDEA8',
        fontSize: 12,
    },
    scratchCard: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    scratchCardIcon: {
        width: 25,
        height: 20,
    }
});

export default DayCard;