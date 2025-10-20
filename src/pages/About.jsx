import React from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box,
  Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePageTitle } from '../hooks/usePageTitle.js';

function About() {
  usePageTitle('About');
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Typography 
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
          textAlign: 'center'
        }}
      >
        About This Project
      </Typography>

      <Typography 
        variant="h5" 
        component="p" 
        color="text.secondary" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
          textAlign: 'center'
        }}
      >
        Learn more about the Keweenaw Bay Indian Community (KBIC), their Department of Natural Resources (DNR), and the developers behind this project.
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        {/* KBIC Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>Keweenaw Bay Indian Community (KBIC)</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              The <strong>Keweenaw Bay Indian Community (KBIC)</strong> is a federally recognized Native American tribe 
              located in Michigan’s Upper Peninsula. The community is dedicated to preserving its rich cultural heritage, 
              protecting its natural resources, and supporting the well-being of its members through programs that emphasize 
              education, environmental stewardship, and sustainable development.
              <br /><br />
              For more information, visit the official documentation:{" "}
              <Link 
                href="https://docs.google.com/document/d/1pXOYjwFcwWBPmFB5Dk2TXa9guVWlfPmsg7TfIZZoe9Y/edit?tab=t.0#heading=h.qlly7uutob1m" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                KBIC Overview
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* KBIC DNR Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>KBIC Department of Natural Resources (DNR)</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              The <strong>KBIC Department of Natural Resources (DNR)</strong> manages, protects, and restores the 
              natural resources within the KBIC reservation and surrounding areas. The DNR’s mission focuses on 
              environmental protection, wildlife conservation, fisheries enhancement, and maintaining ecological 
              balance for future generations.
              <br /><br />
              Visit the DNR website to learn more about their ongoing projects and programs:{" "}
              <Link 
                href="https://nrd.kbic-nsn.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                KBIC DNR Website
              </Link>
              <br />
              For questions, contact Erin at{" "}
              <Link href="mailto:erin@nrd.kbic-nsn.gov">erin@nrd.kbic-nsn.gov</Link>.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Developers Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>Developers</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              This project was developed by students from{" "}
              <strong>Michigan Technological University’s CS4760 — Human-Computer Interaction</strong> course. 
              The development team designed and implemented this system to enhance community engagement, promote 
              environmental awareness, and improve accessibility to KBIC and DNR resources.
              <br /><br />
              For more details about the course and student projects, visit:{" "}
              <Link 
                href="https://cs4760.csl.mtu.edu/2025/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                CS4760 Course Website
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default About;
