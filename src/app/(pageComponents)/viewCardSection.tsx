import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import playIcon from '/public/assets/svg/play-icon.svg';
import { VideoCardTypes } from '../create-profile/constants/types';
import { shimmer, toBase64 } from '@/utils/imageUtils';

const VideoCardSection = ({
  focused,
  name,
  imageUrl,
  title,
  description
}: VideoCardTypes) => {
  return (
    <Box
      sx={{
        maxWidth: focused ? 310 : 280,
        width: '100%',
        mx: 'auto',
        mt: { xs: 0, md: focused ? 5 : 0 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          boxShadow: '0px 1px 15px 0px rgba(0, 0, 0, 0.05)',
          borderRadius: 2.5,
          p: 2,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.1)',
            '& .video-thumbnail': {
              transform: 'scale(1.05)'
            },
            '& .play-icon': {
              transform: 'translate(-50%, -50%) scale(1.1)'
            }
          }
        }}
      >
        <VideoComponent imageUrl={imageUrl} />
        <Typography fontWeight={600} variant="body1" color="primary">
          {title}
        </Typography>
      </Paper>
      <Typography textAlign="center" variant="h6" mt={6}>
        {name}
      </Typography>
      <Typography textAlign="center" variant="body2" mt={1.5}>
        {description}
      </Typography>
    </Box>
  );
};

const VideoComponent = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 240,
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    >
      <Image
        src={imageUrl}
        alt="Video preview"
        width={310}
        height={240}
        className="video-thumbnail"
        style={{
          width: '100%',
          height: '240px',
          borderRadius: '16px',
          objectFit: 'cover',
          transition: 'transform 0.3s ease'
        }}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(310, 240))}`}
        quality={85}
      />
      <Box
        className="play-icon"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '48px',
          height: '48px',
          transition: 'transform 0.3s ease',
          zIndex: 1
        }}
      >
        <Image
          src={playIcon}
          alt="Play video"
          width={48}
          height={48}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          transition: 'background 0.3s ease',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.1)'
          }
        }}
      />
    </Box>
  );
};

export default VideoCardSection;
