'use client';
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';

interface CustomTypographyProps extends TypographyProps {
  fontSize?: string | number;
  smallFont?: string | number;
  fontWeight?: number | string;
  smallWeight?: number;
  'data-test-id'?: string;
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({
  fontSize,
  smallFont,
  fontWeight,
  smallWeight,
  sx,
  'data-test-id': dataTestId,
  ...props
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const effectiveSmallWeight = smallWeight ?? fontWeight;

  return (
    <Typography
      {...props}
      sx={{
        fontSize: isSmallScreen ? smallFont : fontSize,
        fontWeight: isSmallScreen ? effectiveSmallWeight : fontWeight,
        ...sx
      }}
      data-test-id={dataTestId}
    />
  );
};
