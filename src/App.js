import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import ScratchLuckyGame from "./screens/ScratchLuckyGame";
import ScratchCardScreen from "./components/ScratchCardScreen";
import './index.css';
const logo = require("./assets/react-logo.png");

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.app}>
                  <ScratchLuckyGame />
                      {/*<ScratchCardScreen />*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#35363A",
    },
    app: {
        maxWidth: 400,  
        maxHeight: 830,
        flex: 1,
        backgroundColor: "black",
        borderRadius: 8,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
    },
});
