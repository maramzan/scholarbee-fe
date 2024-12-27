import {
  useState,
  useEffect,
  useCallback,
  useMemo
  // SyntheticEvent
} from 'react';
// import { SelectChangeEvent } from '@mui/material';
import { useGetProgramsQuery } from '@/redux/api/programApi';
import { UniversityAdmission } from '@/types/program';
import { ProgramsFilters } from '@/types';
import debounce from 'lodash/debounce';
import { useSearchParams } from 'next/navigation';

interface QueryParams {
  page: number;
  search: string;
  university?: string;
  studyLevel: string;
  courseForm: string;
}

export const usePrograms = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [formData, setFormData] = useState<ProgramsFilters>({
    university: '',
    universityId: '',
    studyLevel: '',
    major: '',
    courseFormat: '',
    fee: '',
    age: '',
    startDate: '',
    year: '',
    intake: '',
    courseForm: ''
  });
  const [page, setPage] = useState<number>(1);
  const [allPrograms, setAllPrograms] = useState<UniversityAdmission[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const searchParams = useSearchParams();

  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     universityId: searchParams.get('universityId') || '',
  //     university: searchParams.get('university') || '',
  //     studyLevel: searchParams.get('studyLevel') || '',
  //     major: searchParams.get('major') || ''
  //   }));
  // }, [searchParams]);

  useEffect(() => {
    // Get all the filter values from URL params
    const universityId = searchParams.get('universityId') || '';
    const university = searchParams.get('university') || '';
    const studyLevel = searchParams.get('studyLevel') || '';
    const major = searchParams.get('major') || '';

    // Update form data with URL params
    setFormData((prevFormData) => ({
      ...prevFormData,
      universityId,
      university: decodeURIComponent(university.replace(/-/g, ' ')), // Convert kebab-case back to normal text
      studyLevel,
      major
    }));
  }, [searchParams]);

  const debouncedSearchChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
        setPage(1);
      }, 300),
    []
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearchChange(event.target.value);
    },
    [debouncedSearchChange]
  );

  const queryParams: QueryParams = useMemo(
    () => ({
      page,
      search: searchValue,
      university: formData.universityId,
      studyLevel: formData.studyLevel,
      courseForm: formData.courseForm,
      year: formData.year,
      intake: formData.intake,
      fee: formData.fee,
      major: formData.major
    }),
    [
      page,
      searchValue,
      formData.studyLevel,
      formData.courseForm,
      formData.universityId,
      formData.year,
      formData.intake,
      formData.fee,
      formData.major
    ]
  );

  const {
    data: programs,
    isLoading,
    isFetching
  } = useGetProgramsQuery(queryParams);

  useEffect(() => {
    if (programs?.docs) {
      setAllPrograms((prevPrograms) =>
        page === 1
          ? programs.docs
          : [
              ...prevPrograms,
              ...programs.docs.filter(
                (p: { _id: string }) =>
                  !prevPrograms.some((prev) => prev._id === p._id)
              )
            ]
      );
    }
  }, [programs, page]);

  const handleChange = useCallback((name: string, value: string) => {
    // const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setPage(1);
  }, []);

  const handleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleUniversityChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    showFilters,
    formData,
    allPrograms,
    isLoading,
    isFetching,
    programs,
    handleChange,
    handleFilters,
    handleLoadMore,
    totalDocs: programs?.pagination?.totalDocs,
    handleSearchChange,
    handleUniversityChange
  };
};
