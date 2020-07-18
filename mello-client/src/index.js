import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from "./customTheme";
import AppWithContext from './AppWithContext';



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <AppWithContext />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
