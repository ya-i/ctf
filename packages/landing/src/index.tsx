import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app';
import { reportWebVitals } from './report-web-vitals';

import './index.css';

const rootElement = document.getElementById('react-root');

if (rootElement!.hasChildNodes()) {
  ReactDOM.hydrate(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}

reportWebVitals();
