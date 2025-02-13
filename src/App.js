import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from "./components/SnackbarContext";
import { GameProvider } from "./context/GameContext";
import { SoundProvider } from "./hook/useSoundPlayer";
import { ThemeProvider } from "./hook/useTheme";
import "./index.css";
import GameOverScreen from "./screens/GameOverScreen";
import LauchScreen from "./screens/LauchScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ScratchLuckyGame from "./screens/ScratchLuckyGame";

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

  const isSmallScreen = width < 400 || height < 650;
  const dynamicStyles = isSmallScreen ? smallStyles : styles;

  return (

    <View style={styles.container}>
      <View style={dynamicStyles.app}>
        <GameProvider>
          <ThemeProvider>
            <SoundProvider>
              <BrowserRouter>

                <SnackbarProvider>
                  <Routes>
                    <Route path="/:id/:username/:email" element={<LauchScreen />} />
                    <Route path="/*" element={<NotFoundScreen />} />
                    <Route path="/game" element={<ScratchLuckyGame />} />
                    <Route path="/game_over" element={<GameOverScreen />} />
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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#35363A",
    paddingTop: "10%",
  },
  app: {
    width: 400, // Dimensão fixa para telas grandes
    maxHeight: 720,
    flex: 1,
    backgroundColor: "black",
    borderRadius: 56,
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
  },
});

const smallStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#35363A",
    paddingTop: "10%",
  },
  app: {
    width: width * 0.98, // Ajusta a largura para 90% da tela em telas pequenas
    maxHeight: height * 0.98, // Ajusta a altura para 80% da tela em telas pequenas
    //flex: 1,
    backgroundColor: "black",
    borderRadius: 4,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
  },
});
