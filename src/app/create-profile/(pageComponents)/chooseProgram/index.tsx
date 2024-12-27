'use client';
import { Box, Stack, Typography, Collapse } from '@mui/material';
import React, { Suspense } from 'react';
import CustomInput from '../customInput';
import ButtonsComponent from '../buttonsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchPrograms, setApplicationId } from '@/redux/slices/admissionSlice';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CustomTypography } from '@/components/atoms/customTypography';
import { toast } from 'react-toastify';
import { useApplyForProgramMutation } from '@/redux/api/applicationApi';
import Cookies from 'js-cookie';
import ChooseProgramSkeleton from './(pageComponents)/skelton';
import { ErrorBoundary } from 'react-error-boundary';
import { MarksGPA } from '../../constants/types';

const ChooseProgramSchema = z
  .object({
    selectedDepartments: z
      .array(z.string())
      .min(1, 'Please select at least one department'),
    preferences: z.record(z.string(), z.array(z.string()))
  })
  .superRefine((data, ctx) => {
    data.selectedDepartments.forEach((deptId) => {
      const prefs = data.preferences[deptId] || [];
      if (!prefs[0]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'First preference is required',
          path: ['preferences', deptId, 0]
        });
      }
    });
  });

type ChooseProgramFormValues = z.infer<typeof ChooseProgramSchema>;

