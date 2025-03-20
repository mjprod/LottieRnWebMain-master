import { Howl } from "howler";
import { useRef } from "react";
import { useSound } from "../hook/useSoundPlayer";

const useSoundManager = () => {
  const soundRefs = useRef({});;
  const { isSoundEnabled } = useSound();
  const initializeSounds = (theme) => {
    console.log("Initializing sounds for theme:", theme);
    const soundNotes = ["C", "D", "E", "E", "F_", "G_", "G_", "A_", "C_plus", "C_plus", "D_plus", "E_plus"];

    soundRefs.current = {};
    for (let i = 1; i <= 12; i++) {
      soundRefs.current[`sound${i}`] = new Howl({
        src: [require(`./../assets/audio/${theme}/${i}_${soundNotes[i - 1]}.mp3`)],
        preload: true,
      });
    }
    soundRefs.current.error = new Howl({ src: [require("./../assets/audio/sfx_autopopup.wav")], preload: true });
    return () => {
      Object.values(soundRefs.current).forEach(sound => {
        sound.stop();
        sound.unload();
      });
    };
  }

  const playSound = (soundKey) => {
    const sound = soundRefs.current[soundKey];

    if (sound && isSoundEnabled) {
      if (!sound._loaded) {
        sound.once("load", () => {
          sound.play();
        });
        sound.load();
      } else {
        sound.play();
      }
    } else {
      console.error(`Sound ${soundKey} not found`);
    }
  };

  return { initializeSounds, playSound };
}

export default useSoundManager;