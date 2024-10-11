import { Howl } from 'howler';
import React, { useState, useEffect, useRef } from 'react';
import themes from '../global/themeConfig';

const MusicPlayer = ({ startTrackIndex = 0, onSwitchTrack, onFadeOutCurrentTrack }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(startTrackIndex);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const trackKeys = ['intro', 'base_beat', 'cowboy_theme', 'international_theme', 'mythology_theme', 'egypt_theme'];

  const soundRefs = useRef({
    intro: new Howl({ 
      src: [themes['global'].initial_src], 
      preload: true,
      loop: false,
      onend: () => {
        setCurrentTrackIndex(2);
        console.log('Intro ended');
      },
    }),
    base_beat: new Howl({ 
      src: [themes['global'].src], 
      preload: true,
      loop: true,
      volume: 0.1,
      onend: () => console.log('Base beat ended'),
    }),
    cowboy_theme: new Howl({ 
      src: [themes['egypt'].src], 
      preload: true,
      loop: true,
      volume: 0.1,
      onend: () => console.log('Cowboy theme ended'),
    }),
    international_theme: new Howl({ 
      src: [themes['mythology'].src], 
      preload: true, 
      loop: true,
      volume: 0.1,
      onend: () => console.log('International theme ended'),
    }),
    mythology_theme: new Howl({ 
      src: [themes['international'].src], 
      preload: true,
      loop: true,
      volume: 0.1,
      onend: () => console.log('Mythology theme ended'),
    }),
    egypt_theme: new Howl({ 
      src: [themes['cowboy'].src], 
      preload: true,
      loop: true,
      volume: 0.1,
      onend: () => console.log('Egypt theme ended'),
    }),
  });

  // Function to play a specific track with fade-in
  const playTrackWithFadeIn = (trackIndex) => {
    const trackKey = trackKeys[trackIndex];
    const track = soundRefs.current[trackKey];

    console.log(`Playing track ${trackIndex}: ${trackKey}`);

    if (track) {
      track.play();
      trackKey.volume(value);
      setIsPlaying(true);
      setCurrentTrack(track); // Set the new track as the current track
    }
  };

  // Function to stop the current track with fade-out
  const fadeOutCurrentTrack = (callback) => {
    if (currentTrack) {
      console.log('Fading out current track...');
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
    console.log(`Switching to track ${trackIndex}...`);
    fadeOutCurrentTrack(() => {
      setCurrentTrackIndex(trackIndex);
      playTrackWithFadeIn(trackIndex);
    });
  };

  useEffect(() => {
    playTrackWithFadeIn(currentTrackIndex); // Play the initial track
    console.log('Playing initial track');
  }, [currentTrackIndex]);

  // Expose methods to the parent via props
  useEffect(() => {
    if (onSwitchTrack) {
      onSwitchTrack(switchTrack);
    }
    if (onFadeOutCurrentTrack) {
      onFadeOutCurrentTrack(fadeOutCurrentTrack);
    }
  }, [onSwitchTrack, onFadeOutCurrentTrack]);

  return null; // No UI rendering
};

export default MusicPlayer;
