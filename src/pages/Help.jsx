import React from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePageTitle } from '../hooks/usePageTitle.js';

function Help() {
  usePageTitle('Help');
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Typography 
        variant="h3" 
        component="h2" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
        }}
      >
        Help
      </Typography>
      <Typography 
        variant="h5" 
        component="p" 
        color="text.secondary" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
        }}
      >
        Put something here
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Lorem Ipsum</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
              odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
              quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Lorem Ipsum</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
              consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla
              sed consectetur. Vestibulum id ligula porta felis euismod semper.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Lorem Ipsum</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo
              risus, porta ac consectetur ac, vestibulum at eros. Curabitur blandit
              tempus porttitor. Donec sed odio dui. Nullam quis risus eget urna
              mollis ornare vel eu leo.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Lorem Ipsum</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed
              diam eget risus varius blandit sit amet non magna. Etiam porta sem
              malesuada magna mollis euismod. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default Help;


