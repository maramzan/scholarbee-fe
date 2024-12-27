import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from '@/utils/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReduxProvider from '../redux/reduxProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';

export const metadata: Metadata = {
  title: 'Scholarbee',
  description: 'Shaping Future'
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale }
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <CssBaseline />
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReduxProvider>{children}</ReduxProvider>
          </ThemeProvider>
          <ToastContainer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
