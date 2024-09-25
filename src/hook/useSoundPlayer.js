import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
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
  const [introPlayed, setIntroPlayed] = useState(false);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const { currentTheme } = useTheme();

  const trackKeys = [
    "intro", // 0
    "base_beat", // 1
    "egypt_theme", // 2
    "international_theme", // 3
    "mythology_theme", // 4
    "cowboy_theme", // 5
  ];

  // Criar as referências de todos os sons e definir volume inicial como 0 para todas as faixas
  const soundRefs = useRef({
    intro: new Howl({
      src: [themes["global"].initial_src],
      preload: true,
      autoplay: false,
      loop: false,
      volume: 1, // Inicialmente volume 0
      onend: () => initialTrack(),
    }),
    base_beat: new Howl({
      src: [themes["global"].src],
      preload: true,
      loop: true,
      volume: 0, // Inicialmente volume 0
    }),
    cowboy_theme: new Howl({
      src: [themes["cowboy"].src],
      preload: true,
      loop: true,
      volume: 0, // Inicialmente volume 0
    }),
    international_theme: new Howl({
      src: [themes["international"].src],
      preload: true,
      loop: true,
      volume: 0, // Inicialmente volume 0
    }),
    mythology_theme: new Howl({
      src: [themes["mythology"].src],
      preload: true,
      loop: true,
      volume: 0, // Inicialmente volume 0
    }),
    egypt_theme: new Howl({
      src: [themes["egypt"].src],
      preload: true,
      loop: true,
      volume: 0, // Inicialmente volume 0
    }),
  });

  const playNextTrack = () => {
    console.log("Tocando próxima música, playNextTrack " + currentTheme);
    const theme = currentTheme; // Pega o tema atual
    switch (theme) {
      case "egypt":
        switchTrack(2);
        break;
      case "international":
        switchTrack(3);
        break;
      case "mythology":
        switchTrack(4);
        break;
      case "cowboy":
        switchTrack(5);
        break;
      default:
        switchTrack(1);
    }
  };

  // Função para tocar todas as músicas ao mesmo tempo com volume 0 (exceto a atual)
  const playAllSounds = () => {
    Object.keys(soundRefs.current).forEach((trackKey, index) => {
      // Pular a faixa "intro"
      if (trackKey === "intro") return;
  
      const sound = soundRefs.current[trackKey];
      
      if (index === currentTrackIndex) {
        sound.volume(1); // Tocar a faixa atual com volume normal
      } else {
        sound.volume(0); // Outras faixas em volume 0
      }
      
      sound.play();
    });
  };

  const stopAllSounds = () => {
    Object.keys(soundRefs.current).forEach((trackKey) => {
      const sound = soundRefs.current[trackKey];
      if (sound.playing()) {
        sound.stop(); // Parar a faixa se estiver tocando
      }
    });
  };

  const initialTrack = () => {
   
    playAllSounds();

    const theme = currentTheme;
    let newIndex = 0;
    switch (theme) {
      case "egypt":
      newIndex = 2;
        break;
      case "international":
      newIndex = 3;
        break;
      case "mythology":
      newIndex = 4;
        break;
      case "cowboy":
        newIndex = 5;
        break;
      default:
        newIndex = 1;
    }

    const newTrackKey = trackKeys[newIndex];
    const newSound = soundRefs.current[newTrackKey];
      if (newSound) {
        newSound.fade(0, 1, 500);
     }
    setIntroPlayed(true);
    setCurrentTrackIndex(newIndex);
  };

const switchTrack = (newIndex) => {

  if (newIndex === currentTrackIndex) {
    console.log("Same Theme, don't change sound");
    return;
  }
  const currentTrackKey = trackKeys[currentTrackIndex];
  const newTrackKey = trackKeys[newIndex];

  const currentSound = soundRefs.current[currentTrackKey];
  const newSound = soundRefs.current[newTrackKey];

  if (currentSound) {
    currentSound.fade(1, 0, 2000);
  }

  setTimeout(() => {
    if (newSound) {
      newSound.fade(0, 1, 1000);
    }
  }, 500);

  setCurrentTrackIndex(newIndex);
};



const playSound = (soundKey) => {
  if (soundRefs.current[soundKey]) {
    soundRefs.current[soundKey].play();
  }
};

  useEffect(() => {
    if (startPlay) {
      //playAllSounds();
      playSound("intro");
      //sound.play();
    }
  }, [startPlay]);

  useEffect(() => {
    if (introPlayed) {
      console.log("O tema mudou para, agora muda a musica: ", currentTheme);
      playNextTrack(); // Toca a faixa correspondente ao novo tema
    }
  }, [currentTheme]); 

  // Provedor do contexto
  return (
    <SoundContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
        playNextTrack,
        setStartPlay,
        soundRefs,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
