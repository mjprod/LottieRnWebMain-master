import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import TopBannerNav from "../../components/TopBannerNav";
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

export const InfoScreenContents = {
    extending: "we_are_extending",
    thank_you: "thank_you",
    in_progress: "draw_in_progress",
    congratulations: "congratulations"
};

const InfoScreen = ({ contentName }) => {
    const appNavigation = useAppNavigation()

    const { user, setUser } = useGame()

    const { fetchUserDetails, response } = useApiRequest();

    const [content, setContent] = useState();
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [navBackgroudImage, setNavBackgroundImage] = useState();

    useEffect(() => {
        if (response && response.user) {
            console.log(response.user)
            setUser(response.user);
        }
    }, [response]);

    useEffect(() => {
        switch (contentName) {
            case InfoScreenContents.extending:
                setContent(<WeAreExtendingContent />)
                setTitle("Time Is on Your Side");
                setSubtitle("One more week. Let’s go.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_EXTENDING_PLAY)
                break;
            case InfoScreenContents.thank_you:
                setContent(<ThankYouContent />)
                setTitle("Round complete");
                setSubtitle("Get ready to scratch again soon.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_THANK_YOU)
                break;
            case InfoScreenContents.in_progress:
                setContent(<DrawInProgressContent />)
                setTitle("Fortune Is Deciding");
                setSubtitle("One player. One prize. One moment.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_DRAW_IN_PROGRESS)
                break;
            case InfoScreenContents.congratulations:
                setContent(<Congratulations />)
                setTitle("The gods are impressed");
                setSubtitle("Claim your prize. You've earned it.")
                setNavBackgroundImage(AssetPack.backgrounds.TOP_NAV_GODS_ARE_IMPRESSED)
                break;
            default:
                appNavigation.goToNotFoundPage()
        }
    }, [contentName]);

    if (!content) {
        return (
            <LoadingView />
        );
    }
    return (
        <TopNavScreenTemplate title={title} subtitle={subtitle} navBackgroudImage={navBackgroudImage} hasBackButton={true}>
            {content}
        </TopNavScreenTemplate>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
});

export default InfoScreen;
