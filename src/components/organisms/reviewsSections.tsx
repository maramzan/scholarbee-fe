import Tag from '@/components/atoms/tag';
import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import userIcon from '/public/assets/svg/user.svg';
import Title from '@/components/atoms/title';

import { reviewCards } from '@/constants';
import ReviewCard from '../molecules/reviewCard';

const ReviewsSections = () => {
  return (
    <Box sx={styles.root}>
      <Container sx={styles.container}>
        <Tag icon={userIcon} title="What our users have to say about it?" />
        <Title title="Reviews" />
        <Grid mt={5} container>
          {reviewCards.map((card) => (
            <Grid key={card.key} item xs={12} md={4}>
              <ReviewCard highlighted={card.highlighted} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
export default ReviewsSections;

const styles = {
  root: { bgcolor: 'white' },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: {
      xs: 3,
      md: 8
    }
  }
};
