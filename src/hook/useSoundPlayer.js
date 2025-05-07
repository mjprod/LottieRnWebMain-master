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

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  // Enable Howler auto-unlock on first user gesture
  Howler.autoUnlock = true;
  const [startPlay, setStartPlay] = useState(false);

  useEffect(() => {
    const enableAudio = () => {
      // Resume Web Audio context and start playback on first user gesture
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
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const { currentTheme } = useTheme();

  useEffect(() => {
    // Retry playback if Web Audio context is suspended
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
      volume: 1,
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

  const setSoundVolume = (sound, volume, fadeDuration = 1000) => {
    if (sound) {sound.fade(sound.volume(), volume, fadeDuration);}
  };

  const toggleMuteSound = (sound, mute) => {
    if (sound) {
      sound.mute(mute);
      if (mute) {sound.volume(0);}
    }
  };

  const playSoundIfNotPlaying = (sound) => {
    if (sound && !sound.playing()) {
      sound.play();
    }
  };

  const playAllSounds = () => {
    Object.keys(soundRefs.current).forEach((trackKey, index) => {
      if (trackKey === "intro") {return;}
      const sound = soundRefs.current[trackKey];

      if (index === currentTrackIndex) {
        setSoundVolume(sound, 1);
        playSoundIfNotPlaying(sound);
      } else {
        sound.stop(); // Ensure other tracks are stopped
        setSoundVolume(sound, 0);
      }
    });
  };

  const muteAllSounds = () => {
    Object.values(soundRefs.current).forEach((sound) => {
      if (sound.playing()) {
        setSoundVolume(sound, 0);
        toggleMuteSound(sound, true);
      }
    });
  };

  const rePlayAllSounds = () => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
    Object.keys(soundRefs.current).forEach((trackKey) => {
      if (trackKey === "intro") {return;}
      const sound = soundRefs.current[trackKey];
      if (trackKey === trackKeys[currentTrackIndex]) {
        setSoundVolume(sound, isSoundEnabled ? 1 : 0);
        playSoundIfNotPlaying(sound);
      } else {
        sound.stop(); // Stop other tracks to prevent overlapping
        toggleMuteSound(sound, true);
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
      newSound.fade(0, 1, 500);
    }
    setIntroPlayed(true);
    setCurrentTrackIndex(newIndex);
  };

  const playNextTrack = () => {
    const newIndex = getTrackKey();
    switchTrack(newIndex);
  };

  const switchTrack = (newIndex) => {
    if (newIndex === currentTrackIndex) {return;}

    const currentSound = soundRefs.current[trackKeys[currentTrackIndex]];
    const newSound = soundRefs.current[trackKeys[newIndex]];

    if (currentSound) {
      currentSound.fade(currentSound.volume(), 0, 500); // Fade out before stopping
      setTimeout(() => currentSound.stop(), 500);
    }

    setTimeout(() => {
      if (newSound) {
        toggleMuteSound(newSound, !isSoundEnabled);
        setSoundVolume(newSound, isSoundEnabled ? 1 : 0);
        playSoundIfNotPlaying(newSound);
        newSound.fade(0, 1, 500); // Fade in new track
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
      isSoundEnabled ? rePlayAllSounds() : muteAllSounds();
    }
  }, [isSoundEnabled, currentTrackIndex]);

  useEffect(() => {
    muteAllSounds();
    if (startPlay) {
      playSound(trackKeys[0]);
    }
  }, [startPlay]);

  useEffect(() => {
    if (introPlayed) {playNextTrack();}
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
