import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, View } from "react-native";

const AlphaView = ({ showAlphaView }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial da animação

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showAlphaView ? 1 : 0, // Transição para 1 (visível) ou 0 (invisível)
      duration: 500, // Duração da animação em milissegundos
      useNativeDriver: true, // Usar driver nativo para melhor desempenho
    }).start();
  }, [showAlphaView]);

  return (
    <Animated.View
      style={[
        styles.containerNav,
        {
          opacity: fadeAnim, // Aplica a opacidade animada
          backgroundColor: "rgba(0,0,0,0.7)",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  containerNav: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default AlphaView;
