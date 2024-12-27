import {
  Box,
  // Button,
  Container,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import Navbar from '@/components/organisms/muiNavbar';
import React from 'react';
import CustomizedBreadcrumbs from '@/components/organisms/breadCrumbs';
import HeroSection from '../pageComponents/heroSection';
import ProgramDetailsInfo from '../pageComponents/programDetailsInfo';
import TabbedAccordion from '../pageComponents/tabbedAccordion';
import DetailsAccordion from '../pageComponents/detailsAccordion';
// import Image from 'next/image';
// import dollarIcon from '/public/assets/svg/dollar-circle.svg';
import Footer from '@/components/organisms/footer';
// import scholarshipImage from '/public/assets/png/scholarship.png';
import ApplyForAdmission from '../pageComponents/applyForAdmission';
import { COLORS } from '@/constants/colors';
import { ProgramsApi } from '@/endpoints/programs';
import {
  formatAdmissionDeadline,
  getYearFromTimestamp
} from '@/utils/helperFunctions';
import clockIcon from '/public/assets/svg/timer.svg';
import calendarIcon from '/public/assets/svg/calendar.svg';
import primaryCalendarIcon from '/public/assets/svg/calendar-primary.svg';
// import scholarshipIcon from '/public/assets/svg/scholarship.svg';
import seatsIcon from '/public/assets/svg/people.svg';
import { styles } from './styles';

const ProgramDetails = async ({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { program_id: string };
}) => {
  const { id } = params;
  const { program_id } = searchParams;
  const programApi = new ProgramsApi();

  const programDetails = await programApi.getProgram(id);
  const feeStructure = await programApi.getFeeStructure(program_id);
  const { tuition_fee } = feeStructure?.docs[0] || {};
  const campus = programDetails?.admission?.campus_id;
  const { city, country } = campus?.university_id?.address_id || {};
  const { mode_of_study, degree_level, major, name } = programDetails.program;
  const { available_seats, admission_deadline, admission_startdate } =
    programDetails?.admission ?? {};
  const { admission_requirements } = programDetails || {};

  const about_uni = [
    // {
    //   title: programDetails?.admission?.university_id?.ranking,
    //   subtitle: 'World Wide'
    // },
    {
      title: programDetails?.admission?.university_id?.ranking,
      subtitle: 'HEC Rankinge'
    },
    {
      title: programDetails?.admission?.campus_id?.name,
      subtitle: 'Campus'
    },
    {
      title: getYearFromTimestamp(
        programDetails?.admission?.university_id?.founded
      ),
      subtitle: 'Founded In'
    }
  ];

  const program = programDetails?.program;

  const deadline = formatAdmissionDeadline(admission_deadline);
  const startDate = formatAdmissionDeadline(admission_startdate);

  const currentDate = new Date();
  const deadlineDate = new Date(admission_deadline);
  const startDateDate = new Date(admission_startdate);

  const isDeadlineIncoming = deadlineDate > currentDate;
  const isStartDateIncoming = startDateDate > currentDate;

  const infoItems = [
    {
      icon: clockIcon,
      title: program?.credit_hours,
      subtitle: 'Credit hours'
    },
    {
      icon: clockIcon,
      title: program?.duration || '48 Months',
      subtitle: 'Program duration'
    },
    {
      icon: isStartDateIncoming ? primaryCalendarIcon : calendarIcon,
      title: startDate.formattedDate,
      subtitle: 'Starting date'
    },
    {
      icon: isDeadlineIncoming ? primaryCalendarIcon : calendarIcon,
      title: deadline.formattedDate,
      subtitle: 'Deadline'
    },
    { icon: seatsIcon, title: available_seats, subtitle: 'Available Seats' }
  ];

  const PROGRAM_INFO = [
    { title: degree_level, subtitle: 'Study Level' },
    { title: mode_of_study, subtitle: 'Study Mode' },
    // { title: 'MSc', subtitle: 'Degree' },
    { title: major, subtitle: 'Main Subject' }
  ];

  const logo = programDetails?.admission?.university_id?.logo_url;
  const universityTitle = programDetails?.admission?.university_id?.name;

  const FEE_DATA = [
    {
      id: 1,
      label: 'Per Semester',
      amount: `PKR ${tuition_fee}`,
      description:
        'The semester fee is a recurring charge paid by students at the beginning of each academic semester or term.  each academic semester or term'
    },
    {
      id: 2,
      label: 'Admission Fee',
      amount: `PKR ${programDetails?.admission_fee}`,
      description:
        "This fee is paid by students upon acceptance of their admission offer to the university or college. It covers administrative costs associated with processing the admission application and enrolling the student in the institution's system."
    }
    // {
    //   id: 3,
    //   label: 'Tuition Fee',
    //   amount: `PKR ${tuition_fee}`,
    //   description:
    //     'The tuition fee is charged based on the number of credit hours or courses a student enrolls in for a particular semester or academic term.'
    // }
  ];

  return (
    <Box bgcolor={COLORS.bgColor}>
      <Navbar />
      <Box bgcolor="white">
        <Container sx={{ py: 2 }}>
          <CustomizedBreadcrumbs
            items={[
              { title: 'Programs', link: '/programs' },
              { title: universityTitle }
            ]}
          />
        </Container>
        <HeroSection
          uni_logo={
            logo?.startsWith('https') ? logo : `/assets/png/partner1.png`
          }
          campusImage={campus?.logo_url}
          title={universityTitle}
          address={`${city}, ${country}`}
        />
      </Box>
      <Container sx={{ mb: { xs: 5, md: 10 } }}>
        {/* <Box display="flex" justifyContent={'center'} width={'100%'}>
          <Button
            sx={{ mt: 2, display: { xs: 'block', sm: 'nome' } }}
            variant="contained"
            disabled={false}
            onClick={
            () => {}
            handleProtectedAction(handleApplyForAdmission, '/create-profile')
            }
          >
            {isLoadingUser ? (
            <LinearProgress sx={{ width: '180px' }} />
          ) : (
            Apply For Admission
            )}
          </Button>
        </Box> */}

        <ProgramDetailsInfo {...{ infoItems }} />
        <Grid mt={2} container>
          <Grid xs={12} item>
            <Box sx={styles.mainContainer}>
              <ApplyForAdmission
                c_id={programDetails?.admission?.campus_id.id}
                programId={programDetails?.program?.id}
                admissionId={programDetails?.admission?.id}
              />
              <Box sx={styles.container}>
                {about_uni.map((item, index) => (
                  <React.Fragment key={index}>
                    <Box sx={styles.infoBox}>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">{item.subtitle}</Typography>
                    </Box>
                    {index < about_uni.length - 1 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          margin: { xs: 0.5, lg: 1 },
                          display: {
                            xs: 'none',
                            md: 'block'
                          }
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Box>
              <Box>
                <Typography mt={2} mb={1} variant="h5" fontWeight="600">
                  Program Overview
                </Typography>
                <DetailsAccordion
                  summary={
                    <Typography variant="body1" fontSize={18}>
                      {name ||
                        `Masters of Arts and Bachelor of Computer and Information Sciences Conjoint`}
                    </Typography>
                  }
                  details={
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly'
                      }}
                    >
                      {PROGRAM_INFO.map((item, index) => (
                        <React.Fragment key={index}>
                          <Box sx={styles.infoBox}>
                            <Typography variant="h6" fontWeight="bold">
                              {item.title}
                            </Typography>
                            <Typography variant="body2">
                              {item.subtitle}
                            </Typography>
                          </Box>
                          {index < PROGRAM_INFO.length - 1 && (
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                margin: { xs: 0.5, lg: 1 },
                                display: {
                                  xs: 'none',
                                  md: 'block'
                                }
                              }}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </Box>
                  }
                />
              </Box>
              {/* <Box>
                <Typography mt={2} variant="h5" mb={1} fontWeight="600">
                  Program Details
                </Typography>
                <TabbedAccordion />
              </Box> */}
              <Box>
                <Typography mt={2} variant="h5" mb={1} fontWeight="600">
                  Admission Requirements
                </Typography>
                <TabbedAccordion
                  isRichText={
                    !(typeof admission_requirements[0]?.value === 'string')
                  }
                  tabsData={admission_requirements}
                />
              </Box>
              <Box>
                <Typography mt={2} variant="h5" mb={1} fontWeight="600">
                  Fee Structure
                </Typography>
                <DetailsAccordion
                  FEE_DATA={FEE_DATA}
                  summary={
                    <Box sx={styles.summaryContent}>
                      {/* <Image
                        src={dollarIcon}
                        alt="dollar icon"
                        width={24}
                        height={24}
                      /> */}
                      <Typography
                        color={COLORS.greenPrimary}
                        fontWeight={600}
                        variant="h6"
                      >
                        {`PKR ${tuition_fee}`}
                      </Typography>
                      <Typography variant="body1" fontSize={14}>
                        {FEE_DATA[0].label}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
              {/* <Box>
                <Typography mt={2} variant="h5" mb={1} fontWeight="600">
                  Scholarships
                </Typography>
                <DetailsAccordion
                  summary={
                    <Typography variant="body1" fontSize={18}>
                      {` One of the important factors when considering a master's
                      degree is the cost of study.`}
                    </Typography>
                  }
                  extendedSummary={
                    <Typography variant="body1" fontSize={18}>
                      {`Luckily, there are many options available to help students fund their master's program. Click the “Apply For Scholarship Button” and it will take you the scholarships page to choose one if you are eligible for.`}
                    </Typography>
                  }
                  details={
                    <Grid
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', md: 'row' }
                      }}
                      container
                    >
                      <Grid sx={{ mt: { xs: 2, md: 0 } }} xs={12} md={7} item>
                        <Typography mb={1} color="primary">
                          Global Citizenship Scholarship
                        </Typography>
                        <Typography mb={2} variant="h5" fontWeight={600}>
                          Promoting Cultural Exchange and Understanding
                        </Typography>
                        <Typography mb={1}>
                          1. Fosters cross-cultural understanding and empathy.
                        </Typography>
                        <Typography mb={1}>
                          2. Supports initiatives promoting global cooperation.
                        </Typography>
                        <Typography mb={1}>
                          3. Recognizes students advocating for cultural
                          exchange.
                        </Typography>
                        <Typography mb={1}>
                          4. Cultivates future leaders for a more inclusive
                          world.
                        </Typography>

                        <Button
                          sx={{
                            mt: 2,
                            display: 'block',
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '260px' }
                          }}
                          variant="contained"
                        >
                          Apply For Scholarship
                        </Button>
                      </Grid>
                      <Grid
                        xs={12}
                        md={5}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                        item
                      >
                        <Image
                          height={360}
                          width={360}
                          style={{
                            maxWidth: '360px',
                            width: '100%',
                            height: 'auto',
                            borderRadius: '16px'
                          }}
                          src={scholarshipImage}
                          alt="scholarship image"
                        />
                      </Grid>
                    </Grid>
                  }
                />
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProgramDetails;
