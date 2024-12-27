import { CustomTypography } from '@/components/atoms/customTypography';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import locationIcon from '/public/assets/svg/location-white.svg';
// import uniLogo from '/public/assets/png/uni-logo.png';
// import startIcon from '/public/assets/svg/star.svg';

const HeroSection = ({
  uni_logo,
  title,
  address,
  campusImage
}: {
  uni_logo: string;
  title: string;
  address: string;
  campusImage: string;
}) => {
  const styles = mainStyles(campusImage);
  return (
    <Box sx={styles.heroSection}>
      <Box sx={styles.heroContent}>
        <Image src={uni_logo} width={92} height={92} alt="University Logo" />
        <CustomTypography
          mt={2}
          color="white"
          fontSize={36}
          smallFont={18}
          fontWeight={600}
        >
          {title}
        </CustomTypography>
        <Box display="flex" gap={1}>
          <Image src={locationIcon} alt="location icon" />
          <Typography color="white" variant="body1">
            {address || 'New York City, New York, USA'}
          </Typography>
          {/* <Image src={startIcon} alt="location icon" />
          <Typography color="white" variant="body1">
            4
          </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;

const mainStyles = (campusImage: string) => ({
  heroSection: {
    width: '100%',
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${campusImage?.trim()?.replace(/ /g, '%20')}) lightgray 50% / cover no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: {
      xs: '220px',
      sm: '330px'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});
