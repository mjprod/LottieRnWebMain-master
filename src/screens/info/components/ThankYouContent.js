import React from "react";
import { View, StyleSheet, Text} from "react-native";
import { useLocation } from "react-router-dom";
import useAppNavigation from "../../../hook/useAppNavigation";

const ThankYouContent = () => {
    const location = useLocation();
    const appNavigation = useAppNavigation()

    return (
        <View style={styles.container}>
            <Text>Thank You Content</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default ThankYouContent;
