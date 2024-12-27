import Navbar from '../components/organisms/muiNavbar';
import PartnersSection from '../components/organisms/partnersSection';
import { Box } from '@mui/material';
import ProgramSection from './(pageComponents)/programSection';
import StatsSection from '../components/organisms/statsSection';
import BlogsSection from '../components/organisms/blogsSection';
import LearnMoreSection from '../components/organisms/learnMoreSection';
import HeroSection from './(pageComponents)/heroSection';
import FAQSection from '../components/organisms/faqSection';
import ContactUsSection from '../components/organisms/contactUsSection';
import FooterComponent from '@/components/organisms/footer';
import ReviewsSections from '@/components/organisms/reviewsSections';
import FeaturedScholarshipSection from './(pageComponents)/featuredScholarshipSection';
import { GoogleAnalytics } from '@next/third-parties/google';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: '#F4F7FF' }}>
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <ProgramSection />
      <StatsSection />
      <FeaturedScholarshipSection />
      <ReviewsSections />
      <LearnMoreSection />
      <BlogsSection />
      <FAQSection />
      <ContactUsSection />
      <FooterComponent />
      <GoogleAnalytics gaId="G-EDLBJ03Y1C" />
    </Box>
  );
};

export default Home;
