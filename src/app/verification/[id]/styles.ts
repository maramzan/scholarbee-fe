export const styles = {
  mainContainer: {
    height: '100vh'
  },
  rightGrid: {
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
  innerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    px: 2
  },
  formContainer: {
    my: 7,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '404px',
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  form: {
    mt: 4
  },
  verifyButton: {
    borderRadius: '12px',
    maxWidth: '100%',
    mt: 3,
    mb: 2
  }
};
