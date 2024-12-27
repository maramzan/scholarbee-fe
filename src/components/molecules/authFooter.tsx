import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const AuthFooter = () => {
  return (
    <Box sx={{ pb: 2, mt: 'auto' }} data-test-id="auth-footer">
      <Typography variant="body2" color="textSecondary" align="center">
        <Link
          href="#"
          style={{ color: 'inherit', textDecoration: 'none' }}
          data-test-id="terms-and-conditions-link"
        >
          {'Terms and Conditions'}
        </Link>
        {' • '}
        <Link
          href="#"
          style={{ color: 'inherit', textDecoration: 'none' }}
          data-test-id="privacy-policy-link"
        >
          {'Privacy Policy'}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthFooter;
