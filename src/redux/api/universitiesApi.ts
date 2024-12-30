import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface University {
  id: string;
  name: string;
}

interface UniversitiesResponse {
  docs: University[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

export const universitiesApi = createApi({
  reducerPath: 'universitiesApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://admin.scholarbee.pk/api/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://79dc-124-109-40-174.ngrok-free.app/api'
  }),
  endpoints: (builder) => ({
    getUniversities: builder.query<
      UniversitiesResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search = '', page = 1, limit = 20 }) =>
        search === ''
          ? `universities?depth=0&draft=true&limit=${limit}&page=${page}`
          : `universities?depth=0&draft=true&limit=${limit}&page=${page}&where[and][1][or][0][name][like]=${search}`
    })
  })
});

export const { useGetUniversitiesQuery } = universitiesApi;
