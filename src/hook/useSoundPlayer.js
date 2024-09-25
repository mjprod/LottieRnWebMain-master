import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { Howl } from "howler";
import themes from "../global/themeConfig.js";
import { useTheme } from "./useTheme.js";

// Criação do contexto
const SoundContext = createContext();

// Hook para usar o contexto de som
export const useSound = () => useContext(SoundContext);

// Provedor do contexto de som
export const SoundProvider = ({ children }) => {
  const [startPlay, setStartPlay] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [waitAndGo, setWaitAndGo] = useState(false);

  const { currentTheme } = useTheme();

  
  const trackKeys = [
    "intro",         // 0
    "base_beat",     // 1
    "egypt_theme",   // 2
    "international_theme", // 3
    "mythology_theme",     // 4
    "cowboy_theme",        // 5
  ];

  const soundRefs = useRef({
    intro: new Howl({
      src: [themes["global"].initial_src],
      preload: true,
      autoplay: false,
      loop: false,
      onend: () => {
        //playNextTrack();
        console.log("Intro ended");
      },
    }),
    base_beat: new Howl({
      src: [themes["global"].src],
      preload: true,
      loop: true,
      onend: () => console.log("Base beat ended"),
    }),
    cowboy_theme: new Howl({
      src: [themes["egypt"].src],
      preload: true,
      loop: true,
      onend: () => console.log("Cowboy theme ended"),
    }),
    international_theme: new Howl({
      src: [themes["mythology"].src],
      preload: true,
      loop: true,
      onend: () => console.log("International theme ended"),
    }),
    mythology_theme: new Howl({
      src: [themes["international"].src],
      preload: true,
      loop: true,
      onend: () => console.log("Mythology theme ended"),
    }),
    egypt_theme: new Howl({
      src: [themes["cowboy"].src],
      preload: true,
      loop: true,
      onend: () => console.log("Egypt theme ended"),
    }),
  });


  // Limpeza dos sons ao desmontar o componente
  useEffect(() => {
    return () => {
      Object.values(soundRefs.current).forEach((sound) => {
        sound.stop();
        sound.unload();
      });
    };
  }, []);

  // Função para tocar a próxima faixa com base no tema
  const playNextTrack = () => {
    //stopCurrentTrack(); // Para a faixa atual antes de tocar a próxima

    const theme = currentTheme;
    switch (theme) {
      case "egypt":
        setCurrentTrackIndex(2);
        break;
      case "international":
        setCurrentTrackIndex(3);
        break;
      case "mythology":
        setCurrentTrackIndex(4);
        break;
      case "cowboy":
       setCurrentTrackIndex(5);
        break;
      default:
        setCurrentTrackIndex(1);
    }
  };

  // Função para tocar uma faixa específica
  const playSound = (trackKey) => {
    if (soundRefs.current[trackKey]) {
      console.log(`Playing track: ${trackKey}`);
      soundRefs.current[trackKey].play();
    }
  };
  

  // Função para parar a faixa atual
  const stopCurrentTrack = () => {
    const trackKey = trackKeys[currentTrackIndex];
    if (soundRefs.current[trackKey]) {
      console.log(`Stopping track: ${trackKey}`);
      soundRefs.current[trackKey].stop();
    }
  };

  // Tocar a faixa baseada no índice atual
  useEffect(() => {
    console.log(`1: ${currentTrackIndex}`);
    playSound(trackKeys[currentTrackIndex]);
  }, [currentTrackIndex]);

  // Tocar a introdução quando o jogo começar
  useEffect(() => {
    console.log(`2: ${currentTrackIndex}`);

    if (startPlay) {
      //console.log("Game started, playing intro");
      //playSound(trackKeys[0]); // Tocar a faixa de introdução
    }
  }, [startPlay]);

  // Provedor do contexto
  return (
    <SoundContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
        waitAndGo,
        setWaitAndGo,
        playNextTrack,
        stopCurrentTrack,
        setStartPlay,
        soundRefs,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
