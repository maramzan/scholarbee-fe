'use client';
import React, { Suspense, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Container,
  Alert,
  Skeleton
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Footer from '@/components/organisms/footer';
import { useLogout } from '@/hooks/useLogout';
import { useGetUserApplicationsQuery } from '@/redux/api/applicationApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { format } from 'date-fns';
import ProfileInformation from './profileInformation';
import { Application, ApplicationListProps, SidebarItem } from './types';
import {
  ContentSkeleton,
  NavbarSkeleton,
  PageSkeleton
} from './pageComponents';
import { styles } from './styles';
import Navbar from '@/components/organisms/muiNavbar';
import { getStatusColor } from '@/utils/helperFunctions';

const ErrorMessage = ({ message }: { message: string }) => (
  <Alert severity="error" sx={{ m: 2 }}>
    {message}
  </Alert>
);

const ApplicationSkeleton = () => (
  <Box sx={styles.sectionContent}>
    <Box sx={styles.applicationRow}>
      <Box sx={{ flex: 1 }}>
        <Skeleton height={24} width="60%" sx={{ mb: 1 }} />
        <Skeleton height={20} width="40%" />
      </Box>
      <Skeleton
        height={24}
        width={80}
        sx={{
          borderRadius: '10px'
        }}
      />
    </Box>
  </Box>
);

const ApplicationsList = ({
  applications,
  getStatusColor,
  isLoading
}: ApplicationListProps) => {
  if (isLoading) {
    return (
      <>
        <ApplicationSkeleton />
        <ApplicationSkeleton />
        <ApplicationSkeleton />
      </>
    );
  }

  if (!applications?.length) {
    return (
      <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
        No applications found. Start by applying to a program.
      </Typography>
    );
  }

  return applications.map((application: Application) => (
    <Box key={application?.id} sx={styles.sectionContent}>
      <Box sx={styles.applicationRow}>
        <Box>
          <Typography fontSize={16} fontWeight={600}>
            {application?.program?.name}
          </Typography>
          <Typography variant="body2" fontSize={14} fontStyle="italic">
            {format(new Date(application?.submission_date), 'dd MMMM, yyyy')}
          </Typography>
        </Box>
        <Box
          sx={{
            ...styles.statusPending,
            bgcolor: getStatusColor(application?.status)
          }}
        >
          {application?.status}
        </Box>
      </Box>
    </Box>
  ));
};

const Sidebar = ({ items }: { items: SidebarItem[] }) => (
  <Box sx={styles.sidebar}>
    <List>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <ListItem
            key={index}
            sx={item.active ? styles.activeListItem : styles.listItem}
            onClick={item.onClick}
            style={{ cursor: 'pointer' }}
          >
            <ListItemIcon sx={item.active ? styles.activeIcon : styles.icon}>
              <Icon />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={item.active ? styles.activeText : styles.listItemText}
            />
          </ListItem>
        );
      })}
    </List>
  </Box>
);

const ApplicationStatusPage = () => {
  const { handleLogout } = useLogout();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('applications');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: applicationsData,
    isLoading,
    error
  } = useGetUserApplicationsQuery(user?.id || '', {
    skip: !user?.id || !isClient,
    refetchOnMountOrArgChange: true
  });

  const sidebarItems = [
    {
      icon: DescriptionOutlinedIcon,
      text: 'Application Status',
      active: activeSection === 'applications',
      onClick: () => setActiveSection('applications')
    },
    {
      icon: PersonOutlineIcon,
      text: 'Profile Information',
      active: activeSection === 'profile',
      onClick: () => setActiveSection('profile')
    },
    {
      icon: LogoutIcon,
      text: 'Logout',
      active: false,
      onClick: handleLogout
    }
  ];

  const renderApplications = () => {
    if (error)
      return (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load applications'
          }
        />
      );
    return (
      <Paper sx={styles.section}>
        <Box sx={styles.sectionHeader}>
          <Typography variant="h6" sx={styles.sectionTitle}>
            Admissions
          </Typography>
        </Box>
        <Divider />
        <ApplicationsList
          applications={applicationsData?.docs || []}
          getStatusColor={getStatusColor}
          isLoading={isLoading}
        />
      </Paper>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'applications':
        return renderApplications();
      case 'profile':
        return <ProfileInformation />;
      default:
        return renderApplications();
    }
  };

  if (!isClient) {
    return <PageSkeleton />;
  }

  return (
    <Box sx={styles.pageWrapper}>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <Box sx={styles.contentContainer}>
        <Box sx={styles.root}>
          <Container>
            <Box sx={styles.contentWrapper}>
              <Sidebar items={sidebarItems} />
              <Box sx={styles.mainContent}>
                <Suspense fallback={<ContentSkeleton />}>
                  {renderContent()}
                </Suspense>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ApplicationStatusPage;
