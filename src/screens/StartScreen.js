import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { ImageBackground } from "react-native-web";
import { useLocation } from "react-router";
import GameButton, { ButtonSize } from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import TimerComponent from "../components/TimerComponent";
import StatCard from "../components/StatCard";
import AssetPack from "../util/AssetsPack";
import LinkButton from "../components/LinkButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
import RoundedButton from "../components/RoundedButton";
import { ScrollView } from "react-native";
import useApiRequest from "../hook/useApiRequest";
import { useGame } from "../context/GameContext";
import useAppNavigation from "../hook/useAppNavigation";
import LinearGradient from 'react-native-web-linear-gradient';

const GameOverScreen = () => {
    const appNavigation = useAppNavigation();
    const { setUser, setLuckySymbolCount } = useGame();

    const { fetchUserDetails, response } = useApiRequest();

    const location = useLocation();

    const { username, email, id } = location.state
    const [initialScore, setInitialScore] = useState(0);
    const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);
    const [initialUserData, setInitialUserData] = useState("");

    useEffect(() => {
        fetchUserDetails(id, username, email);
    }, [id]);

    useEffect(() => {
        if (response) {
            if (response.user) {
                setUser(response.user)
                setInitialScore(response.user.total_score || 0);
                setLuckySymbolCount(response.user.lucky_symbol_balance);
                setInitialScratchCardLeft(response.user.card_balance || 0);
                setInitialUserData(response.user);
            }
        }
    }, [response]);

    const handleBackPress = () => {
        appNavigation.goBack();
    };

    const handlePlayNow = () => {
        appNavigation.goToGamePage(initialUserData.user_id, initialUserData.name, initialUserData.email)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
           <LinearGradient start={{ x: 0.0, y: 0.5 }} end={{ x: 0.5, y: 1.0 }}
                   locations={[0, 0.3, 0.45, 0.55, 1.0]}
                   colors={['#212121', '#262E33', '#1D4A64', '#24282B', '#212121']}
                   style={styles.imageBackground}>
                <View style={styles.rotatingBackgroundContainer}>
                    <RotatingCirclesBackground />
                </View>
                <View style={styles.container}>
                    <View style={styles.margim}>
                        <View style={styles.header}>
                            <View style={styles.iconWrapper}>
                                <Image
                                    style={{ width: 175, height: 46, marginBottom: 20 }}
                                    source={AssetPack.logos.TURBO_SCRATCH}
                                />
                            </View>
                            <Text style={styles.title}>Welcome</Text>
                            <Text style={styles.userNameText}>{initialUserData.name}</Text>
                        </View>
                        <Text style={styles.statsTitle}>total game stats</Text>
                        <View style={styles.resultRow}>
                            <StatCard title="Total Points" stat={initialScore} />
                            <View style={{ width: 10 }} />
                            <StatCard title="LUCKY SYMBOLS">
                                <ImageBackground
                                    resizeMode="contain"
                                    source={AssetPack.backgrounds.LUCKY_SYMBOL}
                                    style={styles.imageBackgroundLuckySymbol}>
                                    <LottieLuckySymbolCoinSlot topLayout={false} />
                                </ImageBackground>
                                <View style={styles.luckySymbols}></View>
                            </StatCard>
                        </View>
                        <View style={styles.ticketsSection}>
                            <GamesAvailableCard style={{ width: "100%" }} cardsLeft={initialScratchCardLeft} />
                        </View>
                        <TimerComponent style={{ marginVertical: 30 }} />
                        <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "column" }}>
                            <View style={styles.buttonContainer}>
                                <View style={{ flex: 0.4, justifyContent: "flex-start" }}>
                                    <RoundedButton title="Back" onPress={handleBackPress} />
                                </View>
                                <View style={{ flex: 0.6, justifyContent: "flex-end" }} >
                                    <GameButton
                                        buttonSize={ButtonSize.HALF}
                                        text="Play Now"
                                        onPress={handlePlayNow}
                                    />
                                </View>
                            </View>
                            <LinkButton
                                style={{ marginBottom: 30 }}
                                text={"How To Play Turbo Scratch >"}
                                handlePress={appNavigation.goToHowToPlayPage}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            web: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: 1000,
            },
            default: {
                ...StyleSheet.absoluteFillObject,
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: 1000,
            },
        }),
    },
    margim: {
        marginTop: 10,
        width: "85%",
    },
    imageBackground: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "0%",
    },
    imageBackgroundLuckySymbol: {
        width: 100,
        height: 45,
        alignItems: "center",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
    },
    headerIcon: {
        width: 50,
        height: 50,
    },
    title: {
        color: "#FFDEA8",
        fontFamily: "Teko-Medium",
        fontSize: 24,
        textTransform: "uppercase",
    },
    userNameText: {
        fontFamily: "Inter-Medium",
        fontSize: 20,
        color: "#fff"
    },
    statsTitle: {
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#fff",
        textTransform: "uppercase",
        textAlign: "center",
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    resultCard: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #4B595D",
        borderRadius: 12,
        padding: 8,
    },
    resultTitle: {
        fontSize: 18,
        fontFamily: "Teko-Medium",
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 3,
    },
    resultPoints: {
        fontFamily: "Teko-Medium",
        fontSize: 30,
        color: "#00ff00",
    },
    luckySymbols: {
        flexDirection: "row",
    },
    symbolImage: {
        width: 50,
        height: 50,
    },
    ticketsSection: {
        marginVertical: 20,
    },
    ticketTitle: {
        fontFamily: "Teko-Medium",
        fontSize: 18,
        color: "#fff",
    },
    nextTicketText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: "#fff",
    },
    ticketProgress: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        color: "#fff",
    },
    addedPoints: {
        width: "100%",
        fontFamily: "Teko-Medium",
        fontSize: 22,
        color: "#00ff00",
        textAlign: "end",
    },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    viewRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textColumnRigth: {
        position: "relative",
        flexDirection: "column",
        alignItems: "flex-end",
    },
    containerTotalTicket: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    slider: {
        height: 1,
        maxHeight: 1,
        transform: [{ scaleY: 4, scaleX: 4 }],
        zIndex: 999,
        elevation: 10,
    },
    thumb: {
        width: 0,
        height: 0,
    },
    sliderContainer: {
        width: "100%",
        marginVertical: 10,
        borderRadius: 50,
        backgroundColor: "#000000",
        justifyContent: "center",
        paddingHorizontal: 0,
    },
    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rotatingBackgroundContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    buttonContainer: {
        flex: 1,
        gap: 30,
        marginVertical: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export default GameOverScreen;
