import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import circleBg from '/public/assets/svg/circles-bg.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const AuthSideImage = ({
  text,
  sideImage,
  imageHeight,
  imageWidth
}: {
  text: string;
  sideImage: StaticImport;
  imageHeight?: number;
  imageWidth?: number;
}) => {
  return (
    <Grid
      item
      xs={12}
      md={7}
      sx={{
        background: 'linear-gradient(174deg, #4A9DE0 2.64%, #0B3B95 92.87%)',
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        position: 'relative',
        overflowY: { sm: 'auto', md: 'hidden' }
      }}
      data-test-id="auth-side-image"
    >
      <Image
        src={circleBg}
        alt="circle bg image"
        style={{
          zIndex: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        data-test-id="background-image"
      />

      <Box
        textAlign="center"
        sx={{
          maxWidth: {
            sm: '500px',
            md: '600px'
          },
          px: { xs: 4, md: 9 },
          py: { xs: 4, md: 10 },
          borderRadius: '24px',
          border: '1px solid #fff',
          background: 'rgba(63, 93, 150, 0.10)',
          zIndex: 2
        }}
        data-test-id="content-box"
      >
        <Image
          src={sideImage}
          alt="Illustration"
          width={imageWidth || 325}
          height={imageHeight || 371}
          style={{
            width: '100%',
            maxWidth: imageWidth || '275px',
            height: 'auto'
          }}
          priority
          data-test-id="side-image"
        />
        <Typography variant="h5" color="white" mt={2} data-test-id="text">
          {text}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AuthSideImage;
