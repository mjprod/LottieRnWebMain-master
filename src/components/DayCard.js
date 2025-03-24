import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AssetPack from '../util/AssetsPack';
import { DailyCardStatus } from '../util/constants';


const DayCard = ({ cardSet, status, day, cardBackground, extras, onPress }) => {
    const cardsInASet = 12;
    const getDayTagStyle = () => {
        switch (status) {
            case DailyCardStatus.active:
                return styles.dayTextStyleActive;
            case DailyCardStatus.completed:
                return styles.dayTextStyleCompleted;
            default:
                return styles.dayTextStyle;
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
    const getCardIcon = () => {
        switch (status) {
            case DailyCardStatus.completed:
                return AssetPack.icons.CARDS_GREEN;
            default:
                return AssetPack.icons.CARDS;
        }
    };

    const getBadgeBackground = () => {
        switch (status) {
            case DailyCardStatus.active:
                return AssetPack.backgrounds.CARD_NUMBER_SET;
            case DailyCardStatus.completed:
                return AssetPack.backgrounds.CARD_NUMBER_SET_COMPLETED;
            default:
                return AssetPack.backgrounds.CARD_NUMBER_SET_INACTIVE;
        }
    }

    const getBottomSection = (number, text) => {
        switch (status) {
            case DailyCardStatus.completed:
                return <View>
                    <Text style={{ color: "#3EDA41" }}>{"Completed"}</Text>
                </View>;
            default:
                return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
                    <Text style={styles.scratchCardValue}>{`${number}`}</Text>
                    <Text style={styles.scratchCard}>{`${text}`}</Text>
                </View>;
        }
    }

    const getTopSection = (number, text) => {
        return <View style={styles.topSection}>
            <ImageBackground source={{ uri: getBadgeBackground() }} style={styles.cardSetNumberBackground}>
                <Text style={styles.cardSetValue}>{`${number}`}</Text>
                <Text style={styles.cardSetX}>{"x"}</Text>
            </ImageBackground>
            <Text style={styles.cardSet}>{`${text}`}</Text>
        </View>;
    }

    const getSubContent = (number, text, footerNumber, footerText, background) => {
        return <ImageBackground style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}
            source={{ uri: background }}>
            {getTopSection(number, text)}
            <ImageBackground source={{ uri: AssetPack.backgrounds.BOTTOM_GRADIENT }} style={styles.bottomSection}>
                <Image source={getCardIcon()} style={styles.scratchCardIcon} />
                {getBottomSection(footerNumber, footerText)}
            </ImageBackground>
        </ImageBackground>
    }

    const getMainContent = () => {
        return <View style={getMainContainerStyle()}>
            {getSubContent(cardSet, "Card Set", cardSet * cardsInASet, "Scratch Cards", cardBackground)}
            {extras !== null && getSubContent(extras.number, extras.name, extras.number, extras.name, extras.background)}
        </View>;
    }

    const inactiveOverlayView = status === "active" || status === "completed" ? null : <View style={styles.inactiveOverlay} />;

    return (
        <TouchableOpacity onPress={onPress} style={styles.parentContainer}>
            <Text style={getDayTagStyle()}>{`DAY ${day}`}</Text>
            {getMainContent()}
            {inactiveOverlayView}
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
        backgroundColor: '#1B1B1B66',
        width: '100%',
        height: '100%',

    },
    dayTextStyle: {
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
    dayTextStyleActive: {
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
    dayTextStyleCompleted: {
        color: "#382E23",
        fontFamily: "Teko-Medium",
        fontSize: 18,
        backgroundColor: '#3EDA41',
        flex: 1,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        textAlign: 'center',
        paddingTop: 5,
        lineHeight: 15,
        borderWidth: 1,
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFDEA8',
        borderColor: '#3D3D3D',
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
        backgroundColor: '#FFDEA8',
        overflow: "hidden",
        borderWidth: 1,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderColor: '#3EDA41',
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 16,
    },
    bottomSection: {
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
        marginRight: 8,
        paddingTop: 4,
        flexDirection: 'row',
    },
    cardSetValue: {
        fontFamily: "Teko-Medium",
        color: '#FFFFFF',
        fontSize: 38,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
        elevation: 2,
    },
    cardSetX: {
        fontFamily: "Inter-SemiBold",
        color: '#FFFFFF',
        fontSize: 25,
        paddingBottom: 5,
        textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
        elevation: 2,
    },
    cardSet: {
        fontFamily: "Teko-Medium",
        color: '#FFFFFF',
        fontSize: 30,
        textTransform: "uppercase",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 1)",
        elevation: 2,
        lineHeight: 25,
    },
    scratchCardValue: {
        color: '#FFDEA8',
        fontSize: 12,
        fontFamily: "Inter-SemiBold",
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