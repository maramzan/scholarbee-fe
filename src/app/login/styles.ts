export const styles = {
  mainContainer: { height: '100vh' },
  leftGrid: {
    background: 'linear-gradient(174deg, #4A9DE0 2.64%, #0B3B95 92.87%)',
    display: { xs: 'none', sm: 'flex' },
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 4,
    position: 'relative'
  },
  circleBgImage: {
    zIndex: 0,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  illustrationBox: {
    textAlign: 'center',
    maxWidth: { sm: '500px', md: '600px' },
    px: { xs: 4, md: 9 },
    py: { xs: 4, md: 10 },
    borderRadius: '24px',
    // border: '1px solid #fff',
    // background: 'rgba(63, 93, 150, 0.10)',
    zIndex: 2
  },
  illustrationImage: {
    width: '100%',
    maxWidth: '275px',
    height: 'auto'
  },
  rightGrid: {
    display: 'flex',
    flexDirection: 'column'
  },
  formContainer: {
    my: 7,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: { mt: 1 },
  submitButton: { maxWidth: '100%', mt: 3, mb: 2 },
  textField: {
    borderRadius: '12px'
  }
};
