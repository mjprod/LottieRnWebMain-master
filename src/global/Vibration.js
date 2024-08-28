import {Vibration} from 'react-native';
import settings from './Settings';

const lightVibrationPattern = [0, 50];
const mediumVibrationPattern = [0, 100, 100, 100];
const strongVibrationPattern = [0, 300];

export const triggerVibration = intensity => {
  if (!settings.vibrationOn) {
    return;
  }
  switch (intensity) {
    case 'light':
      Vibration.vibrate(lightVibrationPattern);
      break;
    case 'medium':
      Vibration.vibrate(mediumVibrationPattern);
      break;
    case 'strong':
      Vibration.vibrate(strongVibrationPattern);
      break;
    default:
      Vibration.vibrate();
      break;
  }
};
//triggerVibration('light');
//triggerVibration('medium');
//triggerVibration('strong');
