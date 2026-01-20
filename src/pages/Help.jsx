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
import { useTranslation } from '../hooks/useTranslation.js';
import calendar from "../assets/help_page/frogCallingZone4.JPG";

function Help() {
  usePageTitle('Help');
  const { t } = useTranslation();

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
        {t('help.title')}
      </Typography>
      <Typography
        variant="h5"
        component="p"
        color="text.secondary"
        gutterBottom
        sx={{
          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
          textAlign: 'center',
          mb: 2
        }}
      >
        {t('help.subtitle')}
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('help.calendar.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              {t('help.calendar.description')}
            </Typography>
            <br />

            <img src={calendar} alt={t('help.calendar.altText')} style={{ display: 'flex', width: '100%', height: 'auto' }} />

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('help.environment.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}
            >
              {t('help.environment.description')}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('help.procedure.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Typography variant="h5">
              <strong>{t('help.procedure.preSurvey.title')}</strong>
            </Typography>
            <br />
            <Typography sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}>
              <strong>{t('help.procedure.preSurvey.step1')}</strong>
              <br /><br />
              <strong>{t('help.procedure.preSurvey.step2')}</strong>
              <br /><br />
              <strong>{t('help.procedure.preSurvey.step3')}</strong>
              <br /><br />
              <strong>{t('help.procedure.preSurvey.step4')}</strong>
              <br /><br />
              <strong>{t('help.procedure.preSurvey.step5')}</strong>
              <br /><br /><br />
            </Typography>

            <Typography variant="h5">
              <strong>{t('help.procedure.surveyProcedure.title')}</strong>
            </Typography>
            <br />
            <Typography sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}>

              <strong>{t('help.procedure.surveyProcedure.step1')}</strong>

              <br /><br />
              <strong>{t('help.procedure.surveyProcedure.step2')}</strong>

              <br /><br />
              <strong>{t('help.procedure.surveyProcedure.step3')}</strong>

              <br /><br />
              <strong>{t('help.procedure.surveyProcedure.step4')}</strong>

              <br /><br />
              <strong>{t('help.procedure.surveyProcedure.step5')}</strong>

              <br /><br />
              <strong>{t('help.procedure.surveyProcedure.step6')}</strong>

              <br /><br /><br />
            </Typography>

            <Typography variant="h5">
              <strong>{t('help.procedure.postSurvey.title')}</strong>
            </Typography>
            <br />
            <Typography sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}>
              <strong>{t('help.procedure.postSurvey.step1')}</strong>

              <br /><br />
              <strong>{t('help.procedure.postSurvey.step2')}</strong>
            </Typography>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>{t('help.identification.title')}</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.35rem' } }}>
              {t('help.identification.description')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default Help;


