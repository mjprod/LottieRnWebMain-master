import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Howl, Howler } from "howler";
import themes from "../global/themeConfig.js";
import { useTheme } from "./useTheme.js";
import useStorage, { storageKeys } from "./useStorage.js";

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  Howler.autoUnlock = true;
  const [startPlay, setStartPlay] = useState(false);
  const { loadData } = useStorage();

  useEffect(() => {
    const enableAudio = () => {
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume();
      }
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("touchstart", enableAudio);
    };
    window.addEventListener('click', enableAudio);
    window.addEventListener('touchstart', enableAudio);
    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
  }, []);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(loadData(storageKeys.soundEnabled) === "true");

  const { currentTheme } = useTheme();

  useEffect(() => {
    Object.values(soundRefs.current).forEach((sound) => {
      sound.on("playerror", (id) => {
        if (Howler.ctx && Howler.ctx.state === "suspended") {
          Howler.ctx.resume().then(() => sound.play(id));
        }
      });
    });
  }, []);

  const trackKeys = [
    "intro",
    "base_beat",
    "egypt_theme",
    "international_theme",
    "mythology_theme",
    "cowboy_theme",
  ];

  const soundRefs = useRef({
    intro: new Howl({
      src: [themes["base"].initial_src],
      preload: true,
      autoplay: false,
      loop: false,
      volume: isSoundEnabled ? 1 : 0,
      onend: () => initialTrack(),
    }),
    base_beat: new Howl({
      src: [themes["base"].src],
      preload: true,
      loop: true,
      volume: 0,
    }),
    cowboy_theme: new Howl({
      src: [themes["cowboy"].src],
      preload: true,
      loop: true,
      volume: 0,
    }),
    international_theme: new Howl({
      src: [themes["international"].src],
      preload: true,
      loop: true,
      volume: 0,
    }),
    mythology_theme: new Howl({
      src: [themes["mythology"].src],
      preload: true,
      loop: true,
      volume: 0,
    }),
    egypt_theme: new Howl({
      src: [themes["egypt"].src],
      preload: true,
      loop: true,
      volume: 0,
    }),
  });

  const setSoundVolume = (sound, volume, fadeDuration = 500) => {
    if (sound) { sound.fade(sound.volume(), volume, fadeDuration); }
  };

  const playSoundIfNotPlaying = (sound) => {
    if (sound && !sound.playing()) {
      sound.play();
    }
  };

  const playAllSounds = () => {
    Object.keys(soundRefs.current).forEach((trackKey, index) => {
      if (trackKey === "intro") { return; }
      const sound = soundRefs.current[trackKey];
      if (index === currentTrackIndex) {
        setSoundVolume(sound, isSoundEnabled ? 1 : 0);
        playSoundIfNotPlaying(sound);
      } else {
        sound.pause();
        setSoundVolume(sound, 0);
      }
    });
  };

  const muteAllSounds = () => {
    Object.values(soundRefs.current).forEach((sound) => {
      if (sound.playing()) {
        sound.pause();
      }
    });
  };

  const getTrackKey = useCallback(() => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
    const theme = currentTheme;
    switch (theme) {
      case "egypt":
        return 2;
      case "international":
        return 3;
      case "mythology":
        return 4;
      case "cowboy":
        return 5;
      default:
        return 1;
    }
  }, [currentTheme]);

  const initialTrack = () => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
    const newIndex = getTrackKey();
    const newTrackKey = trackKeys[newIndex];
    const newSound = soundRefs.current[newTrackKey];
    if (newSound) {
      newSound.play();
      newSound.fade(0, isSoundEnabled ? 1 : 0, 500);
    }
    setIntroPlayed(true);
    setCurrentTrackIndex(newIndex);
  };

  const playNextTrack = () => {
    const newIndex = getTrackKey();
    switchTrack(newIndex);
  };

  const switchTrack = (newIndex) => {
    const currentSound = soundRefs.current[trackKeys[currentTrackIndex]];
    setSoundVolume(currentSound, isSoundEnabled ? 1 : 0);
    if (newIndex === currentTrackIndex) { return; }

    const newSound = soundRefs.current[trackKeys[newIndex]];

    if (currentSound) {
      currentSound.fade(currentSound.volume(), 0, 500);
      setTimeout(() => currentSound.stop(), 500);
    }

    setTimeout(() => {
      if (newSound) {
        newSound.play();
        newSound.fade(0, isSoundEnabled ? 1 : 0, 500);
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
    if (currentTrackIndex > 0) {
      isSoundEnabled ? playAllSounds() : muteAllSounds();
    }
  }, [isSoundEnabled, currentTrackIndex]);

  useEffect(() => {
    muteAllSounds();
    if (startPlay) {
      playSound(trackKeys[0]);
    }
  }, [startPlay]);

  useEffect(() => {
    if (introPlayed) { playNextTrack(); }
  }, [currentTheme, introPlayed]);

  return (
    <SoundContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
        playNextTrack,
        setStartPlay,
        isSoundEnabled,
        setIsSoundEnabled,
        soundRefs,
        switchTrack,
        setIntroPlayed,
      }}>
      {children}
    </SoundContext.Provider>
  );
};
