'use client';
import { toKebabCase } from '@/utils/helperFunctions';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SearchButtonProps {
  filtersForm: {
    universityId: string;
    university: string;
    studyLevel: string;
    major: string;
  };
}

const SearchButton = ({ filtersForm }: SearchButtonProps) => {
  const router = useRouter();

  const goToPrograms = () => {
    const validFilters = Object.entries(filtersForm).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    if (Object.keys(validFilters).length === 0) {
      router.push('/programs');
    } else {
      const queryParams = new URLSearchParams({
        ...validFilters,
        university: toKebabCase(validFilters.university)
      }).toString();

      router.push(`/programs?${queryParams}`);
    }
  };

  return (
    <Button
      onClick={goToPrograms}
      sx={{
        maxWidth: 432,
        width: '100%'
      }}
      variant="contained"
    >
      Search
    </Button>
  );
};

export default SearchButton;
