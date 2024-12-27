'use client';
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import AuthSideImage from '@/components/organisms/authSideImage';
import loginIllustration from '/public/assets/svg/login-Ilustration.svg';
import AuthNav from '@/components/molecules/authNav';
import AuthFooter from '@/components/molecules/authFooter';
import AuthTitleAndSubheading from '@/components/molecules/authTitleAndSubheading';
import { AuthApi } from '@/endpoints/auth';
import { toast } from 'react-toastify';
import { styles } from './styles';
import { useRouter } from 'next/navigation';

const authApi = new AuthApi();

const Verification = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyEmail = async () => {
    setLoading(true);
    try {
      console.log('id', id);
      const response = await authApi.verifyEmail(id);
      console.log('response on verify email Page', response);
      if (response.success) {
        toast.success(response.data.message || 'Email verified successfully');
        router.push('/login');
      } else {
        toast.error(response.data.error || 'Failed to verify email');
      }
    } catch (error) {
      console.log('error white varification', error);
      toast.error('An error occurred while verifying the email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={styles.mainContainer}>
      <AuthSideImage
        sideImage={loginIllustration}
        text="Discover a world of academic potential with a single click on ScholarBee."
      />
      <Grid item xs={12} md={5} sx={styles.rightGrid}>
        <Box sx={styles.innerContainer}>
          <AuthNav />
          <Box sx={styles.formContainer}>
            <AuthTitleAndSubheading
              title="Verify Email"
              subHeading="Click the button to verify your email"
            />
            <Box component="form" noValidate sx={styles.form}>
              <Button
                fullWidth
                variant="contained"
                sx={styles.verifyButton}
                onClick={verifyEmail}
                disabled={loading}
              >
                Verify Email
              </Button>
            </Box>
          </Box>
        </Box>

        <AuthFooter />
      </Grid>
    </Grid>
  );
};

export default Verification;
