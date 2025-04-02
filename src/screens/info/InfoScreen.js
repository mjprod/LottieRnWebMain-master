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
                break;
            case InfoScreenContents.thank_you:
                setContent(<ThankYouContent />)
                break;
            case InfoScreenContents.in_progress:
                setContent(<DrawInProgressContent />)
                break;
            case InfoScreenContents.congratulations:
                setContent(<Congratulations />)
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
        <ScrollView style={styles.container}>
            <TopBannerNav hasBackButton={true} />
            <View style={{ marginHorizontal: 25 }}>
                {content}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
});

export default InfoScreen;
