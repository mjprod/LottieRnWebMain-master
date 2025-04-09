import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AssetPack from '../../../util/AssetsPack';
import { Colors, DailyCardStatus, Fonts } from '../../../util/constants';
import LinearGradient from "react-native-web-linear-gradient";

const DayCard = ({ cardSet, status, day, cardBackground, extras, onPress }) => {
    const cardsInASet = 12;
    const getDayTagStyle = () => {
        switch (status) {
            case DailyCardStatus.active:
                return styles.dayTextStyleActive;
            case DailyCardStatus.completed:
                return styles.dayTextStyleCompleted;
            default:
                return styles.dayTextNormal;
        }
    };
    const getMainContainerStyle = () => {
        switch (status) {
            case DailyCardStatus.active:
                return styles.mainContainerActive;
            case DailyCardStatus.completed:
                return styles.mainContainerCompleted;
            default:
                return styles.mainContainer;
        }
    };
    const getCardIcon = (isForExtra) => {
        switch (status) {
            case DailyCardStatus.completed:
                return isForExtra ? AssetPack.icons.GREEN_TICKET : AssetPack.icons.CARDS_GREEN;
            default:
                return isForExtra ? AssetPack.icons.GOLDEN_TICKET : AssetPack.icons.CARDS;
        }
    };

    const getBadgeBackground = () => {
        switch (status) {
            case DailyCardStatus.active:
                return AssetPack.backgrounds.CARD_NUMBER_SET;
            case DailyCardStatus.completed:
                return AssetPack.backgrounds.CARD_NUMBER_SET_COMPLETED;
            default:
                return AssetPack.backgrounds.CARD_NUMBER_SET;
        }
    }

    const getBottomSection = (number, text, isForExtra = false) => {
        switch (status) {
            case DailyCardStatus.completed:
                return <View>
                    <Text style={{ color: Colors.jokerWhite50 }}>{isForExtra ? "Draw entered" : "Completed"}</Text>
                </View>;
            default:
                return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
                    <Text style={styles.scratchCardValue}>{`${number}`}</Text>
                    <Text style={styles.scratchCard}>{`${text}`}</Text>
                </View>;
        }
    }

    const getTopSection = (number, text, isForExtra = false) => {
        return <View style={styles.topSection}>
            <ImageBackground source={{ uri: getBadgeBackground() }} style={styles.cardSetNumberBackground}>
                {(status === DailyCardStatus.completed )?
                    <Image source={AssetPack.icons.TICK} style={{ height: 24, width: 24 }} /> :
                    (<>
                        <Text style={styles.cardSetValue}>{`${number}`}</Text>
                        <Text style={styles.cardSetX}>{"x"}</Text>
                    </>)
                }
            </ImageBackground>
            {isForExtra ? <Text style={styles.cardSet}>{text}</Text> : <Text style={styles.cardSet}>{DailyCardStatus.completed === status ? "SET DONE" : DailyCardStatus.active === status ? "Card Set" : text}</Text>}
        </View>;
    }

    const getSubContent = (number, text, footerNumber, footerText, background, isForExtra = false) => {
        return <ImageBackground style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}
            source={{ uri: background }}>
            {getTopSection(number, text, isForExtra)}
            <LinearGradient
                colors={[Colors.transparent, "#00000080", Colors.background]}
                locations={[0, 0.5, 1]}
                style={styles.linearGradient}>
                <Image source={getCardIcon(isForExtra)} style={styles.scratchCardIcon} />
                {getBottomSection(footerNumber, footerText, isForExtra)}
            </LinearGradient>
        </ImageBackground>
    }

    const getMainContent = () => {
        return <View style={getMainContainerStyle()}>
            {getSubContent(cardSet, "Coming Soon", cardSet * cardsInASet, "Scratch Cards", cardBackground)}
            {extras !== null && getSubContent(extras.number, extras.name, extras.number, "Draw ticket", extras.background, true)}
            {status === "active" || status === "completed" ? null : <View style={styles.inactiveOverlay} />}
        </View>;
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.parentContainer}>
            <Text style={[styles.dayTextStyle, getDayTagStyle()]}>{`DAY ${day}`}</Text>
            {getMainContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        overflow: "hidden",
    },
    inactiveOverlay: {
        position: 'absolute',
        backgroundColor: '#13131399',
        width: '100%',
        height: '100%',
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    dayTextStyle: {
        height: 24,
        color: Colors.jokerWhite50,
        fontFamily: Fonts.TekoMedium,
        fontSize: 18,
        backgroundColor: Colors.jokerBlack200,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        textAlign: 'center',
        paddingTop: 5,
        lineHeight: 15,
        borderColor: Colors.jokerBlack200,
        borderWidth: 1,
    },
    dayTextNormal: {
        borderColor: Colors.jokerBlack200,
    },
    dayTextStyleActive: {
        color: "#382E23",
        backgroundColor: '#FFEEC0',
        borderColor: '#FFDEA8',
    },
    dayTextStyleCompleted: {
        color: Colors.jokerBlack800,
        backgroundColor: Colors.jokerGreen400,
        borderColor: Colors.jokerGreen400,
    },
    mainContainer: {
        flexDirection: 'row',
        borderColor: Colors.jokerBlack200,
        overflow: "hidden",
        borderWidth: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
    },
    mainContainerActive: {
        flexDirection: 'row',
        backgroundColor: '#FFDEA8',
        overflow: "hidden",
        borderWidth: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: '#FFDEA8',
    },
    mainContainerCompleted: {
        flexDirection: 'row',
        backgroundColor: Colors.jokerGreen400,
        overflow: "hidden",
        borderWidth: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: Colors.jokerGreen400,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 16,
    },
    linearGradient: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
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
        alignContent: "center",
        marginRight: 8,
        flexDirection: 'row',
    },
    cardSetValue: {
        fontFamily: Fonts.TekoMedium,
        color: Colors.jokerWhite50,
        fontSize: 38,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
        elevation: 2,
        paddingTop: 4
    },
    cardSetX: {
        fontFamily: Fonts.InterBold,
        color: Colors.jokerWhite50,
        fontSize: 25,
        paddingBottom: 5,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
        elevation: 2,
    },
    cardSet: {
        paddingTop: 4,
        fontFamily: Fonts.TekoMedium,
        color: Colors.jokerWhite50,
        fontSize: 30,
        textTransform: "uppercase",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
        elevation: 2,
        lineHeight: 25,
    },
    scratchCardValue: {
        color: Colors.jokerGold400,
        fontSize: 14,
        fontFamily: Fonts.InterBold,
    },
    scratchCard: {
        color: Colors.jokerWhite50,
        fontSize: 14,
    },
    scratchCardIcon: {
        width: 20,
        height: 16,
    }
});

export default DayCard;