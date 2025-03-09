import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View, Image } from "react-native";
import { ImageBackground } from "react-native-web";
import { useNavigate } from "react-router";
import GameButton, { ButtonSize } from "../components/GameButton";
import LottieLuckySymbolCoinSlot from "../components/LottieLuckySymbolCoinSlot";
import LottieTicketSlot from "../components/LottieTicketSlot";
import RotatingCirclesBackground from "../components/RotatingCirclesBackground";
import { useSound } from "../hook/useSoundPlayer";
import TimerComponent from "../components/TimerComponent";
import useTimeLeftForNextDraw from "../hook/useTimeLeftForNextDraw";
import StatCard from "../components/StatCard";
import AssetPack from "../util/AssetsPack";
import LinkButton from "../components/LinkButton";
import DiagonalGradientCard from "../components/DiagonalGradientCard";
import GamesAvailableCard from "../components/GamesAvailableCard";
import RoundedButton from "../components/RoundedButton";
import { ScrollView } from "react-native";

const GameOverScreen = () => {
    const navigate = useNavigate();

    const { switchTrack } = useSound();

    const backgroundResult = require("./../assets/image/background_game.png");
    const backgroundLuckySymbol = require("./../assets/image/background_result_lucky_symbol.png");
    const backgroundTotalTicket = require("./../assets/image/background_total_ticket.png");

    const [progress, setProgress] = useState(12456);
    const [timeLeft] = useTimeLeftForNextDraw();

    const animatedProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 3000,
            useNativeDriver: false,
        }).start();

        switchTrack(1);
    }, []);

    animatedProgress.addListener(({ value }) => {
        setProgress(value);
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                resizeMode="contain"
                source={backgroundResult}
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
                            <Text style={styles.userNameText}>Glauco Pereira</Text>
                        </View>
                        <Text style={styles.statsTitle}>total game stats</Text>
                        <View style={styles.resultRow}>
                            <StatCard title="Total Points" stat="+9999" />
                            <View style={{ width: 10 }} />
                            <StatCard title="LUCKY SYMBOLS">
                                <ImageBackground
                                    resizeMode="contain"
                                    source={backgroundLuckySymbol}
                                    style={styles.imageBackgroundLuckySymbol}
                                >
                                    <LottieLuckySymbolCoinSlot topLayout={false} />
                                </ImageBackground>
                                <View style={styles.luckySymbols}></View>
                            </StatCard>
                        </View>
                        <View style={styles.ticketsSection}>
                            <GamesAvailableCard style={{ width: "100%" }} cardsLeft={12} />
                        </View>
                        <TimerComponent
                            style={{ marginVertical: 30 }}
                            days={timeLeft.days}
                            hours={timeLeft.hours}
                            minutes={timeLeft.minutes}
                            seconds={timeLeft.seconds}
                        />
                        <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "column" }}>
                            <View style={styles.buttonContainer}>
                                <View style={{ flex: 0.4, justifyContent: "flex-start" }}>
                                    <RoundedButton title="Back" />
                                </View>
                                <View style={{ flex: 0.6, justifyContent: "flex-end" }} >
                                    <GameButton
                                        buttonSize={ButtonSize.HALF}
                                        text="Play Now"
                                        onPress={() => {
                                            const initialScore = 0;
                                            const initialTicketCount = 0;
                                            const initialLuckySymbolCount = 0;
                                            const initialScratchCardLeft = 0;

                                            navigate("/*", {
                                                state: {
                                                    initialScore,
                                                    initialTicketCount,
                                                    initialLuckySymbolCount,
                                                    initialScratchCardLeft,
                                                },
                                            });
                                        }}
                                    />
                                </View>
                            </View>
                            <LinkButton
                                style={{ marginBottom: 30 }}
                                text={"How To Play Turbo Scratch >"}
                                handlePress={() => navigate("/how_to_play")}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
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
