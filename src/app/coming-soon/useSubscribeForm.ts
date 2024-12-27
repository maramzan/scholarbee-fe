import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSubscribeMutation } from '@/redux/api/contactApi';

const formSchema = z
  .object({
    email: z
      .string()
      .email('Please enter a valid email address')
      .nonempty('Email is required'),
    name: z.string().min(2, 'Name is required').nonempty('Name is required'),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
      .nonempty('Phone number is required'),
    user_type: z.enum(['Student', 'Admin'], {
      errorMap: () => ({ message: 'Please select a user type' })
    }),
    study_level: z
      .enum(['Bachelors', 'Masters', 'PhD'], {
        errorMap: () => ({ message: 'Please select your level of study' })
      })
      .optional(),
    study_country: z.string().optional(),
    is_looking_for_scholarship: z.boolean().optional(),
    thoughts: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.user_type === 'Student') {
      if (!data.study_level) {
        ctx.addIssue({
          path: ['study_level'],
          code: z.ZodIssueCode.custom,
          message: 'Study level is required for students'
        });
      }
      if (!data.study_country) {
        ctx.addIssue({
          path: ['study_country'],
          code: z.ZodIssueCode.custom,
          message: 'Please select a country to study'
        });
      }
    }
  });

type FormData = z.infer<typeof formSchema>;

const useSubscribeForm = () => {
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<'success' | 'error'>(
    'success'
  );
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_looking_for_scholarship: false,
      study_level: undefined,
      user_type: undefined,
      phone: '',
      thoughts: ''
    }
  });

  const userType = watch('user_type');

  const handlePhoneChange = (value: string | undefined) => {
    setValue('phone', value || '', { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        type: 'registration',
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_type: data.user_type,
        ...(data.user_type === 'Student' && {
          is_scholarship: data.is_looking_for_scholarship,
          study_level: data.study_level,
          study_country: data.study_country
        }),
        message: data.thoughts || ''
      };

      const response = await subscribe(payload).unwrap();

      setToastMessage(response.message || 'Subscribed successfully!');
      setSeverity('success');
      setOpenToast(true);
      reset();
    } catch (error) {
      const errorMessage =
        (error as { data?: { errors?: { message?: string }[] } })?.data
          ?.errors?.[0]?.message ||
        (error as { data?: { message?: string } })?.data?.message ||
        'Something went wrong. Please try again.';
      setToastMessage(errorMessage);
      setSeverity('error');
      setOpenToast(true);
    }
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    userType,
    handlePhoneChange,
    onSubmit,
    openToast,
    toastMessage,
    severity,
    handleCloseToast,
    isLoading
  };
};

export default useSubscribeForm;
