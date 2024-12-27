import Navbar from '@/components/organisms/muiNavbar';
import PartnersSection from '@/components/organisms/partnersSection';
import LearnMoreSection from '@/components/organisms/learnMoreSection';
import FAQSection from '@/components/organisms/faqSection';
import ContactUsSection from '@/components/organisms/contactUsSection';
import FooterComponent from '@/components/organisms/footer';
import ReachUsSection from './pageComponents/reactUsSection';
import HeroSection from './pageComponents/heroSection';

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ReachUsSection />
      <LearnMoreSection />
      <FAQSection />
      <PartnersSection />
      <ContactUsSection />
      <FooterComponent />
    </>
  );
};

export default ContactUs;
