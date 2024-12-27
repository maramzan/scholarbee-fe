import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice'; // Import the logout action
import { resetAdmissionState } from '@/redux/slices/admissionSlice';

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAdmissionState());
    router.push('/login');
  };

  return { handleLogout };
};
