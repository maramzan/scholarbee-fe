import { UniversityAdmission } from '@/types/program';
import { formatAdmissionDeadline, formatMoney } from '@/utils/helperFunctions';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const ProgramCard = ({
  program,
  admission
}: {
  program: UniversityAdmission;
  admission?: boolean;
}) => {
  const { formattedDate, hasPassed } = formatAdmissionDeadline(
    program?.admission?.admission_deadline
  );

  const { city, country } = program?.admission?.campus?.address || {};

  const logo = program?.admission?.university?.logo_url;
  const campusImage = program?.admission?.campus?.logo_url;

  return (
    <Box sx={styles.card}>
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: {
              xs: 'block',
              sm: admission ? 'none' : 'block',
              md: 'block'
            }
          }}
          item
          xs={12}
          sm={5}
          md={4}
        >
          <Image
            src={campusImage ?? '/assets/png/program1.png'}
            alt="programImage"
            width={admission ? 224 : 364}
            height={admission ? 209 : 251}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '12px'
            }}
          />
        </Grid>
        <Grid item xs={12} sm={admission ? 12 : 7} md={8}>
          <Box sx={styles.cardInfo}>
            <Box sx={styles.cardDetails}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: { xs: 'column', lg: 'row', gap: 1 }
                  }}
                >
                  {admission && (
                    <Box
                      sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}
                    >
                      <Image
                        src="/assets/png/university.png"
                        alt="programImage"
                        width={500}
                        height={116}
                        style={{
                          alignSelf: 'center',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px'
                        }}
                      />
                    </Box>
                  )}
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
                    <Typography variant="h5" fontWeight="600">
                      {program?.program?.name || 'Dummy Program Name'}
                    </Typography>
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'white'
                      }}
                      href={`/program-details/${program._id}?program_id=${program?.program?._id}`}
                    >
                      <Button
                        sx={{
                          mt: { xs: 1, sm: 0 },
                          maxWidth: '200px',
                          width: { xs: '100%', sm: 'auto' },
                          alignSelf: { xs: 'flex-start', sm: 'center' },
                          display: { xs: 'none', sm: 'block' },
                          whiteSpace: 'nowrap'
                        }}
                        variant="contained"
                      >
                        View Program
                      </Button>
                    </Link>
                  </Box>
                </Box>
                <Box sx={styles.infoRow}>
                  <Image
                    src={logo}
                    alt={`university logo here`}
                    width={90}
                    height={60}
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                  {/* <Box sx={styles.rating}>
                    <Image
                      src={`/assets/svg/star.svg`}
                      alt={`star`}
                      width={24}
                      height={24}
                    />
                    <Typography variant="body1" fontWeight="500">
                      {ranking}
                    </Typography>
                  </Box> */}
                </Box>
                <Box sx={styles.infoRow}>
                  <Image
                    src={`/assets/svg/location.svg`}
                    alt={`location`}
                    width={24}
                    height={24}
                  />
                  <Typography variant="body1">
                    {`${city}, ${country}` || 'New York City, USA'}
                  </Typography>
                </Box>
                {/* {program?.program?.scholarship_options && (
                  <Box sx={styles.infoRow}>
                    <Image
                      src={`/assets/svg/heart.svg`}
                      alt={`heart`}
                      width={24}
                      height={24}
                    />
                    <Typography
                      fontWeight="500"
                      variant="body1"
                      color="primary"
                    >
                      Scholarships Available
                    </Typography>
                  </Box>
                )} */}
              </Box>
              <Box gap={1} sx={styles.programDetails}>
                <Box sx={styles.detailRow}>
                  <Image
                    src={`/assets/svg/${hasPassed ? 'calendar' : 'calendar-primary'}.svg`}
                    alt={`calender`}
                    width={24}
                    height={24}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={styles.statsText}
                      color={hasPassed ? 'error' : 'primary.main'}
                    >
                      Deadline
                    </Typography>
                    <Typography
                      textAlign="center"
                      variant="body1"
                      fontWeight="600"
                      sx={styles.statsText}
                      color={hasPassed ? 'error' : 'primary.main'}
                    >
                      {formattedDate}
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={styles.divider} />
                <Box sx={styles.detailRow}>
                  <Image
                    src={`/assets/svg/fee-icon.svg`}
                    alt={`free icon`}
                    width={24}
                    height={24}
                  />
                  {/* <Typography fontWeight={'600'}>PKR</Typography> */}
                  <Box>
                    <Typography sx={styles.statsText} variant="body2">
                      Fee (Semester)
                    </Typography>
                    <Typography
                      sx={styles.statsText}
                      variant="body1"
                      fontWeight="600"
                    >
                      {formatMoney(
                        Number(program?.fee_structures[0]?.tuition_fee)
                      ) || 'N/A'}
                      {/* {program?.fee_structures[0]?.tuition_fee || 'N/A'} */}
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={styles.divider} />
                <Box sx={styles.detailRow}>
                  <Image
                    src={`/assets/svg/teacher.svg`}
                    alt={`calender`}
                    width={24}
                    height={24}
                  />
                  <Box>
                    <Typography sx={styles.statsText} variant="body2">
                      Study Mode
                    </Typography>
                    <Typography
                      sx={styles.statsText}
                      variant="body1"
                      fontWeight="600"
                    >
                      {program?.program?.mode_of_study || 'On Site'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Link
        style={{
          textDecoration: 'none',
          color: 'white'
        }}
        href={`/program-details/${program._id}?program_id=${program?.program?._id}`}
      >
        <Button sx={styles.viewProgramButton} variant="contained">
          View Program
        </Button>
      </Link>
    </Box>
  );
};
export default ProgramCard;

const styles = {
  card: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    borderRadius: 2,
    backgroundColor: 'white',
    padding: 2
  },
  cardContent: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    gap: 3,
    mt: 2
  },
  programImage: {
    alignSelf: 'center',
    width: 'auto',
    height: 'auto'
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
    mt: 1
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
  },
  viewProgramButton: {
    maxWidth: {
      xs: '100%',
      md: '200px'
    },
    mt: {
      xs: 2,
      lg: 0
    },
    width: '100%',
    height: '56px',
    display: { xs: 'block', sm: 'none' }
  },
  statsText: { fontSize: { xs: 12, sm: 14 } }
};
