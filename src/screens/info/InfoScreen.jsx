import React, { use, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import useApiRequest from "../../hook/useApiRequest";
import { Colors } from "../../util/constants";
import useAppNavigation from "../../hook/useAppNavigation";
import { useGame } from "../../context/GameContext";
import ThankYouContent from "./components/ThankYouContent";
import DrawInProgressContent from "./components/DrawInProgressContent";
import WeAreExtendingContent from "./components/WeAreExtendingContent";
import LoadingView from "../../components/LoadingView";
import Congratulations from "./components/Congratulations";
import TopNavScreenTemplate from "../../templates/TopNavTemplate";
import AssetPack from "../../util/AssetsPack";
import { Dimentions, Fonts } from "../../util/constants";

export const InfoScreenContents = {
    extending: "we_are_extending",
    thank_you: "thank_you",
    in_progress: "draw_in_progress",
    congratulations: "congratulations"
};

const InfoScreen = ({ contentName }) => {
    const appNavigation = useAppNavigation()

    const { user, setUser } = useGame()

    const { fetchUserDetails } = useApiRequest();

    const [content, setContent] = useState();
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [navBackgroudImage, setNavBackgroundImage] = useState();
    const [backgroundImage, setBackgroundImage] = useState();

    useEffect(() => {
        if (location.state && location.state !== null) {
            const id = location.state.user_id;
            const username = location.state.name;
            const email = location.state.email;

            fetchUserDetails(id, username, email).then((response) => {
                if (response.user) {
                    setUser(response.user);
                };
            });
        }
    }, [location]);

    useEffect(() => {
        if (!user) {
            appNavigation.goToNotFoundPage();
        }
    }, [user]);

    useEffect(() => {
        switch (contentName) {
            case InfoScreenContents.extending:
                setContent(<WeAreExtendingContent />)
                setTitle("Time Is on Your Side");
                setSubtitle("One more week. Let’s go.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_EXTENDING_PLAY)
                setBackgroundImage(AssetPack.backgrounds.CLOCK)
                break;
            case InfoScreenContents.thank_you:
                setContent(<ThankYouContent />)
                setTitle("Round complete");
                setSubtitle("Get ready to scratch again soon.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_THANK_YOU)
                setBackgroundImage(AssetPack.backgrounds.CHEST)
                break;
            case InfoScreenContents.in_progress:
                setContent(<DrawInProgressContent />)
                setTitle("Fortune Is Deciding");
                setSubtitle("One player. One prize. One moment.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_DRAW_IN_PROGRESS)
                setBackgroundImage(AssetPack.backgrounds.GOLD_SACK)
                break;
            case InfoScreenContents.congratulations:
                setContent(<Congratulations />)
                setTitle("The gods are impressed");
                setSubtitle("Claim your prize. You've earned it.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_GODS_ARE_IMPRESSED)
                setBackgroundImage(AssetPack.backgrounds.CONGRATS_BACKGROUND)
                break;
            default: appNavigation.goToNotFoundPage()
        }
    }, [contentName]);

    if (!user) {
        return (
            <LoadingView />
        );
    }
    return (
        <TopNavScreenTemplate title={title} subtitle={subtitle} navBackgroudImage={navBackgroudImage} hasBackButton={true}>
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImageContainer} resizeMode='cover' source={AssetPack.backgrounds.INFO_PAGE}>
                    {content}
                </ImageBackground>
            </View>
        </TopNavScreenTemplate>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        overflow: "hidden",
        backgroundColor: Colors.background,
        borderColor: Colors.jokerBlack200,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderTopWidth: 1,
    },
    backgroundImageContainer: {
        flexGrow: 1,
        padding: Dimentions.marginL,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    text: {
        color: "#A6A6A6",
        fontFamily: Fonts.InterRegular,
        textAlign: "center",
        fontSize: 16,
    },
    roundedTextContainer: {
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#171717",
        borderColor: "#D6BC9E",
        borderWidth: 1.5,
        paddingHorizontal: 35.5,
        paddingVertical: 15,
        borderRadius: 30,
        boxShadow: "1px 2px 3.84px 0 rgba(255, 222, 168, 0.25)",
        elevation: 5,
    },
    roundedText: {
        color: "#FFDEA8",
        fontSize: 16,
        fontFamily: Fonts.InterRegular,
    }
});
export default InfoScreen;
