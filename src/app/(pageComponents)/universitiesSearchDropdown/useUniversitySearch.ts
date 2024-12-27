import { useState, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { useGetUniversitiesQuery } from '@/redux/api/universitiesApi';

interface University {
  id: string;
  name: string;
}

interface UseUniversitySearchProps {
  onChange: (name: string, value: string) => void;
  name: string;
  defaultValue?: { name: string; id: string };
}

export const useUniversitySearch = ({
  onChange,
  name,
  defaultValue
}: UseUniversitySearchProps) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [inputValue, setInputValue] = useState('');

  const { data, isFetching, refetch } = useGetUniversitiesQuery(
    {
      page,
      limit: 50,
      search: searchTerm || undefined
    },
    { skip: false }
  );

  useEffect(() => {
    if (data) {
      setUniversities((prevUniversities) => {
        const newUniversities = data.docs
          .filter(
            (newUni) =>
              !prevUniversities.some(
                (existingUni) => existingUni.id === newUni.id
              )
          )
          .map((uni) => ({
            id: uni.id,
            name: uni.name
          }));
        const unis = [...prevUniversities, ...newUniversities];

        const exists = unis.some((uni) => uni?.id === defaultValue?.id);
        if (exists) {
          return unis;
        } else {
          return defaultValue ? [defaultValue, ...unis] : unis;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (defaultValue && defaultValue.name && defaultValue.id) {
      setSelectedUniversity((prevSelectedUniversity) => {
        if (prevSelectedUniversity?.id !== defaultValue.id) {
          return defaultValue;
        }
        return prevSelectedUniversity;
      });
    }
  }, [defaultValue, onChange]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
        setPage(1);
        refetch();
      }, 500),
    [refetch]
  );

  const handleInputChange = useCallback(
    (newInputValue: string) => {
      setInputValue(newInputValue);
      if (newInputValue === '') {
        setSelectedUniversity(null);
        onChange(name, '');
      } else if (newInputValue !== selectedUniversity?.name) {
        debouncedSearch(newInputValue);
      }
    },
    [debouncedSearch, selectedUniversity, onChange, name]
  );

  const handleSelectChange = useCallback(
    (value: University | null) => {
      setSelectedUniversity(value);
      if (value) {
        onChange(name, value.name);
        onChange('universityId', value.id);
        setInputValue(value.name);
      } else {
        onChange(name, '');
        onChange('universityId', '');
        setInputValue('');
        setSearchTerm('');
        setPage(1);
        refetch();
      }
    },
    [onChange, name, refetch]
  );

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLUListElement>) => {
      const listBoxNode = event.currentTarget;
      if (
        listBoxNode.scrollTop + listBoxNode.clientHeight >=
        listBoxNode.scrollHeight - 200
      ) {
        if (!isFetching && data?.hasNextPage) {
          setPage((prev) => prev + 1);
        }
      }
    },
    [isFetching, data?.hasNextPage]
  );

  return {
    universities,
    selectedUniversity,
    inputValue,
    isFetching,
    handleInputChange,
    handleSelectChange,
    handleScroll
  };
};
