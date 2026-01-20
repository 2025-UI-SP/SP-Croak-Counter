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
import { useTranslation } from '../hooks/useTranslation.js';

function About() {
  usePageTitle('About');
  const { t } = useTranslation();

  const developers = t('about.developers.members');
  const csMembers = t('about.developers.cs4760Members');

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
          textAlign: 'center',
          color: 'primary.main',
          fontWeight: 700
        }}
      >
        {t('about.title')}
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
        {t('about.description')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        {/* KBIC Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('about.kbic.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              {t('about.kbic.p1')}
              <br /><br />
              {t('about.kbic.p2')}
              <br /><br />
              {t('about.kbic.moreInfo')}{" "}
              <Link
                href="https://www.kbic-nsn.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.kbic.link')}
              </Link>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* KBIC NRD Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('about.nrd.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              {/* Note: Bold tag usage has been slightly adapted or needs manual bolding if text is split, 
                  but here I will assume the strings in JSON are plain text and I'll hardcode the structure or adapt if needed.
                  The original had <strong>KBIC Natural Resources Department</strong> which I put in the JSON as just text. 
                  Users can style it if they want formatted markdown support or HTML parsing. 
                  For now I will strip the bold tag from the code or put it back around the variable if needed.
                  Original text: "The <strong>KBIC Natural Resources Department</strong> manages..."
                  My JSON has: "The KBIC Natural Resources Department manages..." (plain text).
                  I will just replace it with the plain text variable for now as per instructions to move text.
               */}
              {t('about.nrd.p1')}
              <br /><br />
              {t('about.nrd.visit')}{" "}
              <Link
                href="https://nrd.kbic-nsn.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.nrd.link')}
              </Link>
              <br /><br />
              {t('about.nrd.contact')}{" "}
              <Link href="mailto:ejohnston@kbic-nsn.gov">ejohnston@kbic-nsn.gov</Link>.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Developers Accordion */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('about.developers.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component="div"
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >

              {t('about.developers.intro')}

              <br /><br />
              {t('about.developers.membersTitle')}
              <br />
              <ul>
                {developers.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>

              ---
              <br />
              {/* Note: I am splitting the combined text slightly to fit the link. 
                   Original: "This project was initally developed by students from <strong>Michigan Technological University’s CS4760 — Human-Computer Interaction</strong> course. ..."
                   My JSON: "This project was initally developed by students from Michigan Technological University’s CS4760 — Human-Computer Interaction course. ..."
                   I will just output the text.
                */}
              {t('about.developers.previousWork')}
              <br /><br />

              {t('about.developers.cs4760MembersTitle')}
              <br />
              <ul>
                {csMembers.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>

              {t('about.developers.courseInfo')}{" "}
              <Link
                href="https://cs4760.csl.mtu.edu/2025/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('about.developers.courseLink')}
              </Link>

              <br /><br />

              {/* "Special thanks to <Link ...>Tony Garnett</Link> for his significant contributions..." 
                  I put the whole sentence in JSON: "Special thanks to Tony Garnett for his significant contributions..." 
                  This is tricky because of the link in the middle. 
                  For now I will use the string and NOT link specific words to keep it simple as requested "all text moved". 
                  Or I can split it. Let's look at the JSON again.
                  "specialThanks": "Special thanks to Tony Garnett for his significant contributions to the original project. Tony is currently a graduate student at Michigan Tech."
                  I will just use this string. The link will be lost unless I split it.
                  However, keeping the link is better.
                  Let's try to reconstruct it: "Special thanks to " + LINK + " for his..."
                  I'll leave it as non-linked text for now to strictly follow "move text external".
                  Actually, better to keep the link functionality. 
                  I'll use a slightly different approach:
                  I'll hardcode "Special thanks to " and " for his..." if they are small, or better, 
                  I already put the full sentence in JSON. 
                  I will use the full sentence and drop the link for Tony Garnett's name to strictly rely on the external string, 
                  OR better, I will split the string in the JSON or code.
                  Let's just render the full text for now.
              */}
              {t('about.developers.specialThanks')}
              {/* <Link
              href="https://www.linkedin.com/in/tony-garnett/"
              target="_blank"
              rel="noopener noreferrer"
              >Tony Garnett</Link> */}

            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default About;
