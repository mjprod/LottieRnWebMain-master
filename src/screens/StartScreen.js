import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocation } from "react-router";
import GameButton, { ButtonSize } from "../components/GameButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
import LinkButton from "../components/LinkButton";
import RoundedButton from "../components/RoundedButton";
import { useSnackbar } from "../components/SnackbarContext";
import StatCard from "../components/StatCard";
import TimerComponent from "../components/TimerComponent";
import { useGame } from "../context/GameContext";
import useApiRequest from "../hook/useApiRequest";
import useAppNavigation from "../hook/useAppNavigation";
import LuckySymbolCard from "../components/LuckySymbolCard";
import LinearGradient from "react-native-web-linear-gradient";
import AssetPack from "../util/AssetsPack";
import { ImageBackground } from "react-native-web";
import { Colors, Dimentions, Fonts } from "../util/constants";

const StartScreen = () => {
    const appNavigation = useAppNavigation();
    const { setUser, setLuckySymbolCount } = useGame();
    const { showSnackbar } = useSnackbar();
    const { fetchUserDetails } = useApiRequest();

    const location = useLocation();

    const { username, email, id } = location.state
    const [initialScore, setInitialScore] = useState(0);
    const [initialScratchCardLeft, setInitialScratchCardLeft] = useState(0);
    const [initialUserData, setInitialUserData] = useState("");

    useEffect(() => {
        if (id && username && email) {
            fetchUserDetails(id, username, email).then((response) => {
                setUser(response.user)
                setInitialScore(response.user.total_score || 0);
                setLuckySymbolCount(response.user.lucky_symbol_balance);
                setInitialScratchCardLeft(response.user.card_balance || 0);
                setInitialUserData(response.user);
            })
                .catch((error) => {
                    console.error('Login failed:', error);
                });


        } else {
            showSnackbar("Something went wrong");
            appNavigation.goToNotFoundPage();
        }
    }, [id, email, username]);

    const handleBackPress = () => {
        appNavigation.goBack();
    };

    const handlePlayNow = () => {
        appNavigation.goToGamePage(initialUserData.user_id, initialUserData.name, initialUserData.email)
    }

    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <View>
                <ImageBackground style={styles.header} source={AssetPack.backgrounds.TOP_NAV_HEROES}>
                    <LinearGradient
                        colors={[Colors.transparent, Colors.transparent, Colors.background, Colors.background]}
                        locations={[0, 0.5, 0.9, 1]}
                        style={styles.linearGradient}>
                        <Image
                            style={{ width: 175, height: 46, marginBottom: 20 }}
                            source={AssetPack.logos.TURBO_SCRATCH}
                        />
                        <Text style={styles.title}>Welcome</Text>
                        <Text style={styles.userNameText}>{initialUserData.name}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.statsSection}>
                    <Text style={styles.statsTitle}>Total game stats</Text>
                    <View style={styles.resultRow}>
                        <StatCard title="Total Points" stat={initialScore} />
                        <View style={{ width: 10 }} />
                        <LuckySymbolCard />
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
                                    buttonSize={ButtonSize.TWO_THIRD}
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
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    statsSection: {
        marginTop: -100,
        marginHorizontal: Dimentions.marginS
    },
    linearGradient: {
        width: "100%",
        height: "auto",
        paddingHorizontal: Dimentions.pageMargin,
        flex: 1,
        alignItems: "start",
        justifyContent: "start",
        paddingBottom: Dimentions.sectionMargin,
        paddingTop: Dimentions.pageMargin,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
    },
    header: {
        height: 367,
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
        color: Colors.jokerWhite50,
    },
    statsTitle: {
        fontFamily: Fonts.TekoMedium,
        fontSize: 30,
        color: Colors.jokerWhite50,
        textTransform: "uppercase",
        textAlign: "center",
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: Dimentions.sectionMargin,
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
    symbolImage: {
        width: 50,
        height: 50,
    },
    ticketsSection: {
        marginVertical: 8,
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

export default StartScreen;
