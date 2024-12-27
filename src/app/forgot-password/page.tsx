'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Link,
  Stack,
  CircularProgress
} from '@mui/material';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import AuthSideImage from '@/components/organisms/authSideImage';
import resetPasswordIllustration from '/public/assets/svg/reset-password.svg';
import AuthNav from '@/components/molecules/authNav';
import AuthTitleAndSubheading from '@/components/molecules/authTitleAndSubheading';
import AuthFooter from '@/components/molecules/authFooter';
import mailIcon from '/public/assets/svg/login-mail.svg';
import { AuthApi } from '@/endpoints/auth';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required')
});

type FormData = z.infer<typeof schema>;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const authApi = new AuthApi();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await authApi.forgotPassword(data);
      console.log('response in forgot password', response);
      if (response.success) {
        toast.success('Password reset link sent to your email');
        router.push('/confirm-email');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log('error white forgot password', error);
      toast.error('Something went wrong, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={styles.mainGrid}>
      <AuthSideImage
        imageHeight={406}
        imageWidth={436}
        sideImage={resetPasswordIllustration}
        text="Discover a world of academic potential with a single click on ScholarBee."
      />
      <Grid item xs={12} md={5} sx={styles.rightGrid}>
        <Box sx={styles.innerBox}>
          <AuthNav />
          <Box sx={styles.formContainer}>
            <AuthTitleAndSubheading
              title="Reset Password"
              subHeading="Type your registered email to reset your password"
            />
            <Box
              component="form"
              noValidate
              sx={styles.form}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      id="email"
                      placeholder="Email"
                      name="email"
                      InputProps={{
                        sx: styles.textField,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image
                              src={mailIcon}
                              alt="Email Icon"
                              width={20}
                              height={20}
                            />
                          </InputAdornment>
                        )
                      }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={styles.submitButton}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Reset Password'}
              </Button>
              <Typography variant="body2" align="center" mt={3}>
                {`Remember Password? `}
                <Link underline="none" href="/login">
                  Login Now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <AuthFooter />
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;

const styles = {
  mainGrid: {
    height: '100vh'
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 'auto', md: '100vh' },
    overflowY: { xs: 'unset', md: 'auto' },
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
      borderRadius: '8px'
    }
  },
  innerBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    px: 2
  },
  formContainer: {
    my: 7,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '404px',
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  form: {
    mt: 4
  },
  textField: {
    borderRadius: '12px'
  },
  submitButton: {
    borderRadius: '12px',
    maxWidth: '100%',
    mt: 3,
    mb: 2
  }
};
