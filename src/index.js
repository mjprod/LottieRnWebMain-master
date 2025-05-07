import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('✅ Service Worker registered', reg);
      })
      .catch((err) => {
        console.warn('❌ Service Worker registration failed', err);
      });
  });
}