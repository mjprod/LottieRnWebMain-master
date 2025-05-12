import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "./components/SnackbarContext";
import { GameProvider } from "./context/GameContext";
import { SoundProvider } from "./hook/useSoundPlayer";
import { ThemeProvider } from "./hook/useTheme";
import "./index.css";
import DailyScreen from "./screens/daily/DailyScreen";
import GameOverScreen from "./screens/GameOverScreen";
import HowToPlayScreen from "./screens/learn/HowToPlayScreen";
import LauchScreen from "./screens/LauchScreen";
import LeaderBoardScreen from "./screens/LeaderBoardScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import StartScreen from "./screens/StartScreen";
import ScratchLuckyGame from "./screens/game/ScratchLuckyGame";
import InfoScreen, { InfoScreenContents } from "./screens/info/InfoScreen";
import { Colors, isMobileBrowser } from './util/constants';

const { height } = Dimensions.get("window");

const queryClient = new QueryClient();

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

  const dynamicStyles = isMobileBrowser ? smallStyles : styles;

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.app}>
        <QueryClientProvider client={queryClient}>
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
                      <Route path="/:id/:name/:email" element={<LauchScreen />} />
                      <Route path="/" element={<LauchScreen />} />
                      <Route path={InfoScreenContents.extending} element={<InfoScreen contentName={InfoScreenContents.extending} />} />
                      <Route path={InfoScreenContents.thank_you} element={<InfoScreen contentName={InfoScreenContents.thank_you} />} />
                      <Route path={InfoScreenContents.in_progress} element={<InfoScreen contentName={InfoScreenContents.in_progress} />} />
                      <Route path={InfoScreenContents.congratulations} element={<InfoScreen contentName={InfoScreenContents.congratulations} />} />
                    </Routes>
                  </SnackbarProvider>
                </SoundProvider>
              </BrowserRouter>
            </ThemeProvider>
          </GameProvider>
        </QueryClientProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    overflow: "hidden",
    height: "100vh",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(33,33,33,.9)",
  },
  // eslint-disable-next-line react-native/no-unused-styles
  app: {
    margin: "auto",
    flex: 1,
    width: 400,
    maxHeight: 750,
    borderRadius: 44,
    overflow: "hidden",
    backgroundColor: Colors.jokerBlack1100,
    boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
  },
});

const smallStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    userSelect: "none",
    backgroundColor: Colors.jokerBlack1100,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  app: {
    overflow: "hidden",
    width: "100%",
    height: height,
    backgroundColor: Colors.jokerBlack1100,
  },
});
