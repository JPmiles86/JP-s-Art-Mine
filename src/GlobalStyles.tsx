import * as React from 'react';
import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      body: {
        margin: 0,
        fontFamily: 'EB Garamond, serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
      },
    }}
  />
);

export default GlobalStyles;
