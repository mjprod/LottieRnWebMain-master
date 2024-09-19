import { Howl } from 'howler';
import React, { useState, useEffect } from 'react';
import themes from '../global/themeConfig';

console.log(themes);
// List of tracks to play
console.log([themes.length ]);
const tracks = [
  { title: "Track 1", url: themes['global'].initial_src},
  { title: "Track 2", url: themes['global'].src},
  { title: "Track 3", url: themes['egypt'].src },
  { title: "Track 4", url: themes['mythology'].initial_src },
  { title: "Track 5", url:themes['international'].src },
  { title: "Track 6", url: themes['cowboy'].initial_src },
];

export default function MusicPlayer({ startTrackIndex = 0 }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(startTrackIndex);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to play a specific track with fade-in
  const playTrackWithFadeIn = (trackIndex) => {
    const newTrack = new Howl({
      src: [tracks[trackIndex].url],
      volume: 0, // Start with volume 0 for fade-in effect
      html5: true, // Enable HTML5 audio for larger files
      onend: function () {
        console.log("Track ended, playing next track...");
        playNextTrack(); // Automatically play next track when the current one ends
      },
      onload: function () {
        newTrack.play();
        newTrack.fade(0, 1, 2000); // Fade-in over 2 seconds
        setIsPlaying(true);
      }
    });
    setCurrentTrack(newTrack);
  };

  // Function to stop the current track with fade-out
  const fadeOutCurrentTrack = (callback) => {
    if (currentTrack) {
      currentTrack.fade(1, 0, 2000); // Fade-out over 2 seconds
      setTimeout(() => {
        currentTrack.stop();
        currentTrack.unload();
        setIsPlaying(false);
        callback(); // Proceed to the next track after fade-out
      }, 2000); // Wait for fade-out to complete before switching
    } else {
      callback(); // If no track is playing, directly switch to the next
    }
  };

  // Handle track change (wait for the current track to fade out, then switch)
  const switchTrack = (trackIndex) => {
    fadeOutCurrentTrack(() => {
      setCurrentTrackIndex(trackIndex);
      playTrackWithFadeIn(trackIndex);
    });
  };

  // Play next track
  const playNextTrack = () => {
    const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
    switchTrack(nextTrackIndex);
  };

  // Play previous track
  const playPreviousTrack = () => {
    const previousTrackIndex =
      (currentTrackIndex - 1 + tracks.length) % tracks.length;
    switchTrack(previousTrackIndex);
  };

  // Automatically start the first track when the component mounts
  useEffect(() => {
    playTrackWithFadeIn(currentTrackIndex);

    return () => {
      if (currentTrack) {
        currentTrack.stop();
        currentTrack.unload(); // Cleanup track when component unmounts
      }
    };
  }, []);

  return null; // No UI rendering
}
