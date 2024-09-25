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

// Creating the sound context
const SoundContext = createContext();

// Hook to use the sound context
export const useSound = () => useContext(SoundContext);

// Sound provider that manages the sound logic
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

  // Create references for all sounds and set initial volume to 0 for all tracks
  const soundRefs = useRef({
    intro: new Howl({
      src: [themes["base"].initial_src],
      preload: true,
      autoplay: false,
      loop: false,
      volume: 1, // Initially volume is 0
      onend: () => initialTrack(),
    }),
    base_beat: new Howl({
      src: [themes["base"].src],
      preload: true,
      loop: true,
      volume: 0, // Initially volume is 0
    }),
    cowboy_theme: new Howl({
      src: [themes["cowboy"].src],
      preload: true,
      loop: true,
      volume: 0, // Initially volume is 0
    }),
    international_theme: new Howl({
      src: [themes["international"].src],
      preload: true,
      loop: true,
      volume: 0, // Initially volume is 0
    }),
    mythology_theme: new Howl({
      src: [themes["mythology"].src],
      preload: true,
      loop: true,
      volume: 0, // Initially volume is 0
    }),
    egypt_theme: new Howl({
      src: [themes["egypt"].src],
      preload: true,
      loop: true,
      volume: 0, // Initially volume is 0
    }),
  });

  // Function to play all sounds at the same time with volume 0 (except the current one)
  const playAllSounds = () => {
    Object.keys(soundRefs.current).forEach((trackKey, index) => {
      // Skip the "intro" track
      if (trackKey === "intro") return;

      const sound = soundRefs.current[trackKey];

      if (index === currentTrackIndex) {
        sound.volume(1); // Play the current track with normal volume
      } else {
        sound.volume(0); // Other tracks at volume 0
      }

      sound.play();
    });
  };

  const stopAllSounds = () => {
    Object.keys(soundRefs.current).forEach((trackKey) => {
      const sound = soundRefs.current[trackKey];
      if (sound.playing()) {
        sound.stop(); // Stop the track if it's playing
      }
    });
  };

  const getTrackKey = () => {
    const theme = currentTheme; // Get the current theme
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
  };

  const initialTrack = () => {
    playAllSounds();

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
    switchTrack(getTrackKey());
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
      currentSound.fade(1, 0, 1000);
    }

    setTimeout(() => {
      if (newSound) {
        newSound.fade(0, 1, 500);
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
      playSound("intro");
    }
  }, [startPlay]);

  useEffect(() => {
    if (introPlayed) {
      console.log("The theme changed, now change the music: ", currentTheme);
      playNextTrack(); // Play the track corresponding to the new theme
    }
  }, [currentTheme]);

  // Sound context provider
  return (
    <SoundContext.Provider
      value={{
        currentTrackIndex,
        setCurrentTrackIndex,
        playNextTrack,
        setStartPlay,
        soundRefs,
        switchTrack
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
