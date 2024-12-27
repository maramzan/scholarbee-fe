'use client';
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { FAQ_DATA } from '@/constants';

const StyledAccordion = styled(Accordion)(() => ({
  backgroundColor: '#F4F7FF',
  boxShadow: 'none',
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 0
  },
  '& .MuiAccordionSummary-root': {
    padding: '0 16px',
    '&.Mui-expanded': {
      minHeight: '48px'
    }
  },
  '& .MuiAccordionSummary-content': {
    margin: '12px 0',
    '&.Mui-expanded': {
      margin: '12px 0'
    }
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  backgroundColor: '#F4F7FF',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#0B3C95',
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s ease-in-out'
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)'
  },
  '& .MuiAccordionSummary-content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  }
}));

const StyledAccordionDetails = styled(AccordionDetails)(() => ({
  backgroundColor: '#F4F7FF',
  padding: '8px 16px 16px'
}));

const CustomAccordion = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box sx={{ maxWidth: 600, mt: 4 }}>
      {FAQ_DATA.map((item) => (
        <StyledAccordion
          key={item.id}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
          data-test-id={`accordion-${item.id}`}
        >
          <StyledAccordionSummary
            expandIcon={<ArrowCircleDownIcon />}
            data-test-id={`accordion-summary-${item.id}`}
          >
            <Typography variant="h6" fontWeight="500">
              {item.question}
            </Typography>
          </StyledAccordionSummary>
          <StyledAccordionDetails data-test-id={`accordion-details-${item.id}`}>
            <Typography variant="body2">{item.answer}</Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default CustomAccordion;
