'use client';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import CustomInput from '../customInput';
import { CONTACT_INFO_FIELDS } from '../../constants';
import { User } from '../../constants/types';
import ButtonsComponent from '../buttonsComponent';
import { CustomTypography } from '@/components/atoms/customTypography';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { contactInfoSchema } from '../../schemas';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/userApi';

interface ContactInfoProps {
  onNext: () => void;
  onPrev: () => void;
}

const ContactInfo = ({ onNext, onPrev }: ContactInfoProps) => {
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm<User>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: '',
      phone_number: '',
      fatherEmailAddress: '',
      fatherPhoneNumber: '',
      provinceOfDomicile: undefined,
      districtOfDomicile: '',
      stateOrProvince: '',
      city: '',
      postalCode: '',
      streetAddress: ''
    }
  });

  useEffect(() => {
    if (userData) {
      reset(userData?.user);
    }
  }, [userData, reset]);

  const onSubmit = async (contact_data: User) => {
    if (!Object.keys(dirtyFields).length) {
      toast.info('No changes detected');
      onNext();
      return;
    }
    try {
      await updateUser({
        user_id: userData?.user.id || '',
        data: contact_data
      }).unwrap();
      toast.success('Data updated successfully');
      onNext();
    } catch (error) {
      console.log('error while update', error);
      toast.error('Failed to update data');
    }
  };

  return (
    <>
      <CustomTypography fontSize={32} smallFont={18} fontWeight={600}>
        Create Profile
      </CustomTypography>
      <Box>
        <Typography fontSize="500" variant="h6">
          Contact Information
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {isLoadingUser ? (
            <Box display={'flex'} justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {CONTACT_INFO_FIELDS.map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Controller
                    name={field.name as keyof User}
                    control={control}
                    render={({ field: inputField }) => (
                      <CustomInput
                        label={field.label}
                        type={field.type}
                        value={inputField?.value?.toString() || ''}
                        name={inputField.name}
                        onChange={inputField.onChange}
                        options={field.options || []}
                        required={field.required}
                        error={!!errors[field.name as keyof User]}
                        helperText={errors[field.name as keyof User]?.message}
                        notEditable={field?.notEditable || false}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <ButtonsComponent loading={isUpdatingUser} goToPrevStep={onPrev} />
        </Box>
      </Box>
    </>
  );
};

export default ContactInfo;
