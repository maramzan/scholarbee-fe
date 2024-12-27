import Tag from '@/components/atoms/tag';
import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import likeIcon from '/public/assets/svg/like.svg';
import Title from '@/components/atoms/title';
import ProgramCard from './programCard';
import { ProgramsApi } from '@/endpoints/programs';
import { UniversityAdmission } from '@/types/program';
import Link from 'next/link';

const ProgramSection = async () => {
  const programApi = new ProgramsApi();
  const programs = await programApi.getAllPrograms(5);

  return (
    <Box>
      <Container sx={styles.container}>
        <Tag bgWhite icon={likeIcon} title="We Offer" />
        <Title title={'Programs'} />
        <Box gap="12px" mt={7.5}>
          {programs.docs.map((program: UniversityAdmission) => {
            return (
              <Box mt={3} key={program._id}>
                <ProgramCard program={program} />
              </Box>
            );
          })}
        </Box>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white'
          }}
          href={`/programs`}
        >
          {programs.docs.length === 0 ? (
            <Box mt={3}>
              <Typography color="black" variant="h6">
                No Program Found
              </Typography>
            </Box>
          ) : (
            <Button variant="contained" sx={styles.loadMoreBtn}>
              Load More
            </Button>
          )}
        </Link>
      </Container>
    </Box>
  );
};

export default ProgramSection;

const styles = {
  container: {
    py: 7,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loadMoreBtn: { mt: 3, px: 10 }
};
