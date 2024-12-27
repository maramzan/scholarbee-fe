import { API_URL } from '@/constants/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
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
  endpoints: (builder) => ({
    applyForProgram: builder.mutation({
      query: (data) => ({
        url: '/applications',
        method: 'POST',
        body: data
      })
    }),
    makePayment: builder.mutation({
      query: (data) => ({
        url: '/payments?depth=0&fallback-locale=null',
        method: 'POST',
        body: data
      })
    }),
    getUserApplications: builder.query({
      query: (userId) => `/applications?where[applicant][equals]=${userId}`
    })
  })
});

export const {
  useApplyForProgramMutation,
  useMakePaymentMutation,
  useGetUserApplicationsQuery
} = applicationsApi;
