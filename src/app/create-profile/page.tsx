'use client';
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/organisms/muiNavbar';
import { Box, Container, Typography } from '@mui/material';
import CustomizedBreadcrumbs from '@/components/organisms/breadCrumbs';
import { COLORS } from '@/constants/colors';
import Footer from '@/components/organisms/footer';
import CustomizedProgressBars from '@/components/atoms/progressbar';
import PersonalInfo from './(pageComponents)/personalInfo';
import ContactInfo from './(pageComponents)/contactInfo';
import EducationInfo from './(pageComponents)/educationalInfo';
import NationalIDCard from './(pageComponents)/idCardInfo';
import ChooseProgram from './(pageComponents)/chooseProgram';
// import FeeInvoice from './(pageComponents)/feeInvoice';
// import FinalSubmission from './(pageComponents)/finalSubmission';
import TermsAndConditions from './(pageComponents)/termsAndConditions';
// import AllSetSection from './(pageComponents)/allSetSection';

const steps = [
  'Personal Information',
  'Contact Information',
  'Educational Background',
  'National ID Card',
  'Choose Program',
  'All Set Section',
  'Fee Invoice',
  'Final Submission',
  'Terms and Conditions'
];

const LoadingStep = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography>Loading step...</Typography>
  </Box>
);

const FormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get('step')) || 0;

  React.useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length || isNaN(currentStep)) {
      router.replace('/create-profile?step=0');
    }
  }, [currentStep, router]);

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    router.replace(`/create-profile?step=${nextStep}`);
  };

  const handlePrev = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    router.replace(`/create-profile?step=${prevStep}`);
  };

  // const getToSection = (step: number) => {
  //   router.replace(`/create-profile?step=${step}`);
  // };

  const getProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  return (
    <>
      <CustomizedBreadcrumbs />
      <Typography textAlign="right">{`${Math.round(getProgress())}%`}</Typography>
      <CustomizedProgressBars value={getProgress()} />

      <Suspense fallback={<LoadingStep />}>
        {currentStep === 0 && <PersonalInfo onNext={handleNext} />}
        {currentStep === 1 && (
          <ContactInfo onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 2 && (
          <EducationInfo onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 3 && (
          <NationalIDCard onNext={handleNext} onPrev={handlePrev} />
        )}
        {currentStep === 4 && (
          <ChooseProgram onNext={handleNext} onPrev={handlePrev} />
        )}
        {/* {currentStep === 4 && (
          <AllSetSection
            getToSection={getToSection}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )} */}
        {/* {currentStep === 5 && (
          <FeeInvoice onNext={handleNext} onPrev={handlePrev} />
        )} */}
        {/* {currentStep === 5 && (
          <FinalSubmission onNext={handleNext} onPrev={handlePrev} />
        )} */}
        {currentStep === 5 && <TermsAndConditions onPrev={handlePrev} />}
      </Suspense>
    </>
  );
};

const CreateProfile = () => {
  return (
    <Box sx={{ bgcolor: COLORS.bgColor }}>
      <Navbar />
      <Box sx={{ px: 2 }}>
        <Container sx={styles.container}>
          <Suspense fallback={<LoadingStep />}>
            <FormContent />
          </Suspense>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    p: 2,
    my: 4,
    borderRadius: 2
  }
};

export default CreateProfile;
