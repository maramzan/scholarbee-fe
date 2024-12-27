import { useGetUserQuery } from '@/redux/api/userApi';
import {
  Avatar,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Skeleton
} from '@mui/material';

const ProfileInformation = () => {
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();
  const fullName = userData
    ? `${userData.user.first_name} ${userData.user.last_name}`
    : '';

  return (
    <Paper sx={styles.section}>
      <Box sx={styles.sectionHeader}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Profile Information
        </Typography>
      </Box>

      <Box sx={styles.avatarContainer}>
        {isLoadingUser ? (
          <Skeleton variant="circular" sx={styles.avatar} />
        ) : (
          <Avatar
            src={userData?.user?.profile_image_url}
            alt={fullName}
            sx={styles.avatar}
          />
        )}
      </Box>

      <Box sx={styles.formContainer}>
        {isLoadingUser ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Skeleton height={56} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton height={56} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton height={56} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton height={56} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                value={userData?.user?.date_of_birth || ''}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                value={userData?.user?.gender || ''}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nationality"
                value={userData?.user?.nationality || ''}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};

export default ProfileInformation;

const styles = {
  section: {
    mt: 2,
    p: 2.5,
    borderRadius: 2
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2
  },
  sectionTitle: {
    fontWeight: 'bold'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    mb: 3
  },
  avatar: {
    width: 100,
    height: 100
  },
  formContainer: {
    mt: 2
  }
};
