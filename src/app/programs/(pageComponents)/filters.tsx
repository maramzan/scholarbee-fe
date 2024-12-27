import React from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  CircularProgress,
  Autocomplete,
  Typography
} from '@mui/material';
import { OPTIONS } from '@/constants';
import SearchIcon from '@mui/icons-material/Search';
import { FilterSectionProps } from '@/types';
import Image from 'next/image';
import filterIcon from '/public/assets/svg/filter.svg';
import UniversitySearchDropdown from '@/app/(pageComponents)/universitiesSearchDropdown';

interface AutocompleteFieldProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
  label,
  options,
  onChange,
  placeholder,
  value
}) => (
  <>
    <Typography
      sx={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        mb: 1
      }}
      fontWeight="medium"
      variant="body1"
    >
      {label}
    </Typography>
    <Autocomplete
      onChange={(event, value) => onChange(value?.value || '')}
      disablePortal
      options={options}
      value={options.find((option) => option.value === value) || null} // Set initial value
      sx={{ maxWidth: 300, width: '100%', borderRadius: '12px', mb: 2 }}
      renderInput={(params) => (
        <TextField placeholder={placeholder} {...params} label="" />
      )}
    />
  </>
);

const FilterSection: React.FC<FilterSectionProps> = ({
  formData,
  handleChange,
  handleUniversityChange,
  handleSearchChange,
  handleFilters,
  showFilters,
  isFetching,
  isSmallScreen
}) => {
  const filterFields = [
    { name: 'studyLevel', label: 'Study Level', options: OPTIONS.studyLevel },
    {
      name: 'courseForm',
      label: 'Course Format',
      options: OPTIONS.courseFormat
    },
    { name: 'year', label: 'Year', options: OPTIONS.year },
    { name: 'intake', label: 'Intake', options: OPTIONS.intake },
    { name: 'fee', label: 'Fee', options: OPTIONS.fee },
    { name: 'major', label: 'Major Course', options: OPTIONS.majorCourse }
  ];

  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <TextField
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          placeholder="Search Admission"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isFetching ? (
                  <CircularProgress size="25px" color="inherit" />
                ) : (
                  <SearchIcon />
                )}
              </InputAdornment>
            ),
            sx: { borderRadius: '12px' }
          }}
          sx={{ mb: 2 }}
        />
        <Box
          onClick={handleFilters}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <Image src={filterIcon} alt="filter icons" />
        </Box>
      </Box>
      {(!isSmallScreen || showFilters) && (
        <Box>
          <UniversitySearchDropdown
            onChange={handleUniversityChange}
            title="Select University"
            name="university"
            onProgramPage
            defaultValue={{
              name: formData?.university,
              id: formData?.universityId
            }}
          />
          <Box mt={2} />
          {filterFields.map((field) => (
            <AutocompleteField
              key={field.name}
              label={field.label}
              options={field.options}
              onChange={(value) => handleChange(field.name, value)}
              placeholder={field.label}
              value={formData[field.name as keyof typeof formData] || ''}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default React.memo(FilterSection);
