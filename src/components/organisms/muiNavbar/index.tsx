'use client';
import theme from '@/utils/theme';
import Link from 'next/link';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { pages } from '@/constants';
import {
  Avatar,
  Container,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import userContained from '/public/assets/svg/user-outlined.svg';
import Image from 'next/image';
import logo from '/public/assets/svg/logo.svg';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useLogout } from '@/hooks/useLogout';

interface Props {
  readonly window?: () => Window;
}

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url?: string;
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const theme = useTheme();
  const isXsOrSm = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  React.useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUserData(JSON.parse(userCookie));
    }
  }, []);

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  const drawer = React.useMemo(
    () => (
      <Box
        onClick={handleDrawerToggle}
        sx={{ textAlign: 'center', paddingY: 1 }}
        data-test-id="drawer"
      >
        <Image src={logo} height={25} width={135} alt="logo" />
        <Divider />
        <List>
          {pages.map((item) => (
            <ListItem key={item.title} disablePadding>
              <Link
                href={`${item.link.toLowerCase()}`}
                style={{
                  width: '100%',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  data-test-id={`drawer-item-${item}`}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          {userData && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText
                  primary="Logout"
                  sx={{ color: theme.palette.error.main }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    ),
    [handleDrawerToggle, handleLogout, userData, theme.palette.error.main]
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const renderUserProfile = () => {
    if (!userData) return null;

    return (
      <Box display="flex" ml={4} alignItems="center">
        <Link
          href="/profile"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
            <Avatar
              src={userData.profile_image_url}
              sx={{
                width: 48,
                height: 48,
                backgroundColor: '#E8ECF4'
              }}
            >
              {!userData.profile_image_url && (
                <Image
                  src={userContained}
                  alt="avatar icon"
                  width={32}
                  height={32}
                  style={{ padding: 0, margin: 0, display: 'block' }}
                />
              )}
            </Avatar>
            <Stack ml={1.5}>
              <Box display="flex" alignItems="center">
                <Typography color="primary" variant="body1">
                  {`${userData.first_name} ${userData.last_name}`}
                </Typography>
              </Box>
              <Typography fontSize={10} variant="body2">
                {userData.email}
              </Typography>
            </Stack>
          </Box>
        </Link>
      </Box>
    );
  };

  return (
    <>
      <AppBar component="nav" sx={classes.root} data-test-id="app-bar">
        <Container disableGutters>
          <Toolbar sx={classes.justifyBetween}>
            <Link
              href="/"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              passHref
            >
              <Image
                src={logo}
                height={isXsOrSm ? 25 : 44}
                width={isXsOrSm ? 135 : 235}
                alt="logo"
              />
            </Link>

            <Box display="flex" component="nav">
              <Box
                sx={{ display: { xs: 'none', md: 'block' } }}
                data-test-id="desktop-nav"
              >
                <Box display="flex" alignItems="center">
                  {pages.map((item) => {
                    const isActive = pathname === item.link;
                    return (
                      <Link
                        href={`${item.link.toLowerCase()}`}
                        key={item.title}
                        passHref
                      >
                        <Button
                          sx={{
                            ...classes.navItem,
                            color: isActive
                              ? theme.palette.primary.main
                              : theme.palette.text.primary
                          }}
                          data-test-id={`nav-item-${item}`}
                        >
                          {item.title}
                        </Button>
                      </Link>
                    );
                  })}
                  {renderUserProfile()}
                </Box>
              </Box>

              {!userData && (
                <Link href="/login" style={{ textDecoration: 'none' }} passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      ...classes.getStartedBtn,
                      display: { xs: 'block', sm: 'block' }
                    }}
                    data-test-id="get-started-btn"
                  >
                    Login
                  </Button>
                </Link>
              )}

              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 2, display: { md: 'none' } }}
                data-test-id="menu-icon"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={classes.drawer}
          data-test-id="mobile-drawer"
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

const classes = {
  root: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    py: '10px',
    position: 'relative'
  },
  logoText: {
    flexGrow: { xs: 1, md: 0 },
    fontWeight: 800,
    fontSize: {
      xs: '16px',
      sm: '24px'
    },
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  justifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuIcon: {
    display: { md: 'none' },
    color: {
      xs: theme.palette.text.primary,
      md: theme.palette.primary.main
    }
  },
  drawer: {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      maxWidth: 320,
      width: '100%'
    }
  },
  getStartedBtn: {
    ml: 1,
    py: {
      xs: '10px'
    }
  },
  navItem: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'transparent'
    }
  }
};
