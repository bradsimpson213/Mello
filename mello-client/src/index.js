import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from "./customTheme"
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
