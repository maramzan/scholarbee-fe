'use client';
import React, { useCallback } from 'react';
import {
  Autocomplete,
  Box,
  TextField,
  AutocompleteRenderInputParams,
  Typography,
  LinearProgress
} from '@mui/material';
import { useUniversitySearch } from './useUniversitySearch';
import { toTitleCase } from '@/utils/helperFunctions';

interface UniversityDropdownProps {
  onChange: (name: string, value: string) => void;
  title: string;
  name: string;
  onProgramPage?: boolean;
  defaultValue?: { name: string; id: string };
}

interface University {
  id: string;
  name: string;
}

const UniversitySearchDropdown = ({
  onChange,
  title,
  name,
  onProgramPage,
  defaultValue
}: UniversityDropdownProps) => {
  const {
    universities,
    selectedUniversity,
    inputValue,
    isFetching,
    handleInputChange,
    handleSelectChange,
    handleScroll
  } = useUniversitySearch({
    onChange,
    name,
    defaultValue: {
      id: defaultValue?.id || '',
      name: toTitleCase(defaultValue?.name || '')
    }
  });

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={onProgramPage ? '' : title}
        placeholder="University"
        name="university"
        variant={onProgramPage ? 'outlined' : 'filled'}
        sx={classes.noBorder}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {isFetching ? <LinearProgress sx={{ width: '20px' }} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          )
        }}
      />
    ),
    [title, isFetching, onProgramPage]
  );

  return (
    <Box sx={{ maxWidth: '350px', width: '100%', margin: 'auto' }}>
      {onProgramPage && (
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 1
          }}
          fontWeight="medium"
          variant="body1"
          data-test-id={`select-label-${name}`}
        >
          University
        </Typography>
      )}
      <Autocomplete<University, false, false, false>
        options={universities}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => handleSelectChange(value)}
        onInputChange={(event, newInputValue) =>
          handleInputChange(newInputValue)
        }
        sx={{ borderRadius: '12px' }}
        inputValue={inputValue}
        loading={isFetching}
        value={selectedUniversity}
        ListboxProps={{
          onScroll: handleScroll
        }}
        renderInput={renderInput}
      />
    </Box>
  );
};

export default UniversitySearchDropdown;

const classes = {
  noBorder: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#F7F8F9',
      borderRadius: '8px',
      '&:before': {
        borderBottom: 'none'
      },
      '&:hover:before': {
        borderBottom: 'none !important'
      },
      '&:after': {
        borderBottom: 'none'
      }
    }
  }
};
