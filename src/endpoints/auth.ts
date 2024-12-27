import { FormData } from '@/app/sign-up/schema';
import { API_URL } from '@/constants/config';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  SignUpResponse
} from '@/types/authTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';
export class AuthApi {
  async login(request: LoginRequest) {
    try {
      const response = await axios.post(`${API_URL}/login`, request);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          message: 'Login successful'
        };
      }
    } catch (error) {
      if (error) {
        console.log('error befor returning', {
          success: false,
          data: (error as AxiosError)?.response?.data,
          message: 'Error While Logging iiIn'
        });
        return {
          success: false,
          data: (error as AxiosError)?.response?.data,
          message: 'Error While Logging Inn'
        };
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async signUp(request: FormData) {
    try {
      const response: AxiosResponse<SignUpResponse> = await axios.post(
        `https://admin.scholarbee.pk/api/signup`,
        request
      );
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          message: 'Account created successfully'
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async forgotPassword(request: ForgotPasswordRequest) {
    try {
      const response: AxiosResponse<SignUpResponse> = await axios.post(
        `${API_URL}/users/forgot-password`,
        request
      );
      console.log('response in api', response);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          message: 'Password reset link sent to your email'
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async verifyEmail(token: string) {
    try {
      const response: AxiosResponse<ForgotPasswordResponse> = await axios.get(
        `${API_URL}/verify-email/${token}`
      );
      console.log('response on verify email Api', response);
      return {
        success: true,
        data: response.data,
        message: 'Email verified successfully'
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          data: error.response?.data,
          message: 'Failed to verify email'
        };
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  async resetPassword(request: { password: string; token: string }) {
    try {
      const response: AxiosResponse<ForgotPasswordResponse> = await axios.post(
        `${API_URL}/users/reset-password`,
        request
      );
      console.log('response on reset password Api', response);
      return {
        success: true,
        data: response.data,
        message: 'Password reset successfully'
      };
    } catch (error) {
      console.log('error in reset password', error);
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          data: error.response?.data.errors[0],
          message: 'Failed to reset password'
        };
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }
}
