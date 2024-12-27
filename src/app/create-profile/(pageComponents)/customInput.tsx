import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useMemo, useState } from 'react';
import { UtilsApi } from '@/endpoints/utils';
import { S3_URL } from '@/constants/config';
import Cookies from 'js-cookie';

interface MarksGPA {
  total_marks_gpa: string;
  obtained_marks_gpa: string;
}

interface CustomInputProps {
  label?: string;
  type: string;
  value: string | MarksGPA | undefined;
  onChange: (value: string | MarksGPA) => void;
  options?: { value: string; label: string }[];
  required?: boolean;
  isDouble?: boolean;
  placeholder?: string;
  displayEmpty?: boolean;
  placeholderLabel?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  notEditable?: boolean;
  uniqueId?: string;
  disabled?: boolean;
}

const CustomInput = ({
  label,
  type,
  value,
  onChange,
  options,
  required,
  placeholder,
  isDouble = false,
  displayEmpty,
  placeholderLabel,
  error,
  helperText,
  notEditable,
  uniqueId,
  disabled
}: CustomInputProps) => {
  const token = Cookies.get('token');
  const utilsApi = useMemo(() => new UtilsApi(token || ''), [token]);

  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        const response = await utilsApi.uploadMedia(formData);

        if (response?.success) {
          const fileUrl = `${S3_URL}${response?.data.doc.filename}`;
          onChange(fileUrl);
        } else {
          console.error('File upload failed:', response);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  const inputId = uniqueId || `file-upload-${label || ''}`;

  if (isDouble && typeof value === 'object' && 'total_marks_gpa' in value) {
    return (
      <Box>
        <Typography display="flex">
          {label}
          {required && (
            <Typography component="span" color="error.main">
              *
            </Typography>
          )}
        </Typography>
        <Box sx={styles.doubleInputContainer}>
          <TextField
            fullWidth
            value={value.total_marks_gpa || ''}
            onChange={(e) =>
              onChange({
                ...value,
                total_marks_gpa: e.target.value
              })
            }
            sx={{ ...styles.textField, ...styles.leftField }}
            placeholder="Total Marks/GPA"
            variant="outlined"
            error={error}
          />
          <Box sx={styles.divider} />
          <TextField
            fullWidth
            value={value.obtained_marks_gpa || ''}
            onChange={(e) =>
              onChange({
                ...value,
                obtained_marks_gpa: e.target.value
              })
            }
            sx={{ ...styles.textField, ...styles.rightField }}
            placeholder="Obtained Marks/GPA"
            variant="outlined"
            error={error}
          />
        </Box>
        {helperText && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}
      </Box>
    );
  } else if (type === 'select') {
    return (
      <FormControl fullWidth error={error}>
        <Typography display="flex">
          {label}
          {required && (
            <Typography component="span" color="error.main">
              *
            </Typography>
          )}
        </Typography>
        <Select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty={displayEmpty}
          disabled={disabled}
          sx={{
            borderRadius: '8px',
            '&.Mui-disabled': {
              backgroundColor: '#f5f5f5',
              color: 'rgba(0, 0, 0, 0.38)'
            }
          }}
        >
          {displayEmpty && <MenuItem value="">{placeholderLabel}</MenuItem>}
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}
      </FormControl>
    );
  } else if (type === 'file') {
    const fileValue = value as string;

    return (
      <Box>
        <Typography display="flex" mb={1}>
          {label}
          {required && (
            <Typography component="span" color="error.main">
              *
            </Typography>
          )}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            padding: `${fileValue ? '8px' : '16px'} 12px`,
            backgroundColor: '#f9f9f9',
            position: 'relative'
          }}
        >
          <input
            id={inputId}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".jpg,.png,.pdf"
          />
          <label
            htmlFor={inputId}
            style={{
              flexGrow: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography
                sx={{
                  color: fileValue ? '#000' : '#9e9e9e',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {fileValue
                  ? fileValue.split('/').pop()
                  : placeholder || 'Choose a file'}
              </Typography>
            )}
            {!loading && (
              <>
                {fileValue ? (
                  <IconButton
                    size="small"
                    onClick={handleClearFile}
                    sx={{ marginLeft: 1 }}
                  >
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <CloudUploadIcon sx={{ color: '#1976d2', marginLeft: 1 }} />
                )}
              </>
            )}
          </label>
        </Box>
        {helperText && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Typography display="flex">
        {label}
        {required && (
          <Typography component="span" color="error.main">
            *
          </Typography>
        )}
      </Typography>
      <TextField
        fullWidth
        type={type}
        value={
          type === 'date'
            ? typeof value === 'string'
              ? value.slice(0, 10)
              : ''
            : (value as string)
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2
          }
        }}
        error={error}
        helperText={helperText}
        disabled={notEditable}
      />
    </Box>
  );
};

export default CustomInput;

const styles = {
  doubleInputContainer: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
    height: '56px',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)'
    }
  },
  textField: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiInputBase-input': {
      padding: '16.5px 14px'
    },
    '& .MuiOutlinedInput-root': {
      height: '100%'
    }
  },
  leftField: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  rightField: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  divider: {
    width: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.23)',
    height: 'calc(100% - 20px)',
    alignSelf: 'center'
  }
};
