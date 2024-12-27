import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AuthApi } from '@/endpoints/auth';
import { FormData, schema } from './schema';

export const useSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const authApi = new AuthApi();
  const [loading, setLoading] = useState(false); // Add loading state

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const requestData = { ...data, user_type: 'Student' };
    try {
      const response = await authApi.signUp(requestData);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push('/confirm-email');
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log('error white sign up', error);
      toast.error('An error occurred during sign-up.');
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      id: 'first_name',
      placeholder: 'First Name',
      icon: 'assets/svg/user-outlined.svg'
    },
    {
      id: 'last_name',
      placeholder: 'Last Name',
      icon: 'assets/svg/user-outlined.svg'
    },
    {
      id: 'phone_number',
      placeholder: 'Phone Number',
      icon: 'assets/svg/call-outlined.svg'
    },
    {
      id: 'email',
      placeholder: 'Email',
      icon: 'assets/svg/mail-outlined.svg'
    }
  ];

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    setShowPassword,
    inputFields,
    loading
  };
};
