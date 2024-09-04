import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import AlphaView from "./AlphaView";

export const VideoBackground = ({ source,showAlphaView }) => {
 
  const videoRef = useRef(null);


  useEffect(() => {
   

    // Adiciona o event listener para redimensionamento
    //window.addEventListener("resize", handleResize);


     // Attempt to play the video in Safari
     if (videoRef.current) {
      const playPromise = videoRef.current.play();
      console.log("playPromise", playPromise);
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video is playing
          })
          .catch((error) => {
            // Autoplay failed, maybe due to browser restrictions
            console.error("Autoplay failed:", error);
          });
      }
    }

    // Remove o event listener quando o componente é desmontado
    //return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <View style={styles.container}>
      <video
        ref={videoRef}
        src={source}
        style={{
          ...styles.video,
          width: '100%' ,
          height:  '100%' ,
        }}
        loop
        autoPlay
        muted
        playsInline
      />
      <AlphaView showAlphaView={showAlphaView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  video: {
    objectFit: "cover",
  },
});

export default VideoBackground;
