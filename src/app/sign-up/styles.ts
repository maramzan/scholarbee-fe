export const styles = {
  gridContainer: {
    height: '100%'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    height: { xs: 'auto', md: '100vh' },
    overflowY: { xs: 'unset', md: 'auto' },
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
      borderRadius: '8px'
    }
  },
  formContainer: {
    my: 7,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    borderRadius: '12px'
  },
  submitButton: {
    maxWidth: '100%',
    mt: 3,
    mb: 2
  },
  socialButton: {
    maxWidth: '100%'
  }
};
