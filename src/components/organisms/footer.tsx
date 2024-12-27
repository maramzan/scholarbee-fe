import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image';
import Link from 'next/link';
import facebookIcon from '/public/assets/svg/facebook.svg';
import instagramIcon from '/public/assets/svg/instagram.svg';
import linkedInIcon from '/public/assets/svg/linkedin.svg';
import footerBgTexture from '/public/assets/svg/footer-texture.svg';
import { FOOTER_LINKS } from '@/constants';
import logo from '/public/assets/svg/logo-white.svg';

const Footer = () => {
  return (
    <Box
      sx={{
        color: 'white',
        py: 5,
        backgroundImage: `url(${footerBgTexture.src})`,
        backgroundColor: '#0B3C95',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      data-test-id="footer"
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} pt={1}>
            <Image src={logo} height={25} width={135} alt="logo" />
            <Typography
              variant="body1"
              sx={{ mt: 2.5 }}
              data-test-id="footer-description"
            >
              ScholarBee is a digital platform designed to help students find
              the best universities from all over the world.
            </Typography>
            <Box
              sx={{ mt: 2, display: 'flex', gap: 3 }}
              data-test-id="footer-social-links"
            >
              <Link
                href="https://www.facebook.com/profile.php?id=61565762532814"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  height={25}
                  width={25}
                  src={facebookIcon}
                  alt="facebook"
                />
              </Link>
              <Link
                href="https://www.instagram.com/scholarbee.ai/"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  height={25}
                  width={25}
                  src={instagramIcon}
                  alt="instagram"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/company/scholarbee/"
                passHref
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  height={25}
                  width={25}
                  src={linkedInIcon}
                  alt="Linked In"
                />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <FooterSection
                  title="Partners"
                  items={['Riphah International', 'FAST', 'COMSATS']}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FooterSection title="Links" items={['Home', 'Programs']} />
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <FooterSection
                  title="Contact us"
                  items={[
                    'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E',
                    'Call Us: +92 303 5686116',
                    'info@scholarbee.pk'
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 5,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            pt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Box>
            <Link
              href="#"
              style={{ color: 'inherit', textDecoration: 'none' }}
              passHref
            >
              <Typography
                sx={{ mb: { xs: 2, sm: 0 } }}
                color="inherit"
                data-test-id="footer-privacy-policy"
                component="span"
              >
                Privacy policy
              </Typography>
            </Link>
            <Link
              style={{ color: 'inherit', textDecoration: 'none' }}
              href="#"
              passHref
            >
              <Typography
                sx={{
                  mb: { xs: 2, sm: 0 },
                  ml: 4
                }}
                data-test-id="footer-terms-of-service"
                component="span"
              >
                Terms of service
              </Typography>
            </Link>
          </Box>

          <Typography
            sx={{ mt: { xs: 3, sm: 0 } }}
            variant="body2"
            color="inherit"
            data-test-id="footer-copyright"
          >
            © Copyright 2024 - ScholarBee
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const FooterSection = ({
  title,
  items
}: {
  title: string;
  items: string[];
}) => {
  const renderItems = () => {
    if (title === 'Links') {
      return FOOTER_LINKS.map((link, index) => (
        <ListItem sx={{ mt: 3 }} key={index} disablePadding>
          <Link
            href={link.link}
            style={{ color: 'inherit', textDecoration: 'none' }}
            passHref
          >
            <Typography
              sx={{ cursor: 'pointer' }}
              fontWeight="regular"
              variant="body1"
              color="inherit"
            >
              {link.title}
            </Typography>
          </Link>
        </ListItem>
      ));
    } else {
      return items.map((item, index) => (
        <ListItem sx={{ mt: 3 }} key={index} disablePadding>
          <Typography fontWeight="regular" variant="body1">
            {item}
          </Typography>
        </ListItem>
      ));
    }
  };

  return (
    <>
      {/* mobile view */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Accordion
          sx={{ bgcolor: 'transparent', color: 'white', boxShadow: 'none' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          >
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>{renderItems()}</List>
          </AccordionDetails>
        </Accordion>
      </Box>
      {/* web view */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <List>{renderItems()}</List>
      </Box>
    </>
  );
};

export default Footer;
