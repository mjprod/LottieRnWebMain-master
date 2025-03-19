import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

import * as ReactDOMLegacy from 'react-dom';
import AppRoot from './util/AppRoot';

if (!ReactDOMLegacy.findDOMNode) {
  ReactDOMLegacy.findDOMNode = (component) => {
    if (component) {
      if (component instanceof HTMLElement) {
        return component;
      }
      if (component.base) {
        return component.base;
      }
    }
    console.warn('findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. You can use a ref to get the DOM node.');
    return null;
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRoot>
    <App />
  </AppRoot>
);