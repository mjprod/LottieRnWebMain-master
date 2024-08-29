import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

export const VideoBackground = ({ source }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Adiciona o event listener para redimensionamento
    window.addEventListener("resize", handleResize);

    // Remove o event listener quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <View style={styles.container}>
      <video
        src={source}
        style={{
          ...styles.video,
          width: dimensions.width,
          height: dimensions.height,
        }}
        loop
        autoPlay="autoplay"
        muted
        playsInline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
  },
  video: {
    objectFit: "cover",
  },
});

export default VideoBackground;
