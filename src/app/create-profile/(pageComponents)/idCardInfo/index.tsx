'use client';
import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import ButtonsComponent from '../buttonsComponent';
import { CustomTypography } from '@/components/atoms/customTypography';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomInput from '../customInput';
import { NationalIDCard as INationalIDCard } from '../../constants/types';
import { toast } from 'react-toastify';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/userApi';
import { useDispatch } from 'react-redux';
import { updateProfileStatus } from '@/redux/slices/authSlice';

const nationalIdCardSchema = z.object({
  front_side: z.string().min(1, 'Front side of National ID is required'),
  back_side: z.string().min(1, 'Back side of National ID is required')
});

interface NationalIDCardProps {
  onNext: () => void;
  onPrev: () => void;
}

const NationalIDCard: React.FC<NationalIDCardProps> = ({ onNext, onPrev }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<INationalIDCard>({
    resolver: zodResolver(nationalIdCardSchema),
    defaultValues: {
      front_side: '',
      back_side: ''
    }
  });
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?.user?.national_id_card) {
      const idCards = userData.user.national_id_card;

      reset(idCards);
    }
  }, [userData, reset]);

  const setProfileCompleted = () => {
    dispatch(updateProfileStatus());
  };

  const onSubmit = async (id_data: INationalIDCard) => {
    // If there are existing ID card images and no changes, just proceed
    if (
      !isDirty &&
      userData?.user?.national_id_card?.front_side &&
      userData?.user?.national_id_card?.back_side
    ) {
      if (!userData.user.isProfileCompleted) {
        try {
          await updateUser({
            user_id: userData.user.id || '',
            data: { isProfileCompleted: true }
          }).unwrap();
          setProfileCompleted();
        } catch (error) {
          console.log('error', error);
          toast.error('Failed to update profile status');
          return;
        }
      }
      onNext();
      return;
    }

    // If there are changes or no existing ID card images, update everything
    if (isDirty || !userData?.user?.national_id_card) {
      const formattedData = {
        national_id_card: {
          front_side: id_data.front_side,
          back_side: id_data.back_side
        },
        isProfileCompleted: true
      };

      try {
        await updateUser({
          user_id: userData?.user.id || '',
          data: formattedData
        }).unwrap();
        setProfileCompleted();
        toast.success('ID Card updated successfully');
        onNext();
      } catch (error) {
        console.log('error', error);
        toast.error('Failed to update data');
      }
    }
  };

  return (
    <>
      <CustomTypography fontSize={32} smallFont={18} fontWeight={600}>
        Create Profile
      </CustomTypography>
      <Box>
        <Typography fontSize="500" my={2} variant="h6">
          National ID Card
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {isLoadingUser ? (
            <Box display={'flex'} justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={'front_side'}
                    control={control}
                    render={({ field: inputField }) => (
                      <CustomInput
                        name={'front_side'}
                        label={'Front Side'}
                        type={'file'}
                        value={inputField.value}
                        onChange={inputField.onChange}
                        error={!!errors.front_side}
                        helperText={errors.front_side?.message || ''}
                        uniqueId="front-side-file"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name={'back_side'}
                    control={control}
                    render={({ field: inputField }) => (
                      <CustomInput
                        name={'back_side'}
                        label={'Back Side'}
                        type={'file'}
                        value={inputField.value}
                        onChange={inputField.onChange}
                        error={!!errors.back_side}
                        helperText={errors.back_side?.message || ''}
                        uniqueId="back-side-file"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <ButtonsComponent
                goToPrevStep={onPrev}
                loading={isUpdatingUser}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default NationalIDCard;
