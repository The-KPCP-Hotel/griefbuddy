// import * as _ from 'lodash';
import { createRoot } from 'react-dom/client';
import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { Skeleton } from '@chakra-ui/react';
import App from './components/App';
// const App = lazy(() => import('./components/App'));

// Clear the existing HTML content
document.body.innerHTML = '<div id="app">Hello!</div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<App />);
