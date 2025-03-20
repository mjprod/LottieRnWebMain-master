import { Howl } from "howler";
import { useCallback, useRef } from "react";
import { useSound } from "./useSoundPlayer";

const useComboSounds = () => {
    const { isSoundEnabled } = useSound();

    const soundRefs = useRef({});

    const initializeComboSounds = useCallback(() => {
        soundRefs.current = {
            x4: new Howl({
                src: [require(`./../assets/sounds/combo.mp3`)],
                preload: true,
            }),
            x3: new Howl({
                src: [require(`./../assets/sounds/nice_combo.mp3`)],
                preload: true,
            }),
            x2: new Howl({
                src: [require(`./../assets/sounds/ultra_combo.mp3`)],
                preload: true,
            }),
        };

        return () => {
            Object.values(soundRefs.current).forEach(sound => {
                sound.stop();
                sound.unload();
            });
        };
    }, [soundRefs]);

    const playComboSound = useCallback((soundKey) => {
        if (soundRefs.current[soundKey] && isSoundEnabled) {
            soundRefs.current[soundKey].play();
        }
    }, [soundRefs, isSoundEnabled]);

    return { initializeComboSounds, playComboSound };
}

export default useComboSounds;