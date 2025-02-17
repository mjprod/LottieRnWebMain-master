import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AssetPack from '../util/AssetsPack';

const DayCard = ({ cardSet, isActive, day, cardBackground }) => {
    const cardsInASet = 12;
    return (
        <View style={isActive ? styles.acitveMainContainer : styles.mainContainer}>
            <Text style={isActive ? styles.activeDay : styles.day}>{`DAY ${day}`}</Text>
            <ImageBackground source={{ uri: cardBackground }} style={isActive ? styles.activeContainer : styles.container}>
                <View style={styles.topSection}>
                    <ImageBackground source={{ uri: AssetPack.backgrounds.CARD_NUMBER_SET }} style={styles.cardSetNumberBackground}>
                        <Text style={styles.cardSetValue}>{`${cardSet}`}</Text>
                        <Text style={styles.cardSetX}>{"x"}</Text>
                    </ImageBackground>
                    <Text style={styles.cardSet}>{"Card Set"}</Text>
                </View>
                <View style={styles.bottomSection}>
                    <Image source={AssetPack.icons.CARDS_SMALL}  style={styles.scratchCardIcon}/>
                    <Text style={styles.scratchCardValue}>{`${cardSet * cardsInASet}`}</Text>
                    <Text style={styles.scratchCard}>{"Scratch Cards"}</Text>
                </View>
            </ImageBackground>
            {
                !isActive && <View style={styles.inactiveOverlay}></View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        overflow: "hidden",
    },
    inactiveOverlay: {
        position: 'absolute',
        backgroundColor: '#1B1B1B66',
        width: '100%',
        height: '100%',

    },
    day: {
        color: "#FFFFFF",
        fontFamily: "Teko-Medium",
        fontSize: 18,
        backgroundColor: '#3D3D3D',
        flex: 1,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        textAlign: 'center',
        paddingTop: 5,
        lineHeight: 15,
        borderColor: '#3D3D3D',
        borderWidth: 1,
    },
    activeDay: {
        color: "#382E23",
        fontFamily: "Teko-Medium",
        fontSize: 18,
        backgroundColor: '#FFEEC0',
        flex: 1,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
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
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: '#3D3D3D',
    },
    activeContainer: {
        backgroundColor: '#FFDEA8',
        borderColor: '#FFDEA866',
        overflow: "hidden",
        paddingTop: 37,
        borderWidth: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
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
        paddingTop: 18,
        paddingBottom: 14,
        paddingRight: 8,
        paddingLeft: 8,
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