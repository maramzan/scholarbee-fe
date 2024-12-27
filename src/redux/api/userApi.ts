import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { API_URL } from '@/constants/config';
import { User } from '@/app/create-profile/constants/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<{ user: User }, void>({
      query: () => '/users/me',
      providesTags: ['User']
    }),
    updateUser: builder.mutation<
      User,
      { user_id: string; data: Partial<User> }
    >({
      query: ({ user_id, data }) => ({
        url: `/users/${user_id}`,
        method: 'PUT',
        body: data
      }),
      async onQueryStarted({ user_id, data }, { queryFulfilled, dispatch }) {
        console.log('onQueryStarted', user_id, data);
        try {
          await queryFulfilled;
          dispatch(userApi.util.invalidateTags(['User']));
        } catch (err) {
          console.error('Update failed', err);
        }
      }
    })
  })
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
