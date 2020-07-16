import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from "./customTheme";
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
