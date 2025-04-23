import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './components/AppRoutes';
import { SnackbarProvider } from "./components/SnackbarContext";
import { GameProvider } from "./context/GameContext";
import { SoundProvider } from "./hook/useSoundPlayer";
import { ThemeProvider } from "./hook/useTheme";
import "./index.css";
import { Colors } from './util/constants';

const { height } = Dimensions.get("window");

const queryClient = new QueryClient()

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
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <ThemeProvider>
              <BrowserRouter>
                <SoundProvider>
                  <SnackbarProvider>
                    <AppRoutes />
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
  container: {
    overflow: "hidden",
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
    backgroundColor: Colors.jokerBlack1100,
    boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
  },
});

const smallStyles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
    userSelect: "none",
    backgroundColor: Colors.jokerBlack1100,
  },
  app: {
    overflow: "hidden",
    width: "100%",
    height: height,
    backgroundColor: Colors.jokerBlack1100,
  },
});
