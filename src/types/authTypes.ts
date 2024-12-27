import { Program } from './program';

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export interface SignUpResponse {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_type: string;
  created_at: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_type: string;
  created_at: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  loginAttempts: number;
  isProfileCompleted?: boolean;
}

export interface LoginResponse {
  exp: number;
  message: string;
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AdmissionState {
  campusId: null;
  programs: Program[];
  loading: boolean;
  error: string;
}
