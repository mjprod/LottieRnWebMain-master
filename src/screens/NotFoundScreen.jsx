import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AssetPack from "../util/AssetsPack";
import GameButton from "../components/GameButton";
import { Colors, Dimentions, Fonts } from "../util/constants";

const NotFoundScreen = () => {
  const [port, setPort] = useState(null);

  useEffect(() => {
    function onMessageChannelReady(e) {
      const port = e.ports[0];
      console.log("🌐 Extracted port:", port);
      if (!port) {return;}
      port.onmessage = msg => console.log("🌐 Port got message:", msg.data);
      port.postMessage("HELLO_FROM_WEB");
      setPort(port);
    }
  
    window.addEventListener("message", onMessageChannelReady);
    return () => window.removeEventListener("message", onMessageChannelReady);
  }, []);

  const handleButtonPress = () => {
    if (port) {
      port.postMessage({ action: "CLOSE_TWA" });
    } else {
      console.warn("postMessage port not ready");
    }
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.iosApp) {
      window.webkit.messageHandlers.iosApp.postMessage("Hello from PWA");
    }
  };
  return (
    <ImageBackground
      source={AssetPack.backgrounds.SCRACHIE_404}
      style={styles.rotatingBackgroundContainer}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Image
          style={{ width: 175, height: 46, marginBottom: 28 }}
          source={AssetPack.logos.TURBO_SCRATCH} />
        <Image
          style={{
            padding: 35,
            width: 269,
            height: 120,
            marginBottom: 28,
          }}
          source={AssetPack.icons.ICON_404}
          resizeMode="center"
        />
        <Text style={styles.message}>
          Looks like you’ve scratched the wrong spot! This page doesn’t exist!
        </Text>
      </View>
      <GameButton
        style={{ width: "100%", marginBottom: Dimentions.marginXL }}
        text="TAKE ME BACK"
        onPress={handleButtonPress} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rotatingBackgroundContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingHorizontal: Dimentions.pageMargin,
  },
  message: {
    fontFamily: Fonts.InterBold,
    color: Colors.jokerWhite50,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 35,
  },
});

export default NotFoundScreen;
