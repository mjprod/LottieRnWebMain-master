import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import "./index.css";
import { ThemeProvider } from "./hook/useTheme";
import { SoundProvider } from "./hook/useSoundPlayer";
import ScratchLuckyGame from "./screens/ScratchLuckyGame";

const { height, width } = Dimensions.get("window");

export default function App() {
  React.useEffect(() => {
    // Disable text selection for elements
    // with class "no-select"
    const noSelectElements = document.querySelectorAll(".no-select");
    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
  }, []);

  // Definir os estilos condicionalmente
  const isSmallScreen = width < 400 || height < 650;
  const dynamicStyles = isSmallScreen ? smallStyles : styles;

  return (
    <View style={styles.container}>
      <View style={dynamicStyles.app}>
        <ThemeProvider>
          <SoundProvider>
            <ScratchLuckyGame />
          </SoundProvider>
        </ThemeProvider>
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
    width: 400,  // Dimensão fixa para telas grandes
    maxHeight: 650,
    flex: 1,
    backgroundColor: "black",
    borderRadius: 8,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
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
    width: width * 0.98,  // Ajusta a largura para 90% da tela em telas pequenas
    maxHeight: height * 0.98,  // Ajusta a altura para 80% da tela em telas pequenas
    //flex: 1,
    backgroundColor: "black",
    borderRadius: 4,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.5)",
  },
});
