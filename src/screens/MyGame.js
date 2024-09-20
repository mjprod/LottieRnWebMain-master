import React, { useRef } from 'react';
import MusicPlayer from '../components/MusicPlayer';

const MyGame = () => {
  const musicPlayerRef = useRef(null);

  const handlePlay = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.playTrack(0); // Play track 0
    }
  };

  const handleStop = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.stopTrack(); // Stop the current track
    }
  };

  return (
    <div>
     

      {/* Controls to play and stop the track */}
      <button onClick={handlePlay}>Play Track 1</button>
      <button onClick={handleStop}>Stop Track</button>
    </div>
  );
};

export default MyGame;
