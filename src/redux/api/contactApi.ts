import { API_URL } from '@/constants/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ContactRequest {
  type: string;
  email: string;
  name: string;
  phone: string;
  user_type?: 'Student' | 'Admin';
  study_level?: 'Bachelors' | 'Masters' | 'PhD';
  is_looking_for_scholarship?: boolean;
  study_country?: string;
  message: string;
}

interface ContactResponse {
  message?: string;
  success: boolean;
}

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: (builder) => ({
    subscribe: builder.mutation<ContactResponse, ContactRequest>({
      query: (data) => ({
        url: '/contact-us?depth=0&fallback-locale=null',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useSubscribeMutation } = contactApi;
