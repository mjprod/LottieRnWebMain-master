import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./components/SnackbarContext";
import { GameProvider } from "./context/GameContext";
import { SoundProvider } from "./hook/useSoundPlayer";
import { ThemeProvider } from "./hook/useTheme";
import DailyScreen from "./screens/DailyScreen";
import GameOverScreen from "./screens/GameOverScreen";
import LauchScreen from "./screens/LauchScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ScratchLuckyGame from "./screens/ScratchLuckyGame";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import HowToPlayScreen from "./screens/HowToPlayScreen";
import StartScreen from "./screens/StartScreen";

import "./index.css";

const { height } = Dimensions.get("window");

export default function App() {
  React.useEffect(() => {
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
  }, []);

  const isMobileBrowser =
    navigator.userAgent.includes("Mobile") ||
    navigator.userAgent.includes("Android");

  const dynamicStyles = isMobileBrowser ? smallStyles : styles;

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.app}>
        <GameProvider>
          <ThemeProvider>
            <BrowserRouter>
              <SoundProvider>
                <SnackbarProvider>
                  <Routes>
                    <Route path="/*" element={<NotFoundScreen />} />
                    <Route path="/daily" element={<DailyScreen />} />
                    <Route path="/start" element={<StartScreen />} />
                    <Route path="/game" element={<ScratchLuckyGame />} />
                    <Route path="/game_over" element={<GameOverScreen />} />
                    <Route path="/how_to_play" element={<HowToPlayScreen />} />
                    <Route path="/leader_board" element={<LeaderBoardScreen />} />
                    <Route path="/:id/:username/:email" element={<LauchScreen />} />
                  </Routes>
                </SnackbarProvider>
              </SoundProvider>
            </BrowserRouter>
          </ThemeProvider>
        </GameProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(33,33,33,.9)",
  },
  app: {
    margin: "auto",
    flex: 1,
    width: 400,
    maxHeight: 750,
    borderRadius: 44,
    overflow: "hidden",
    backgroundColor: "#131313",
    boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
  },
});

const smallStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    userSelect: "none",
    backgroundColor: "#131313",
  },
  app: {
    width: "100%",
    height: height,
    backgroundColor: "#131313",
  },
});
