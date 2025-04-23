import { Howl } from "howler";
import { useCallback, useEffect, useRef } from "react";
import { useSound } from "./useSoundPlayer";

const soundFiles = {
    x4: require("../assets/sounds/combo.mp3"),
    x3: require("../assets/sounds/nice_combo.mp3"),
    x2: require("../assets/sounds/ultra_combo.mp3"),
};

const useComboSounds = () => {
    const { isSoundEnabled } = useSound();
    const soundRefs = useRef({});

    useEffect(() => {
        // Inicializa sons automaticamente ao montar
        soundRefs.current = Object.entries(soundFiles).reduce((sounds, [key, src]) => {
            sounds[key] = new Howl({ src: [src], preload: true });
            return sounds;
        }, {});

        // Cleanup automático ao desmontar
        return () => {
            Object.values(soundRefs.current).forEach((sound) => {
                sound.stop();
                sound.unload();
            });
            soundRefs.current = {};
        };
    }, []);

    const playComboSound = useCallback(
        (soundKey) => {
            const sound = soundRefs.current[soundKey];
            if (isSoundEnabled && sound) {
                sound.play();
            }
        },
        [isSoundEnabled]
    );

    return { playComboSound };
};

export default useComboSounds;