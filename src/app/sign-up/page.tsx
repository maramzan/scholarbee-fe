'use client';
import React from 'react';
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
  Stack,
  CircularProgress
} from '@mui/material';
import Image from 'next/image';
import AuthSideImage from '@/components/organisms/authSideImage';
import AuthNav from '@/components/molecules/authNav';
import AuthTitleAndSubheading from '@/components/molecules/authTitleAndSubheading';
import AuthFooter from '@/components/molecules/authFooter';
import lockIcon from '/public/assets/svg/lock.svg';
import eyeCloseIcon from '/public/assets/svg/eye-slash.svg';
import eyeIcon from '/public/assets/svg/eye.svg';
import createAccountIllustration from '/public/assets/svg/create-account.svg';
import { styles } from './styles';
import { FormData } from './schema';
import { useSignUpForm } from './useSignUp';
import { Controller } from 'react-hook-form';

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    inputFields,
    showPassword,
    setShowPassword,
    loading
  } = useSignUpForm();

  const renderTextField = (
    id: keyof FormData,
    placeholder: string,
    icon: string,
    type: string = 'text'
  ) => (
    <Controller
      key={id}
      name={id}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          required
          fullWidth
          placeholder={placeholder}
          type={type}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image
                  src={icon}
                  alt={`${placeholder} Icon`}
                  width={20}
                  height={20}
                />
              </InputAdornment>
            ),
            endAdornment: (id === 'password' || id === 'confirmPassword') && (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
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
          error={!!errors[id]}
          helperText={errors[id]?.message}
          value={field.value || ''} // Ensure value is never undefined
        />
      )}
    />
  );

  return (
    <Grid container component="main" sx={styles.gridContainer}>
      <AuthSideImage
        imageHeight={405}
        imageWidth={542}
        sideImage={createAccountIllustration}
        text="Discover a world of academic potential with a single click on ScholarBee."
      />
      <Grid
        item
        xs={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={styles.paper}
      >
        <Box sx={{ flex: 1 }}>
          <AuthNav />
          <Box sx={styles.formContainer}>
            <AuthTitleAndSubheading
              title="Create Account"
              subHeading="Welcome! Please enter your details"
            />
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={2} sx={{ width: '100%' }}>
                {inputFields.map(({ id, placeholder, icon }) =>
                  renderTextField(id as keyof FormData, placeholder, icon)
                )}
                {['password', 'confirmPassword'].map((id) =>
                  renderTextField(
                    id as keyof FormData,
                    id === 'password' ? 'Password' : 'Confirm Password',
                    lockIcon,
                    showPassword ? 'text' : 'password'
                  )
                )}
                <Controller
                  name="agree"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      sx={{ fontSize: { xs: 12, sm: 14 } }}
                      control={<Checkbox {...field} color="primary" />}
                      label="Agree to our Terms and Conditions & Privacy Policy"
                    />
                  )}
                />
                {errors.agree && (
                  <Typography color="error" variant="caption">
                    {errors.agree.message}
                  </Typography>
                )}
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={styles.submitButton}
                disabled={loading} // Disable button during loading
              >
                {loading ? <CircularProgress size={24} /> : 'Sign up'}
              </Button>
              {/* <Stack spacing={2} mt={2}>
                <Typography variant="body2" align="center" mt={3}>
                  Or Sign up with
                </Typography>
                <Button
                  variant="outlined"
                  sx={styles.socialButton}
                  startIcon={
                    <Image
                      src={googleIcon}
                      alt="Google icon"
                      width={33}
                      height={33}
                    />
                  }
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outlined"
                  sx={styles.socialButton}
                  startIcon={
                    <Image
                      src={facebookIcon}
                      alt="Facebook icon"
                      width={33}
                      height={33}
                    />
                  }
                >
                  Continue with Facebook
                </Button>
              </Stack> */}
              <Typography variant="body2" align="center" mt={3}>
                {`Already have an account?   `}
                <Link href="/login">Sign in</Link>
              </Typography>
            </Box>
          </Box>
        </Box>
        <AuthFooter />
      </Grid>
    </Grid>
  );
};

export default SignUp;
