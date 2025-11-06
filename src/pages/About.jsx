import React from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Box,
  Link,
  ListItem
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
        Learn more about the Keweenaw Bay Indian Community, their Natural Resources Department, and the developers behind this project.
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
              The Keweenaw Bay Indian Community (KBIC) is a federally recognized Tribe and is signatory to the Treaties with the Chippewa of 1842 and 1854. 
              The members and descendants of the Tribe retain their right to fish, hunt, and gather throughout the ceded territory under the Treaty of 1842. 
              Established under the Treaty of 1854, the primary land base of the KBIC is the L'Anse Indian Reservation. KBIC also has land holdings in Ontonagon and Marquette Counties. 
              <br /><br />
              The L'Anse Indian Reservation consists of approximately 59,000 acres, which is heavily forested. This is a water-rich community, with approximately 23 miles of Lake Superior shoreline, 
              over 200 miles of streams and rivers, and close to 5,000 acres of inland lakes and wetlands. These diverse habitats sustain a healthy population of fish, wildlife, and plant species. 
              In addition to recognizing our Treaties with the Federal Government, we honor our First Treaty with all orders of creation, which includes our obligations and connections to the natural environment. 
              It is our responsibility to speak for those that do not have a voice in the Council of Men.
              <br /><br />
              For more information, visit the official website:{" "}
              <Link 
                href="https://www.kbic-nsn.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                KBIC Website
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* KBIC NRD Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>KBIC Natural Resources Department</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              The <strong>KBIC Natural Resources Department</strong> manages, protects, and restores the 
              natural resources within the KBIC reservation and surrounding areas. The NRD’s mission focuses on 
              environmental protection, wildlife conservation, fisheries enhancement, and maintaining ecological 
              balance for future generations.
              <br /><br />
              Visit the NRD's website to learn more about their ongoing projects and programs:{" "}
              <Link 
                href="https://nrd.kbic-nsn.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                KBIC NRD Website
              </Link>
              <br /><br />
              For questions, contact Erin at{" "}
              <Link href="mailto:ejohnston@kbic-nsn.gov">ejohnston@kbic-nsn.gov</Link>.
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

              This website was developed by students at Michigan Technological University participating in Senior Project, led
              by Professor Robert Pastel. 

              <br /><br />
              Project Members:
              <br />
              <ul>
                <li>Lucas Bohanon</li>
                <li>Maci Dostaler</li>
                <li>Peter Laakso</li>
                <li>Steven Maki</li>
                <li>Duncan McBride</li>
                <li>Simon Novak</li>
              </ul>

              ---
              <br />
              This project was initally developed by students from{" "}
              <strong>Michigan Technological University’s CS4760 — Human-Computer Interaction</strong> course. 
              The development team designed and implemented this system to enhance community engagement, promote 
              environmental awareness, and improve accessibility to KBIC and DNR resources.
              <br /><br />

              CS 4760 Team Members:
              <br />
              <ul>
                <li>Josiah Parrot - Product Owner</li>
                <li>Nolan Casey - Technical Lead</li>
                <li>Evan Bradford</li>
                <li>Hollis Aitkens</li>
                <li>Kristen Love</li>
                <li>Malakai Bundshuh</li>
                <li>Nick Abraham</li>
                <li>Tony Garnett (UX Consultant)</li>
              {/*We're missing people, but I don't have the full list. This is pulled from github*/}
              </ul>

              For more details about the course and student projects, visit:{" "}
              <Link 
                href="https://cs4760.csl.mtu.edu/2025/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                CS4760 Course Website
              </Link>

              <br /><br />

              Special thanks to <Link
              href="https://www.linkedin.com/in/tony-garnett/"
              target="_blank"
              rel="noopener noreferrer"
              >Tony Garnett</Link> for his significant contributions to the original project.
              Tony is currently a graduate student at Michigan Tech.

            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default About;
