import Tag from '@/components/atoms/tag';
import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import wifiIcon from '/public/assets/svg/wifi.svg';
import { CustomTypography } from '@/components/atoms/customTypography';
import Categories from './categories';
import BlogCard from '@/components/molecules/blogCard';
import PaginationButtons from './paginationButtons';

const Blogs = () => {
  return (
    <Box>
      <Container>
        <Tag title="Our Blogs" icon={wifiIcon} />
        <CustomTypography
          variant="h3"
          fontWeight={700}
          fontSize={32}
          smallFont={24}
          smallWeight={600}
          sx={{ mt: 2 }}
        >
          Recent News
        </CustomTypography>
        <Categories />

        <Grid container mt={5} spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid
              key={item}
              sx={{ margin: '0 auto' }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <BlogCard />
            </Grid>
          ))}
        </Grid>
        <PaginationButtons />
      </Container>
    </Box>
  );
};

export default Blogs;
