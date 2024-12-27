import { AuthState } from '@/types/authTypes';
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState: AuthState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    updateProfileStatus: (state) => {
      if (state.user) {
        state.user.isProfileCompleted = true;
        const userCookie = Cookies.get('user');
        if (userCookie) {
          const parsedUser = JSON.parse(userCookie);
          parsedUser.isProfileCompleted = true;
          Cookies.set('user', JSON.stringify(parsedUser));
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
      Cookies.remove('user');
    }
  }
});

export const { setUser, logout, setToken, updateProfileStatus } =
  authSlice.actions;

export default authSlice.reducer;
