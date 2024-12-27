'use client';
import React, { Suspense } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton,
  CircularProgress
} from '@mui/material';
import CustomizedBreadcrumbs from '@/components/organisms/breadCrumbs';
import Title from '@/components/atoms/title';
import ProgramCard from '../(pageComponents)/programCard';
import Footer from '@/components/organisms/footer';
import { CustomTypography } from '@/components/atoms/customTypography';
import Navbar from '@/components/organisms/muiNavbar';
import { COLORS } from '@/constants/colors';
import ProgramCardSkeleton from '@/components/organisms/programCardSkelton';
import { UniversityAdmission } from '@/types/program';
import { usePrograms } from './usePrograms';
import FilterSection from './(pageComponents)/filters';

const MemoizedProgramCard = React.memo(ProgramCard);

const ProgramsLoading = () => (
  <Box bgcolor={COLORS.bgColor}>
    <Box bgcolor="white">
      <Container>
        <Skeleton variant="text" width="60%" height={40} />
        <Box mt={5} pb={3}>
          <Skeleton variant="text" width="80%" height={60} />
          <Skeleton variant="text" width="70%" height={40} />
        </Box>
      </Container>
    </Box>
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ borderRadius: 2, backgroundColor: 'white', padding: 2 }}>
            <Skeleton variant="text" width="100%" height={60} />
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProgramCardSkeleton key={`loading-skeleton-${index}`} />
          ))}
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const ProgramsContent = () => {
  const {
    showFilters,
    formData,
    allPrograms,
    isLoading,
    isFetching,
    programs,
    handleChange,
    handleFilters,
    handleLoadMore,
    totalDocs,
    handleSearchChange,
    handleUniversityChange
  } = usePrograms();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const memoizedPrograms = React.useMemo(
    () =>
      allPrograms.map((program: UniversityAdmission) => (
        <Box key={program?._id} mb={3}>
          <MemoizedProgramCard admission program={program} />
        </Box>
      )),
    [allPrograms]
  );

  return (
    <Box bgcolor={COLORS.bgColor}>
      <Navbar />
      <Box bgcolor="white">
        <Container>
          <CustomizedBreadcrumbs />
          <Box mt={5} pb={3}>
            <Title title="Find The Best Education For Yourself" />
            <Typography variant="body2" fontSize={20}>
              Discover a world of academic potential with Scholarbee. From
              diverse programs to extensive scholarship offerings, our platform
              empowers learners worldwide.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ my: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ borderRadius: 2, backgroundColor: 'white', padding: 2 }}>
              {!isLoading ? (
                <>
                  <CustomTypography
                    fontSize={24}
                    smallFont={18}
                    color="primary"
                    fontWeight="bold"
                    variant="h5"
                  >
                    {`${totalDocs} admissions`}
                  </CustomTypography>
                  <Typography fontSize={14} variant="body1">
                    Match your filter & search settings
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton variant="text" width={200} height={40} />
                  <Skeleton variant="text" width={150} height={20} />
                </>
              )}
              <FilterSection
                formData={formData}
                handleChange={handleChange}
                handleUniversityChange={handleUniversityChange}
                handleSearchChange={handleSearchChange}
                handleFilters={handleFilters}
                showFilters={showFilters}
                isFetching={isFetching}
                isSmallScreen={isSmallScreen}
              />
              {/* <Box>
                <CustomTypography
                  fontSize={24}
                  smallFont={18}
                  color="primary"
                  fontWeight="bold"
                  variant="h5"
                >
                  Easy Apply
                </CustomTypography>
                <Typography fontSize={12} variant="body1">
                  Create profile for easy apply to any scholarship around the
                  world.
                </Typography>
                <Button
                  sx={{ maxWidth: '100%', width: '100%', mt: 5 }}
                  variant="contained"
                >
                  Create Profile
                </Button>
              </Box> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <Box
              sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              {isLoading && !allPrograms.length ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <ProgramCardSkeleton key={`skeleton-${index}`} />
                ))
              ) : (
                <>
                  {totalDocs ? (
                    memoizedPrograms
                  ) : (
                    <Typography
                      my={5}
                      color="text.secondary"
                      fontSize={24}
                      textAlign="center"
                    >
                      No Program Found
                    </Typography>
                  )}
                  {programs?.pagination?.hasNextPage && (
                    <Button
                      sx={{ px: 12, alignSelf: 'center' }}
                      variant="contained"
                      onClick={handleLoadMore}
                      disabled={isLoading}
                    >
                      {isLoading || isFetching ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        'Load More'
                      )}
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

// Main Programs component with Suspense
const Programs: React.FC = () => {
  return (
    <Suspense fallback={<ProgramsLoading />}>
      <ProgramsContent />
    </Suspense>
  );
};

const MemoizedPrograms = React.memo(Programs);
MemoizedPrograms.displayName = 'MemoizedPrograms';

export default MemoizedPrograms;
