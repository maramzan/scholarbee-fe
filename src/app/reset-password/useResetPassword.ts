import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { AuthApi } from '@/endpoints/auth';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof schema>;

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  // Move useSearchParams logic into useEffect to only run on the client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    setToken(token);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error('Token is missing or invalid');
      }
      const authApi = new AuthApi();
      const response = await authApi.resetPassword({
        password: data.newPassword,
        token
      });
      if (response.success) {
        toast.success('Password successfully reset!');
        router.push('/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log('error white reset password', error);

      toast.error('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    showPassword,
    setShowPassword
  };
};
