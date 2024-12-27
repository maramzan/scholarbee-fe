import React from 'react';
import { Box, Grid, Skeleton, Divider } from '@mui/material';

const ProgramCardSkeleton = () => {
  return (
    <Box sx={styles.card} mb={3}>
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: {
              xs: 'block',
              sm: 'block',
              md: 'block'
            }
          }}
          item
          xs={12}
          sm={5}
          md={4}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={209}
            sx={{ borderRadius: '12px' }}
          />
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <Box sx={styles.cardInfo}>
            <Box sx={styles.cardDetails}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: { xs: 'flex-start', md: 'space-between' },
                    width: '100%',
                    gap: 1,
                    mt: 2
                  }}
                >
                  <Skeleton variant="text" width="60%" height={40} />
                </Box>
                <Box sx={styles.infoRow}>
                  <Skeleton variant="rectangular" width={90} height={25} />
                  <Box sx={styles.rating}>
                    <Skeleton variant="circular" width={24} height={24} />
                    <Skeleton variant="text" width={40} height={24} />
                  </Box>
                </Box>
                <Box sx={styles.infoRow}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width="40%" height={24} />
                </Box>
                <Box sx={styles.infoRow}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="text" width="60%" height={24} />
                </Box>
              </Box>
              <Box gap={1} sx={styles.programDetails}>
                <Box sx={styles.detailRow}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Box>
                    <Skeleton variant="text" width={60} height={20} />
                    <Skeleton variant="text" width={80} height={24} />
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={styles.divider} />
                <Box sx={styles.detailRow}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Box>
                    <Skeleton variant="text" width={60} height={20} />
                    <Skeleton variant="text" width={80} height={24} />
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={styles.divider} />
                <Box sx={styles.detailRow}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Box>
                    <Skeleton variant="text" width={60} height={20} />
                    <Skeleton variant="text" width={80} height={24} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgramCardSkeleton;

const styles = {
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    borderRadius: 2,
    backgroundColor: 'white',
    padding: 2
  },
  cardInfo: {
    display: 'flex'
  },
  cardDetails: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    mt: 2
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1
  },
  programDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    }
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    mt: 1
  },
  divider: {
    margin: { xs: 0.5, lg: 1 },
    display: {
      xs: 'none',
      md: 'block'
    }
  }
};
