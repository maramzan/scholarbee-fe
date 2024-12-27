'use client';
import React, { Suspense } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import AuthSideImage from '@/components/organisms/authSideImage';
import createPasswordIllustration from '/public/assets/svg/create-password.svg';
import AuthNav from '@/components/molecules/authNav';
import AuthTitleAndSubheading from '@/components/molecules/authTitleAndSubheading';
import AuthFooter from '@/components/molecules/authFooter';
import Link from 'next/link';
import Image from 'next/image';
import eyeCloseIcon from '/public/assets/svg/eye-slash.svg';
import eyeIcon from '/public/assets/svg/eye.svg';
import lockIcon from '/public/assets/svg/lock.svg';
import { styles } from './styles';
import { useResetPassword } from './useResetPassword';
import { Controller } from 'react-hook-form';

const ResetPassword: React.FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    showPassword,
    setShowPassword
  } = useResetPassword();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid container component="main" sx={styles.mainGrid}>
        <AuthSideImage
          imageHeight={370}
          imageWidth={450}
          sideImage={createPasswordIllustration}
          text="Discover a world of academic potential with a single click on ScholarBee."
        />
        <Grid item xs={12} md={5} sx={styles.rightGrid}>
          <Box sx={styles.innerBox}>
            <AuthNav />
            <Box sx={styles.formContainer}>
              <AuthTitleAndSubheading
                title="Create Password"
                subHeading="Create new password"
              />
              <Box
                component="form"
                noValidate
                sx={styles.form}
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={2} sx={styles.stack} alignItems="center">
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        placeholder="New Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image
                                src={lockIcon}
                                alt="Password icon"
                                width={20}
                                height={20}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                <Image
                                  src={showPassword ? eyeCloseIcon : eyeIcon}
                                  alt="Show password icon"
                                  width={20}
                                  height={20}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: { borderRadius: '12px' }
                        }}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                      />
                    )}
                  />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Image
                                src={lockIcon}
                                alt="Password icon"
                                width={20}
                                height={20}
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                              >
                                <Image
                                  src={showPassword ? eyeCloseIcon : eyeIcon}
                                  alt="Show password icon"
                                  width={20}
                                  height={20}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                          sx: { borderRadius: '12px' }
                        }}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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
                  {loading ? <CircularProgress size={24} /> : 'Create Password'}
                </Button>
                <Typography variant="body2" align="center" mt={3}>
                  {`Remember Password? `}
                  <Link href="/login">Login</Link>
                </Typography>
              </Box>
            </Box>
          </Box>

          <AuthFooter />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default ResetPassword;
