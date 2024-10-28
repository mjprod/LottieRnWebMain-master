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
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

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
      volume:  1, // Initially volume is 0
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

// Function to mute all sounds (set their volume to 0 and mute them)
const muteAllSounds = () => {
  Object.keys(soundRefs.current).forEach((trackKey) => {
    const sound = soundRefs.current[trackKey];
    if (sound.playing()) {
      // Fade out and mute each sound
      sound.fade(sound.volume(), 0, 1000); // Fade volume to 0 over 1 second
      sound.mute(true); // Use mute to ensure complete muting
    }
  });
};

// Function to replay all sounds with the current theme at volume 1
const rePlayAllSounds = () => {
  Object.keys(soundRefs.current).forEach((trackKey, index) => {
    const sound = soundRefs.current[trackKey];

    if (trackKey === trackKeys[currentTrackIndex]) {
      // For the current track
      if (isSoundEnabled) {
        // Unmute and fade in the current track if sound is enabled
        sound.mute(false); // Unmute the current track
        sound.fade(0, 1, 1000); // Fade in the current track
      } else {
        // Mute and set volume to 0 if sound is disabled
        sound.mute(true); // Mute the track
        sound.volume(0); // Keep volume at 0 while muted
      }

      if (!sound.playing()) {
        sound.play(); // Ensure the sound is playing
      }
    } else {
      // Mute and set volume to 0 for other tracks
      sound.mute(true); // Mute other tracks
      sound.volume(0);  // Ensure volume is 0
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
      //sconst targetVolume = isSoundEnabled ? 1 : 0;
      newSound.fade(0, 1, 500);
      //newSound.fade(0, 1, 500);
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
  
    // Fade out the current track
    if (currentSound) {
      currentSound.fade(1, 0, 1000); // Fade out current track
    }
  
    setTimeout(() => {
      if (newSound) {
        if (isSoundEnabled) {
          // If sound is enabled, fade in the new track
          newSound.mute(false); // Unmute the new track
          newSound.fade(0, 1, 1000); // Fade in the new track
        } else {
          // If sound is disabled, mute the new track and set its volume to 0
          newSound.mute(true); 
          newSound.volume(0); // Ensure the volume is 0 while muted
        }
  
        if (!newSound.playing()) {
          newSound.play(); // Ensure the new sound starts playing
        }
      }
    }, 500);
  
    setCurrentTrackIndex(newIndex); // Update current track index
  };
  

  const playSound = (soundKey) => {
    if (soundRefs.current[soundKey]) {
      soundRefs.current[soundKey].play();
    }
  };

  useEffect(() => {
    if(currentTrackIndex === 0) {
      return;
    }
    console.log("Sound enabled: ", isSoundEnabled);

    if (isSoundEnabled) {
      rePlayAllSounds(); // Unmute and play the current track
    } else {
      muteAllSounds(); // Mute all sounds
    }
  }, [isSoundEnabled]);

  useEffect(() => {
    if (startPlay) {
      playSound("intro");
    } else {
      stopAllSounds();
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
        isSoundEnabled,
        setIsSoundEnabled,
        soundRefs,
        switchTrack,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
