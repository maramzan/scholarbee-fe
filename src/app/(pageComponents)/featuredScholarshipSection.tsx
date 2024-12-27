'use client';
import Tag from '@/components/atoms/tag';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import medalIcon from '/public/assets/svg/award.svg';
import Title from '@/components/atoms/title';
import Carousel from '@/components/molecules/carousel2';

const FeaturedScholarshipSection = () => {
  return (
    <Box bgcolor="white" sx={{ px: 2, py: { xs: 5, md: 7, lg: 10 } }}>
      <Container sx={{ justifyContent: 'center', display: 'flex' }}>
        <Stack sx={{ textAlign: 'center', maxWidth: 1050, pb: 2 }}>
          <Tag
            icon={medalIcon}
            sx={{ alignSelf: 'center' }}
            title="Unveiling Opportunity Down Under"
          />
          <Title title="Exclusive Scholarship for Pakistani Master Students in Australia" />
          <Typography mt={2} variant="body1">
            {`Calling all Pakistani scholars! Australian universities are offering a
          unique scholarship opportunity for Master's studies. Dive into
          world-class education, vibrant campuses, and diverse fields of study.
          Don't miss out—apply now and unlock your academic potential in
          Australia."`}
          </Typography>
        </Stack>
      </Container>
      <Carousel />

      <Button variant="contained" sx={styles.loadMoreBtn}>
        Apply Now
      </Button>
    </Box>
  );
};

export default FeaturedScholarshipSection;
const styles = {
  loadMoreBtn: { px: 10, display: 'block', mx: 'auto', mt: 5 }
};
