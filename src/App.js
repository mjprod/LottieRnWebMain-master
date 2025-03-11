import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./components/SnackbarContext";
import { GameProvider } from "./context/GameContext";
import { SoundProvider } from "./hook/useSoundPlayer";
import { ThemeProvider } from "./hook/useTheme";
import "./index.css";
import DailyScreen from "./screens/DailyScreen";
import GameOverScreen from "./screens/GameOverScreen";
import LauchScreen from "./screens/LauchScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ScratchLuckyGame from "./screens/ScratchLuckyGame";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import HowToPlayScreen from "./screens/HowToPlayScreen";
import StartScreen from "./screens/StartScreen";
import { COLOR_BACKGROUND } from "./util/constants";

const { height, width } = Dimensions.get("window");

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
            <SoundProvider>
              <BrowserRouter>
                <SnackbarProvider>
                  <Routes>
                    <Route
                      path="/:id/:username/:email"
                      element={<LauchScreen />}
                    />
                    <Route path="/daily" element={<DailyScreen />} />
                    <Route path="/*" element={<NotFoundScreen />} />
                    <Route path="/game" element={<ScratchLuckyGame />} />
                    <Route path="/game_over" element={<GameOverScreen />} />
                    <Route
                     
                      path="/leader_board"
                     
                      element={<LeaderBoardScreen />}
                    />
                    <Route path="/how_to_play" element={<HowToPlayScreen />}
                    />
                    <Route path="/start" element={<StartScreen />}
                    />
                  </Routes>
                </SnackbarProvider>
              </BrowserRouter>
            </SoundProvider>
          </ThemeProvider>
        </GameProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#131313",
    paddingTop: "10%",
  },
  app: {
    flex: 1,
    width: 400,
    maxHeight: 750,
    borderRadius: 44,
    overflow: "hidden",
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
    backgroundColor: "black",
  },
});
