'use client';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Paper
} from '@mui/material';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useSubscribeMutation } from '@/redux/api/contactApi';
import contactIcon from '/public/assets/svg/call.svg';
import emailIcon from '/public/assets/svg/mail.svg';
import locationIcon from '/public/assets/svg/location-outlined.svg';
import worldMap from '/public/assets/svg/map.svg';
import Tag from '@/components/atoms/tag';

const contactSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().min(1, 'Message is required')
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await subscribe({
        type: 'general',
        user_type: 'Student',
        ...data
      }).unwrap();

      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      console.log('error', error);
      const errorMessage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.data?.errors?.[0]?.message ||
        'Failed to send message. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <Box sx={{ position: 'relative', bgcolor: '#F4F7FF', py: 8 }}>
      <Container>
        <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={6}>
            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                alignItems: { sx: 'center', md: 'flex-start' },
                maxWidth: { xs: '100%', md: 500 }
              }}
            >
              <Tag
                sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}
                icon={contactIcon}
                title="Contact Us"
                bgWhite
              />
              <Typography
                variant="h2"
                fontWeight="bold"
                color="primary"
                sx={{ textAlign: { xs: 'center', sm: 'start' } }}
              >
                Let&apos;s talk! <br /> Love to hear from you.
              </Typography>

              <Grid container>
                <Grid
                  display="flex"
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    mt: { xs: 2, sm: 0 }
                  }}
                  item
                  xs={12}
                  sm={6}
                >
                  <Box>
                    <Image
                      src={locationIcon}
                      alt="Location"
                      width={30}
                      height={30}
                    />
                  </Box>
                  <Box ml={1}>
                    <Typography variant="h6" fontSize={18} fontWeight="600">
                      Our Location
                    </Typography>
                    <Typography mt={1} variant="body2" color="textSecondary">
                      Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba,
                      Dubai, U.A.E
                    </Typography>
                    <Typography mt={1} variant="body2" color="textSecondary">
                      NITB Building, Plot, National Incubation Center, 24-B
                      Street 6, Sector H-9/1 H 9/1 H-9, Islamabad, Islamabad
                      Capital Territory 44000
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  display="flex"
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    mt: { xs: 2, sm: 0 }
                  }}
                  item
                  xs={12}
                  sm={6}
                >
                  <Box>
                    <Image src={emailIcon} alt="Email" width={30} height={30} />
                  </Box>
                  <Box ml={1}>
                    <Typography variant="h6" fontSize={18} fontWeight="600">
                      How can we help you?
                    </Typography>
                    <Typography mt={1} variant="body2" color="textSecondary">
                      info@scholarbee.pk
                    </Typography>
                    <Typography mt={1} variant="body2" color="textSecondary">
                      +92 303 5686116
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.10)',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Send us a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="filled"
                        label="Full Name*"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={classes.noBorder}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="filled"
                        label="Email*"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={classes.noBorder}
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="filled"
                        label="Phone*"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        sx={classes.noBorder}
                      />
                    )}
                  />

                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="filled"
                        label="Message*"
                        multiline
                        rows={4}
                        fullWidth
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        sx={classes.noBorder}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      bgcolor: '#0B3C95',
                      maxWidth: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send'}
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            maxHeight: '80px',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            backgroundColor: 'white'
          }}
        >
          <Image
            src={worldMap}
            alt="World Map"
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      </Container>
    </Box>
  );
};

const classes = {
  noBorder: {
    '& .MuiFilledInput-root': {
      backgroundColor: 'white',
      borderRadius: '8px'
    }
  }
};

export default ContactSection;
