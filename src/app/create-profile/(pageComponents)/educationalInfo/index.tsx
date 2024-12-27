// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';
import React, { useEffect } from 'react';
import { Box, CircularProgress, Grid, Typography, Button } from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EDUCATIONAL_BG_FIELDS } from '../../constants';
import { CustomTypography } from '@/components/atoms/customTypography';
import ButtonsComponent from '../buttonsComponent';
import CustomInput from '../customInput';
import { EducationalBackground, MarksGPA } from '../../constants/types';
import { toast } from 'react-toastify';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/userApi';
import { z } from 'zod';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const educationalBackgroundSchema = z.object({
  educational_backgrounds: z.array(
    z.object({
      education_level: z.string().min(1, 'Education Level is required'),
      school_college_university: z
        .string()
        .min(1, 'School/College is required'),
      field_of_study: z.string().min(1, 'Field of Study is required'),
      marks_gpa: z.object({
        total_marks_gpa: z.string().min(1, 'Total Marks/GPA is required'),
        obtained_marks_gpa: z.string().min(1, 'Obtained Marks/GPA is required')
      }),
      year_of_passing: z.string().min(1, 'Year of Passing is required'),
      board: z.string().min(1, 'Board is required'),
      transcript: z.string().min(1, 'Transcript is required') // Changed to required
    })
  )
});

type FormData = z.infer<typeof educationalBackgroundSchema>;

interface IEducationalInfo {
  onNext: () => void;
  onPrev: () => void;
}

const EducationInfo = ({ onNext, onPrev }: IEducationalInfo) => {
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<FormData>({
    resolver: zodResolver(educationalBackgroundSchema),
    defaultValues: {
      educational_backgrounds: [
        {
          education_level: '',
          school_college_university: '',
          field_of_study: '',
          marks_gpa: {
            total_marks_gpa: '',
            obtained_marks_gpa: ''
          },
          year_of_passing: '',
          board: '',
          transcript: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educational_backgrounds'
  });

  useEffect(() => {
    if (userData?.user?.educational_backgrounds?.length) {
      reset({ educational_backgrounds: userData.user.educational_backgrounds });
    }
  }, [userData, reset]);

  const onSubmit = async (data: FormData) => {
    if (!Object.keys(dirtyFields).length) {
      toast.info('No changes detected');
      onNext();
      return;
    }

    try {
      await updateUser({
        user_id: userData?.user?.id || '',
        data: data
      }).unwrap();
      toast.success('Data updated successfully');
      onNext();
    } catch (error) {
      console.log('error', error);
      toast.error('Failed to update data');
    }
  };

  const handleAddMore = () => {
    append({
      education_level: '',
      school_college_university: '',
      field_of_study: '',
      marks_gpa: {
        total_marks_gpa: '',
        obtained_marks_gpa: ''
      },
      year_of_passing: '',
      board: '',
      transcript: ''
    });
  };

  return (
    <>
      <CustomTypography fontSize={32} smallFont={18} fontWeight={600}>
        Create Profile
      </CustomTypography>
      <Box>
        <Typography fontSize="500" variant="h6">
          Educational Background
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {isLoadingUser ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {fields.map((field, index) => (
                <Box key={field.id} sx={{ position: 'relative', mb: 4 }}>
                  {index > 0 && (
                    <IconButton
                      sx={{ position: 'absolute', right: 0, top: -20 }}
                      onClick={() => remove(index)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}
                  <Grid container spacing={2}>
                    {EDUCATIONAL_BG_FIELDS.map((fieldConfig, fieldIndex) => {
                      const isTranscript = fieldConfig.name === 'transcript';
                      const updatedFieldConfig = {
                        ...fieldConfig,
                        required: isTranscript ? true : fieldConfig.required
                      };

                      return (
                        <Grid
                          item
                          xs={12}
                          sm={updatedFieldConfig.fullWidth ? 12 : 6}
                          key={fieldIndex}
                        >
                          <Controller
                            name={`educational_backgrounds.${index}.${updatedFieldConfig.name}`}
                            control={control}
                            render={({ field: inputField }) => (
                              <CustomInput
                                label={updatedFieldConfig.label}
                                type={updatedFieldConfig.type}
                                value={
                                  updatedFieldConfig.isDouble
                                    ? (inputField.value as MarksGPA)
                                    : (inputField.value as string)
                                }
                                onChange={inputField.onChange}
                                options={updatedFieldConfig.options || []}
                                required={updatedFieldConfig.required}
                                isDouble={updatedFieldConfig.isDouble}
                                error={
                                  updatedFieldConfig.isDouble
                                    ? !!errors?.educational_backgrounds?.[index]
                                        ?.marks_gpa
                                    : !!errors?.educational_backgrounds?.[
                                        index
                                      ]?.[
                                        updatedFieldConfig.name as keyof EducationalBackground
                                      ]
                                }
                                helperText={
                                  updatedFieldConfig.isDouble
                                    ? errors?.educational_backgrounds?.[index]
                                        ?.marks_gpa?.total_marks_gpa?.message ||
                                      errors?.educational_backgrounds?.[index]
                                        ?.marks_gpa?.obtained_marks_gpa?.message
                                    : errors?.educational_backgrounds?.[
                                        index
                                      ]?.[
                                        updatedFieldConfig.name as keyof EducationalBackground
                                      ]?.message
                                }
                                uniqueId={`${updatedFieldConfig.name}-${index}`}
                                fieldIndex={index}
                                placeholder={
                                  isTranscript
                                    ? 'Upload Transcript (Required)'
                                    : undefined
                                }
                              />
                            )}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              ))}

              <Button
                startIcon={<AddIcon />}
                onClick={handleAddMore}
                variant="outlined"
                sx={{ mt: 2, mb: 4 }}
              >
                Add More
              </Button>

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

export default EducationInfo;
