// import * as _ from 'lodash';
import { createRoot } from 'react-dom/client';
import React = require('react');
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app">Hello!</div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
