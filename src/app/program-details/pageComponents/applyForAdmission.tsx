'use client';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
  setAdmissionId,
  setCampusId,
  setProgramId
} from '@/redux/slices/admissionSlice';
import { useAuthRedirect } from '../useAuthRedirect';
import { useGetUserQuery } from '@/redux/api/userApi';

const ApplyForAdmission = ({
  c_id,
  programId,
  admissionId
}: {
  c_id: string;
  programId: string;
  admissionId: string;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleProtectedAction } = useAuthRedirect();
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
  const isProfileCompleted = userData?.user?.isProfileCompleted;

  const handleApplyForAdmission = () => {
    dispatch(setCampusId(c_id));
    dispatch(setProgramId(programId));
    dispatch(setAdmissionId(admissionId));
    router.push(`/create-profile?step=${isProfileCompleted ? 4 : 0}`);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" fontWeight="600">
        About University
      </Typography>
      <Button
        sx={{ display: { xs: 'none', sm: 'block' } }}
        variant="contained"
        disabled={isLoadingUser}
        onClick={() =>
          handleProtectedAction(handleApplyForAdmission, '/create-profile')
        }
      >
        {isLoadingUser ? (
          <LinearProgress sx={{ width: '180px' }} />
        ) : (
          'Apply For Admission'
        )}
      </Button>
    </Box>
  );
};

export default ApplyForAdmission;
