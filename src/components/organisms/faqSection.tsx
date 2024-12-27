import Tag from '@/components/atoms/tag';
import CustomAccordion from '@/components/molecules/accordian';
import {
  Box,
  //  Button,
  Container,
  Typography
} from '@mui/material';
import React from 'react';
import questionIcon from '/public/assets/svg/message.svg';
import Title from '@/components/atoms/title';
import Image from 'next/image';
import upperWave from '/public/assets/svg/upper-wave.svg';
import lowerWave from '/public/assets/svg/lower-wave.svg';

const FAQSection = () => {
  return (
    <Box
      sx={{ backgroundColor: 'white', position: 'relative', py: 5 }}
      data-test-id="faq-section-root"
    >
      <Box
        sx={{ width: '100%', position: 'relative', height: 'auto' }}
        data-test-id="faq-section-upper-wave"
      >
        <Image
          src={upperWave}
          alt="upper wave"
          layout="responsive"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box
        sx={{ bgcolor: '#F4F7FF', pt: 4, mt: -2 }}
        data-test-id="faq-section-content"
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              p: 1,
              maxWidth: {
                lg: 550
              }
            }}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            maxWidth={500}
            data-test-id="faq-section-left-content"
          >
            <Tag
              bgWhite
              title="Got Question?"
              icon={questionIcon}
              data-test-id="faq-section-tag"
            />
            <Title
              title="Frequently Asked Questions"
              data-test-id="faq-section-title"
            />
            <Typography variant="h6" data-test-id="faq-section-description">
              We connect Students and University, initiating meaningful search
              that lead to a successful scholarship acquisitions.
            </Typography>
            {/* <Button
              sx={{
                mt: 4,
                display: {
                  xs: 'none',
                  sm: 'block'
                },
                px: 7
              }}
              variant="contained"
              data-test-id="faq-section-ask-question-button"
            >
              Ask Question
            </Button> */}
          </Box>
          <CustomAccordion />
        </Container>
      </Box>
      <Box
        sx={{ width: '100%', mt: -1, position: 'relative', height: 'auto' }}
        data-test-id="faq-section-lower-wave"
      >
        <Image
          src={lowerWave}
          alt="lower wave"
          layout="responsive"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </Box>
    </Box>
  );
};

export default FAQSection;
