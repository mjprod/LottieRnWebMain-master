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
  const [introPlayed, setIntroPlayed] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(loadData(storageKeys.soundEnabled) === "true");
  const [currentThemeTrackIndex, setCurrentThemeTrackIndex] = useState(1);
  const { currentTheme } = useTheme();

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
      startPlay(false);
      setIntroPlayed(false);
    };
  }, []);

  const soundRefs = useRef({
    intro: new Howl({
      src: [themes["base"].initial_src],
      preload: true,
      autoplay: false,
      loop: false,
      volume: isSoundEnabled ? 1 : 0,
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

  useEffect(() => {
    Object.values(soundRefs.current).forEach((sound) => {
      sound.on("playerror", (id) => {
        if (Howler.ctx && Howler.ctx.state === "suspended") {
          Howler.ctx.resume().then(() => sound.play(id));
        }
      });
    });
  }, []);

  useEffect(() => {
    console.log("current theme", currentTheme);
    switch (currentTheme) {
      case "egypt":
        setCurrentThemeTrackIndex(2);
        break;
      case "international":
        setCurrentThemeTrackIndex(3);
        break;
      case "mythology":
        setCurrentThemeTrackIndex(4);
        break;
      case "cowboy":
        setCurrentThemeTrackIndex(5);
        break;
      default:
        setCurrentThemeTrackIndex(1);
        break;
    }
  }, [currentTheme]);

  const trackKeys = [
    "intro",
    "base_beat",
    "egypt_theme",
    "international_theme",
    "mythology_theme",
    "cowboy_theme",
  ];

  const setSoundVolume = (sound, volume, fadeDuration = 500) => {
    if (sound) { sound.fade(sound.volume(), volume, fadeDuration); }
  };

  const playSoundIfNotPlaying = (sound) => {
    if (sound && !sound.playing()) {
      sound.play();
    }
  };

  const playAllSounds = useCallback(() => {
    muteAllSounds();
    trackKeys.forEach((trackKey, index) => {
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
  }, [currentTrackIndex, isSoundEnabled]);

  const switchTrack = useCallback((newIndex) => {
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
        playSoundIfNotPlaying(newSound);
        newSound.fade(0, isSoundEnabled ? 1 : 0, 500);
      }
    }, 500);

    setCurrentTrackIndex(newIndex);
  }, [currentTrackIndex, isSoundEnabled]);

  const handleIntroEnd = useCallback(() => {
    setIntroPlayed(true);
    playAllSounds();
    switchTrack(currentThemeTrackIndex);
  }, [playAllSounds, switchTrack, currentThemeTrackIndex]);

  useEffect(() => {
    const introSound = soundRefs.current.intro;
    introSound.on("end", handleIntroEnd);
    return () => {
      introSound.off("end", handleIntroEnd);
    };
  }, [handleIntroEnd]);

  useEffect(() => {
    if (introPlayed) {
      switchTrack(currentThemeTrackIndex);
    }
  }, [introPlayed, currentThemeTrackIndex, switchTrack]);

  const muteAllSounds = () => {
    Object.values(soundRefs.current).forEach((sound) => {
      if (sound.playing()) {
        sound.pause();
      }
    });
  };

  useEffect(() => {
    if (currentTrackIndex > 0) {
      isSoundEnabled ? playAllSounds() : muteAllSounds();
    }
  }, [isSoundEnabled, currentTrackIndex]);

  useEffect(() => {
    muteAllSounds();
    if (startPlay) {
      setSoundVolume(soundRefs.current.intro, isSoundEnabled ? 1 : 0);
      playSoundIfNotPlaying(soundRefs.current.intro);
    }
  }, [startPlay]);

  return (
    <SoundContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
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
