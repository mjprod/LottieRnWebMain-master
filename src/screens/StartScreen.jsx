import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocation } from "react-router";
import GameButton, { ButtonSize } from "../components/GameButton";
import GamesAvailableCard from "../components/GamesAvailableCard";
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
                    <Text style={styles.statsTitle}>Total Game Stats</Text>
                    <View style={styles.resultRow}>
                        <StatCard title="Total Points" stat={initialScore} />
                        <View style={{ width: 8 }} />
                        <LuckySymbolCard />
                    </View>
                    <View style={styles.ticketsSection}>
                        <GamesAvailableCard style={{ width: "100%" }} cardsLeft={initialScratchCardLeft} />
                    </View>
                    <TimerComponent style={{ paddingVertical: Dimentions.marginL }} />
                    <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "column", marginBottom: Dimentions.marginL }}>
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
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    statsSection: {
        marginTop: -150,
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
        paddingTop: Dimentions.marginXL,
        alignItems: "center",
        resizeMode: "cover",
    },
    header: {
        height: 367,
    },
    title: {
        color: "#FFDEA8",
        fontFamily: Fonts.TekoMedium,
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
        marginTop: Dimentions.marginL,
    },
    ticketsSection: {
        marginVertical: 8,
    },
    buttonContainer: {
        flex: 1,
        gap: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export default StartScreen;
