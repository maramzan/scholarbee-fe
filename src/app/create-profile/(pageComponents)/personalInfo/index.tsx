'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import CustomInput from '../customInput';
import ImagePicker from '@/components/molecules/imagePicker';
import ButtonsComponent from '../buttonsComponent';
import { PERSONAL_INFO_FIELDS } from '../../constants';
import { CustomTypography } from '@/components/atoms/customTypography';
import { User } from '../../constants/types';
import { toast } from 'react-toastify';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/userApi';
import { personalInfoSchema } from '../../schemas';

const PersonalInfo = ({ onNext }: { onNext: () => void }) => {
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
    setValue
  } = useForm<User>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: undefined,
      nationality: '',
      father_name: '',
      father_status: undefined,
      father_profession: '',
      father_income: '',
      mother_name: '',
      mother_status: undefined,
      mother_profession: '',
      mother_income: '',
      religion: '',
      special_person: undefined,
      profile_image_url: ''
    }
  });

  useEffect(() => {
    if (userData) {
      reset(userData?.user);
    }
  }, [userData, reset]);

  const onSubmit = async (user_data: User) => {
    if (!isDirty) {
      toast.info('No changes detected');
      onNext();
      return;
    }

    try {
      await updateUser({
        user_id: userData?.user.id || '',
        data: user_data
      }).unwrap();
      toast.success('Data updated successfully');
      onNext();
    } catch (error) {
      console.log('error', error);
      toast.error('Failed to update data');
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setValue('profile_image_url', imageUrl, { shouldDirty: true });
  };

  return (
    <>
      <CustomTypography fontSize={32} smallFont={18} fontWeight={600}>
        Create Profile
      </CustomTypography>
      <Box>
        <Typography fontSize="500" variant="h6">
          Personal Information
        </Typography>
        <ImagePicker
          imageUrl={watch('profile_image_url') || ''}
          onImageUpload={handleImageUpload}
        />
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {isLoadingUser ? (
            <Box display={'flex'} justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {PERSONAL_INFO_FIELDS.map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Controller
                    name={field.name as keyof User}
                    control={control}
                    render={({ field: inputField }) => (
                      <CustomInput
                        label={field.label}
                        type={field.type}
                        value={inputField.value?.toString() || ''}
                        name={inputField.name}
                        onChange={inputField.onChange}
                        options={field?.options || []}
                        required={field.required}
                        error={!!errors[field.name as keyof User]}
                        helperText={errors[field.name as keyof User]?.message}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <ButtonsComponent
            buttonTxt={!isDirty ? 'Next' : 'Save & Next'}
            loading={isUpdatingUser}
          />
        </Box>
      </Box>
    </>
  );
};

export default PersonalInfo;
