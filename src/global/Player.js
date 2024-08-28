import React from 'react';
import settings from './Settings';

export const playSound = (fileName) => {
  //if (!settings.soundOn) {
    //return;
  //}
  
  const audio = new Audio((fileName));
  audio.play().then(() => {
    console.log('Sound played!');
  }).catch(error => {
    console.error('Error playing sound:', error);
  });
  
};