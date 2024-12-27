'use client';
import React, { Suspense } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Link,
  CircularProgress
} from '@mui/material';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import circleBg from '/public/assets/svg/circles-bg.svg';
import lockIcon from '/public/assets/svg/lock.svg';
import mailIcon from '/public/assets/svg/login-mail.svg';
import loginIllustration from '/public/assets/svg/login-Ilustration.svg';
import eyeCloseIcon from '/public/assets/svg/eye-slash.svg';
import eyeIcon from '/public/assets/svg/eye.svg';
// import AuthNav from '@/components/molecules/authNav';
import AuthTitleAndSubheading from '@/components/molecules/authTitleAndSubheading';
import AuthFooter from '@/components/molecules/authFooter';
import { styles } from './styles';
import { useLogin } from './useLogin';
import { useSearchParams } from 'next/navigation';
import logo from '/public/assets/svg/logo.svg';

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams();
  const { loading, errors, control, handleSubmit } = useLogin(searchParams);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid container component="main" sx={styles.mainContainer}>
        <Grid item xs={false} sm={12} md={7} sx={styles.leftGrid}>
          <Image
            src={circleBg}
            alt="circle bg image"
            style={{ ...styles.circleBgImage, position: 'absolute' }}
          />
          <Box sx={styles.illustrationBox}>
            <Image
              src={loginIllustration}
              alt="Illustration"
              width={325}
              height={371}
              style={styles.illustrationImage}
            />
            <Typography variant="h5" color="white" mt={2}>
              Discover a world of academic potential with a single click on
              ScholarBee.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={styles.rightGrid}
        >
          <Box sx={{ flex: 1 }}>
            {/* <AuthNav /> */}
            <Box sx={styles.formContainer}>
              <Box my={2} display="flex" justifyContent="center">
                <Link
                  href="/"
                  style={{ textDecoration: 'none' }}
                  data-test-id="auth-nav-link"
                >
                  <Box sx={{ px: { xs: 2, sm: 5 }, py: 2 }}>
                    <Image src={logo} height={44} width={235} alt="logo" />
                  </Box>
                </Link>
              </Box>
              <AuthTitleAndSubheading
                title="Sign in to your account"
                subHeading="Welcome back! Please enter your details"
              />
              <Box
                component="form"
                noValidate
                sx={styles.form}
                onSubmit={handleSubmit}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      placeholder="email"
                      autoComplete="email"
                      autoFocus
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Image
                              src={mailIcon}
                              alt="Email icon"
                              width={20}
                              height={20}
                            />
                          </InputAdornment>
                        ),
                        sx: styles.textField
                      }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      placeholder="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
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
                        sx: styles.textField
                      }}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Link href="forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={styles.submitButton}
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
                <Typography variant="body2" align="center" mt={3}>
                  {`Don't have an account yet?   `}
                  <Link href="sign-up">Create New Account</Link>
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

const LoginIn: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginIn;