const ChooseProgramContent = ({
  onPrev,
  onNext
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const admissionState = useSelector((state: RootState) => state.admission);
  const {
    campusId,
    programId,
    admissionId,
    departments: allDepartments,
    loading
  } = admissionState;

  const [filteredDepartments, setFilteredDepartments] = React.useState<
    typeof allDepartments
  >([]);
  const [userData, setUserData] = React.useState<{ id: string } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, submitCount },
    watch,
    setValue
  } = useForm<ChooseProgramFormValues>({
    resolver: zodResolver(ChooseProgramSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      selectedDepartments: [],
      preferences: {}
    }
  });

  React.useEffect(() => {
    if (allDepartments.length > 0 && programId) {
      const departmentWithProgram = allDepartments.find((dept) =>
        dept.programs.some((prog) => prog.id === programId)
      );

      if (departmentWithProgram) {
        setFilteredDepartments([departmentWithProgram]);
        setValue('selectedDepartments', [departmentWithProgram.id]);
        setValue(`preferences.${departmentWithProgram.id}`, [
          programId,
          '',
          ''
        ]);
      }
    }
  }, [allDepartments, programId, setValue]);

  React.useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUserData(JSON.parse(userCookie));
    }
  }, []);

  React.useEffect(() => {
    if (campusId) {
      dispatch(fetchPrograms(campusId));
    }
  }, [campusId, dispatch]);

  const selectedDepartments = watch('selectedDepartments');
  const allPreferences = watch('preferences');

  // const handleDepartmentSelection = (
  //   departmentId: string,
  //   checked: boolean
  // ) => {
  //   if (checked) {
  //     setValue('selectedDepartments', [departmentId]);
  //     if (programId) {
  //       setValue(`preferences.${departmentId}`, [programId, '', '']);
  //     }
  //   } else {
  //     setValue('selectedDepartments', []);
  //     setValue('preferences', {});
  //   }
  // };

  const [applyForProgram, { isLoading: isApplying }] =
    useApplyForProgramMutation();

  const onSubmit = async (data: ChooseProgramFormValues) => {
    const filteredPreferences = Object.fromEntries(
      data.selectedDepartments.map((deptId) => [
        deptId,
        (data.preferences[deptId] || []).filter((pref) => pref && pref !== '')
      ])
    );

    const totalProcessingFee = data.selectedDepartments.reduce(
      (total, deptId) => {
        const department = filteredDepartments.find(
          (dept) => dept.id === deptId
        );
        return total + (department?.process_fee || 1000);
      },
      0
    );

    const applicationData = {
      status: 'Pending',
      program: programId,
      applicant: userData?.id,
      admission: admissionId,
      submission_date: new Date().toISOString(),
      admission_programs: filteredPreferences,
      total_processing_fee: totalProcessingFee
    };

    try {
      const res = await applyForProgram(applicationData).unwrap();
      dispatch(setApplicationId(res.doc.id));
      toast.success('Application submitted successfully');
      onNext();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Error submitting application');
    }
  };

  const filterAvailableOptions = (index: number, departmentId: string) => {
    const departmentPreferences = allPreferences[departmentId] || ['', '', ''];
    const selected = departmentPreferences.filter((_, i) => i !== index);
    const department = filteredDepartments.find(
      (dept) => dept.id === departmentId
    );

    return (
      department?.programs
        .map((program) => ({
          label: program.name,
          value: program.id
        }))
        .filter((program) => {
          if (index === 0 && program.value === programId) {
            return true;
          }
          return !selected.includes(program.value);
        }) || []
    );
  };

  const renderPreferenceInput = (
    index: number,
    label: string,
    departmentId: string
  ) => (
    <Box sx={styles.preferenceContainer} key={index}>
      <Typography fontSize={18} width={50}>
        {index + 1}
        <Typography fontSize={14} component="sup">
          {label}
        </Typography>
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Controller
          name={`preferences.${departmentId}.${index}`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              displayEmpty
              placeholderLabel={
                index === 0
                  ? 'First Preference'
                  : 'Select Preference (Optional)'
              }
              type="select"
              value={field.value || ''}
              onChange={(value: string | MarksGPA) => field.onChange(value)}
              options={filterAvailableOptions(index, departmentId)}
              error={
                submitCount > 0 &&
                index === 0 &&
                selectedDepartments.includes(departmentId) &&
                !field.value
              }
              helperText={
                submitCount > 0 &&
                index === 0 &&
                selectedDepartments.includes(departmentId) &&
                !field.value
                  ? 'First preference is required'
                  : ''
              }
              disabled={index === 0}
            />
          )}
        />
      </Box>
    </Box>
  );

  if (loading || !userData) {
    return <ChooseProgramSkeleton />;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <CustomTypography mt={4} fontSize={32} smallFont={18} fontWeight={600}>
        Choose Program
      </CustomTypography>
      <Typography variant="h6" fontWeight={500}>
        You are all set to apply for the admission now
      </Typography>
      <Typography variant="body2" fontSize={14} mb={4}>
        Note: Before applying for any program, please refer to the eligibility
        criteria to ensure that you are qualifying for the respective program.
      </Typography>

      {filteredDepartments.map((department) => (
        <Box key={department.id} sx={styles.card} mt={2}>
          <Box sx={styles.programContainer}>
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={selectedDepartments.includes(department.id)}
                  onChange={(e) =>
                    handleDepartmentSelection(department.id, e.target.checked)
                  }
                />
              }
              label={department.name}
              sx={{ '& .MuiFormControlLabel-label': { fontWeight: 600 } }}
            /> */}
            <Typography variant="body1">
              Processing Fee: <strong>Rs {department.process_fee}</strong>
            </Typography>
          </Box>

          <Collapse in={selectedDepartments.includes(department.id)}>
            <Box p={4}>
              <Typography variant="body1" fontWeight={500} fontSize={14}>
                Program Preferences for {department.name}
              </Typography>
              <Stack gap={2} mt={2}>
                {department.programs.length >= 3 ? (
                  <>
                    {renderPreferenceInput(0, 'st', department.id)}
                    {renderPreferenceInput(1, 'nd', department.id)}
                    {renderPreferenceInput(2, 'rd', department.id)}
                  </>
                ) : (
                  Array.from({ length: department.programs.length }).map(
                    (_, index) =>
                      renderPreferenceInput(
                        index,
                        index === 0 ? 'st' : index === 1 ? 'nd' : 'rd',
                        department.id
                      )
                  )
                )}
              </Stack>
            </Box>
          </Collapse>
        </Box>
      ))}

      {submitCount > 0 && errors.selectedDepartments && (
        <Typography color="error" mt={2}>
          {errors.selectedDepartments.message}
        </Typography>
      )}

      <Box mt={4}>
        <ButtonsComponent loading={isApplying} goToPrevStep={onPrev} />
      </Box>
    </Box>
  );
};

const ChooseProgram = (props: { onPrev: () => void; onNext: () => void }) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div>Something went wrong. Please try again.</div>
      )}
    >
      <Suspense fallback={<ChooseProgramSkeleton />}>
        <ChooseProgramContent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ChooseProgram;

const styles = {
  preferenceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center'
  },
  card: {
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    border: '1px solid var(--Stroke, #E8ECF4);',
    borderRadius: '8px'
  },
  programContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2
  }
};
