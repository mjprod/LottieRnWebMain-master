import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocation } from "react-router";
import GameButton, { ButtonSize } from "../components/GameButton";
import ResourceTile from "../components/ResourceTile";
import RoundedButton from "../components/RoundedButton";
import { useSnackbar } from "../components/SnackbarContext";
import StatCard from "../components/StatCard";
import TimerComponent from "../components/TimerComponent";
import { useGame } from "../context/GameContext";
import useApiRequest from "../hook/useApiRequest";
import useAppNavigation from "../hook/useAppNavigation";
import LuckySymbolCard from "../components/LuckySymbolCard";
import AssetPack from "../util/AssetsPack";
import { ImageBackground } from "react-native-web";
import { Colors, Dimentions, Fonts } from "../util/constants";
import SectionTitle from "../components/SectionTitle";
import TopNavTemplate from "../templates/TopNavTemplate";
import { TopBannerNavType } from "../components/TopBannerNav";

const StartScreen = () => {
    const appNavigation = useAppNavigation();
    const { user, setUser, setLuckySymbolCount } = useGame();
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
        <TopNavTemplate
            title={user.name}
            subtitle={"Welcome back"}
            type={TopBannerNavType.startFinish}
            navBackgroudImage={AssetPack.backgrounds.TOP_NAV_START}
            navBackgroudVideo={AssetPack.videos.TOP_NAV_START}
            showCopyright={false}
            showProfileHeader={false}>
            <View style={styles.statsSection}>
                <View style={styles.timerSection}>
                    <TimerComponent style={{ paddingVertical: Dimentions.marginL }} />
                </View>

                <SectionTitle text={"Game Summary"} />
                <View style={styles.resultRow}>
                    <StatCard title="Total Points" stat={initialScore} />
                    <View style={{ width: 8 }} />
                    <LuckySymbolCard />
                </View>
                <View style={styles.ticketsSection}>
                    <ResourceTile style={{ width: "100%" }} number={initialScratchCardLeft} />
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end", flexDirection: "column", marginTop: 24 }}>
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
        </TopNavTemplate>
    );
};

const styles = StyleSheet.create({
    statsSection: {
        marginHorizontal: Dimentions.marginS
    },
    timerSection: {
        borderTopColor: Colors.jokerBlack200,
        borderTopWidth: 1,
        borderBottomColor: Colors.jokerBlack200,
        borderBottomWidth: 1,
        marginBottom: 32
    },
    title: {
        color: Colors.jokerGold400,
        fontFamily: Fonts.TekoMedium,
        fontSize: 38,
        textTransform: "uppercase",
    },
    welcomeBack: {
        fontFamily: Fonts.InterSemiBold,
        fontSize: 16,
        color: Colors.jokerWhite50,
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
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
