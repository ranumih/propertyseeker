import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

// Get the root element from the HTML where the React app will be mounted
const root = createRoot(document.getElementById('root'));

// Render the React application inside the root element
root.render(

  /* StrictMode to highlight potential problems in the application during development*/
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
