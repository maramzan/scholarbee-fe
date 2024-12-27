import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton
} from '@mui/material';
import { styles } from '../styles';

export const NavbarSkeleton = () => (
  <Box sx={{ bgcolor: 'white', p: 2 }}>
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Skeleton variant="rectangular" width={150} height={40} />
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton width={100} height={24} />
      </Box>
    </Container>
  </Box>
);

export const SidebarSkeleton = () => (
  <Box sx={styles.sidebar}>
    <List>
      {[1, 2, 3].map((item) => (
        <ListItem key={item} sx={styles.listItem}>
          <ListItemIcon sx={styles.icon}>
            <Skeleton variant="circular" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={<Skeleton width={150} height={24} />} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export const ContentSkeleton = () => (
  <Box sx={{ width: '100%' }}>
    <Skeleton width={200} height={32} sx={{ mb: 3 }} />
    <Paper sx={styles.section}>
      <Box sx={styles.sectionHeader}>
        <Skeleton width={150} height={32} />
      </Box>
      <Divider />
      <Box sx={styles.sectionContent}>
        {[1, 2, 3].map((item) => (
          <Box key={item} sx={styles.applicationRow}>
            <Box sx={{ flex: 1 }}>
              <Skeleton height={24} width="60%" sx={{ mb: 1 }} />
              <Skeleton height={20} width="40%" />
            </Box>
            <Skeleton height={24} width={80} sx={{ borderRadius: '10px' }} />
          </Box>
        ))}
      </Box>
    </Paper>
  </Box>
);

export const PageSkeleton = () => (
  <Box sx={styles.pageWrapper}>
    <NavbarSkeleton />
    <Box sx={styles.contentContainer}>
      <Box sx={styles.root}>
        <Container>
          <Box sx={styles.contentWrapper}>
            <SidebarSkeleton />
            <Box sx={styles.mainContent}>
              <ContentSkeleton />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  </Box>
);
