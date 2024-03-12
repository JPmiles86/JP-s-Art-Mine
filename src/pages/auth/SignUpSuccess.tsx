// my-gallery/src/pages/auth/SignUpSuccess.tsx

import React from 'react';
import { Typography } from '@mui/material';

const SignUpSuccess: React.FC = () => {
  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Sign Up Successful
      </Typography>
      <Typography variant="body1" align="center">
        Thank you for signing up! You are now signed in.
      </Typography>
    </div>
  );
};

export default SignUpSuccess;