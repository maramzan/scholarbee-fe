'use client';
// import Tag from '@/components/atoms/tag';
import Carousel from '@/components/molecules/heroCarousel';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
// import storyIcon from '/public/assets/svg/story.svg';
import Title from '@/components/atoms/title';
import { SEARCHES } from '@/constants';
import SearchDropdown from './seachDropdown';
import VideoSection from './videoSection';
import SearchButton from './searchButton';
import UniversitySearchDropdown from './universitiesSearchDropdown';

const HeroSection = () => {
  const [filtersForm, setFiltersForm] = useState({
    universityId: '',
    university: '',
    studyLevel: '',
    major: ''
  });

  const handleChange = (name: string, value: string) => {
    setFiltersForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Box pb={2.5}>
      <Box sx={styles.coverImage}>
        <Carousel />
      </Box>
      <Box position="relative">
        <Container sx={styles.container}>
          {/* <Tag icon={storyIcon} title="Your Gateway" /> */}
          <Box sx={styles.titleContainer}>
            <Title
              color="white"
              title="Pakistan's First Platform Connecting Students with Top Universities"
              textAlign="center"
            />
            <Typography
              variant="h6"
              fontWeight="regular"
              color="white"
              textAlign="center"
            >
              Get expert assistance for admission to the best universities and
              scholarships worldwide
            </Typography>
          </Box>
          <Paper sx={styles.searchCard}>
            <Typography variant="h6">Search For Admission Here</Typography>
            <Grid container spacing={2} my={2}>
              <Grid item xs={12} sm={4}>
                <UniversitySearchDropdown
                  onChange={handleChange}
                  title="Select University"
                  name="university"
                />
              </Grid>
              {SEARCHES.map((item) => (
                <Grid key={item.id} item xs={12} sm={4}>
                  <SearchDropdown onChange={handleChange} item={item} />
                </Grid>
              ))}
            </Grid>
            <SearchButton filtersForm={filtersForm} />
          </Paper>
          <VideoSection />
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;

const styles = {
  coverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: { xs: 10, md: 15, lg: 20 }
  },
  titleContainer: {
    maxWidth: 900
  },
  searchCard: {
    p: 3,
    borderRadius: 3,
    boxShadow: '0px 4px 34px 0px rgba(37, 37, 37, 0.05);',
    textAlign: 'center',
    maxWidth: 1150,
    width: '100%',
    mt: 20
  }
};
