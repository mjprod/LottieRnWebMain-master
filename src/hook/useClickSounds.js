import { Howl } from "howler";
import { useCallback, useEffect, useRef } from "react";
import { useSound } from "./useSoundPlayer";
import { useTheme } from "./useTheme";

const useClickSounds = () => {
  const soundRefs = useRef({});
  const { isSoundEnabled } = useSound();
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (currentTheme !== null) {
      const soundNotes = ["C", "D", "E", "E", "F_", "G_", "G_", "A_", "C_plus", "C_plus", "D_plus", "E_plus"];

      soundRefs.current = {};
      for (let i = 1; i <= 12; i++) {
        soundRefs.current[`sound${i}`] = new Howl({
          src: [require(`./../assets/audio/${currentTheme}/${i}_${soundNotes[i - 1]}.mp3`)],
          preload: true,
          volume: isSoundEnabled ? 1 : 0,
        });
      }
      soundRefs.current.error = new Howl({ src: [require("./../assets/audio/sfx_autopopup.wav")], preload: true, volume: isSoundEnabled ? 1 : 0 });
    }
    return () => {
      Object.values(soundRefs.current).forEach(sound => {
        sound.stop();
        sound.unload();
      });
    };
  }, [currentTheme, isSoundEnabled]);

  const playClickSound = (soundKey) => {
    const sound = soundRefs.current[soundKey];
    if (sound) {
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

  return { playClickSound };
};

export default useClickSounds;