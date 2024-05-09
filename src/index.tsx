// my-gallery/src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from './GlobalStyles';
import '@fontsource/eb-garamond';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No root element found");
}

const theme = createTheme({
  typography: {
    fontFamily: 'EB Garamond, serif',
  },
});

const stripePromise = loadStripe('pk_test_51PDsBALgrr7kNbZdoy9fFIPgPTWjxiUq97ZCuC1nQ0fXavoQBB1TUEdUDQAdm2iQKOiLJULnXFQOB7OBg22JqiLh002F8quubh');

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
