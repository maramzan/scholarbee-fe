import { ContactUs } from '@/types';
import { Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const ContactUsCard = ({
  focused,
  contact
}: {
  focused?: boolean;
  contact: ContactUs;
}) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        px: 3,
        py: 2,
        borderRadius: '12px',
        boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.05)',
        maxWidth: '340px',
        margin: '0 auto',
        backgroundColor: focused ? '#0B3C95' : 'white'
      }}
    >
      <Box>
        <Typography variant="body1" {...(focused && { color: 'white' })}>
          {contact.title}
        </Typography>
        <Typography
          {...(focused && { color: 'white' })}
          fontSize={13}
          mt={2}
          variant="body1"
        >
          {contact.description}
        </Typography>
        <Box
          sx={{
            backgroundColor: focused ? 'white' : 'transparent',
            p: '11px 22px',
            borderRadius: '48px',
            border: '1px solid #0B3C95',
            mt: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: 'fit-content'
          }}
        >
          {contact.buttonIcon && (
            <Image
              src={contact.buttonIcon}
              alt="Button Icon"
              height={16}
              width={16}
            />
          )}
          <Typography color="primary" ml={1} variant="body1">
            {contact.buttonText}
          </Typography>
        </Box>
      </Box>
      <Image src={contact.icon} alt="Call Us Icon" height={48} width={48} />
    </Paper>
  );
};

export default ContactUsCard;
