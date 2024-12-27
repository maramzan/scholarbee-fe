import { API_URL } from '@/constants/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetProgramsParams {
  page?: number;
  search?: string;
  university?: string;
  studyLevel?: string;
  courseForm?: string;
  year?: string;
  intake?: string;
  fee?: string;
  major?: string;
}

export const programsApi = createApi({
  reducerPath: 'programsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPrograms: builder.query({
      query: (params) => {
        const { page = 1, ...filters } = params;
        const queryParams = new URLSearchParams({ page: page.toString() });

        (
          Object.entries(filters) as [keyof GetProgramsParams, string][]
        ).forEach(([key, value]) => {
          if (value) {
            queryParams.append(key === 'search' ? 'programName' : key, value);
          }
        });

        return `admission-programs-with-filters?${queryParams.toString()}`;
      }
    })
  })
});

export const { useGetProgramsQuery } = programsApi;
