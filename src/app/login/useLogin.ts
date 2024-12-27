import { useCallback, useState } from 'react';
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setToken, setUser } from '@/redux/slices/authSlice';
import { AuthApi } from '@/endpoints/auth';
import { LoginFormData, loginSchema } from './schema';
import Cookies from 'js-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useLogin = (searchParams: ReadonlyURLSearchParams) => {
  const [loading, setLoading] = useState(false);
  const authApi = new AuthApi();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleRedirect = useCallback(async () => {
    const redirectUrl = searchParams.get('redirect');
    if (!redirectUrl) {
      router.replace('/');
      return;
    }

    try {
      const cleanPath = redirectUrl.startsWith('/')
        ? redirectUrl.slice(1)
        : redirectUrl;

      await new Promise((resolve) => setTimeout(resolve, 100));

      await router.replace(`/${cleanPath}`);
    } catch (error) {
      console.error('Redirect error:', error);
      router.replace('/');
    }
  }, [router, searchParams]);

  const login = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const response = await authApi.login(data);

      if (response?.success) {
        const { token, user } = response.data;

        // Set cookies
        Cookies.set('token', token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        Cookies.set('user', JSON.stringify(user), {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        // Update Redux state
        await Promise.all([
          dispatch(setToken(token)),
          dispatch(setUser({ user }))
        ]);

        toast.success('Logged in successfully');

        // Handle redirect
        await handleRedirect();
      } else {
        throw new Error(response?.data?.error || 'Login failed');
      }
    } catch (error) {
      const errorMessage =
        (error as Error)?.message || 'Error while logging in';
      toast.error(errorMessage);
      setError('root', {
        type: 'manual',
        message: 'Invalid credentials or server error'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    errors,
    control,
    handleSubmit: handleSubmit(login)
  };
};
