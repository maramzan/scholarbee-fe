import { Box, Button } from '@mui/material';
import React from 'react';

const ButtonsComponent = ({
  loading,
  goToPrevStep,
  buttonTxt
}: {
  onClickSave?: () => void;
  goToPrevStep?: () => void;
  buttonTxt?: string;
  loading?: boolean;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      mt={4}
      gap={2}
    >
      <Button
        onClick={goToPrevStep}
        sx={{ width: '100%', maxWidth: { xs: '35%', sm: '150px' } }}
        variant="outlined"
        disabled={loading}
      >
        Back
      </Button>
      <Button
        type="submit"
        sx={{ width: '100%', maxWidth: { xs: '70%', sm: '250px' } }}
        variant="contained"
        disabled={loading}
      >
        {loading ? 'Saving...' : buttonTxt || 'Save & Next'}
      </Button>
    </Box>
  );
};

export default ButtonsComponent;
