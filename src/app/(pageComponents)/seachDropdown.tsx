'use client';
import { Autocomplete, Box, TextField } from '@mui/material';
import React from 'react';

interface DropdownProps {
  item: {
    id: number;
    title: string;
    name: string;
    data: { label: string; value: string }[];
  };
  onChange: (name: string, value: string) => void; // Modify to pass name and value
}

const SearchDropdown = ({ item, onChange }: DropdownProps) => {
  const handleSelectChange = (
    event: React.SyntheticEvent,
    value: { label: string; value: string } | null
  ) => {
    if (value) {
      onChange(item.name, value.value);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '350px',
        width: '100%',
        margin: 'auto'
      }}
    >
      <Autocomplete
        options={item.data}
        getOptionLabel={(option) => option.label} // To display label correctly
        onChange={handleSelectChange} // Custom onChange handler
        renderInput={(params) => (
          <TextField
            {...params}
            label={item.title}
            variant="filled"
            sx={classes.noBorder}
          />
        )}
      />
    </Box>
  );
};

export default SearchDropdown;

const classes = {
  noBorder: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#F7F8F9',
      borderRadius: '8px',
      '&:before': {
        borderBottom: 'none'
      },
      '&:hover:before': {
        borderBottom: 'none !important' // Ensure it does not reappear on hover
      },
      '&:after': {
        borderBottom: 'none'
      }
    }
  }
};
