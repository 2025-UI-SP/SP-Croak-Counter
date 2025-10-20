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
import calendar from "../assets/help_page/frogCallingZone4.JPG";

function Help() {
  usePageTitle('Help');
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
        Croak Counter Help Page
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
        Please refer to the resources below
      </Typography>
      
      <Box sx={{ mt: 4}}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>Calling Calendar</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
                sx={{fontSize: {xs: '1.125rem', sm: '1.25rem', md: '1.35rem'} }}
            >
              Here you can view the breeding periods of frogs in order to better narrow down what frog species you should be hearing during the given month.
              The Keweenaw area is located within Zone 4.
            </Typography>
            <br/>

            <img src={calendar} alt="Zone 4 Calling Calendar" style={{display: 'flex', width: '100%', height: 'auto'}}/>

          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>Ideal Environment</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
                sx={{fontSize: {xs: '1.125rem', sm: '1.25rem', md: '1.35rem'} }}
            >
              The survey is best taken in swampy environments where frogs are commonly found.
              However, surveying should not occur on evenings with lightning, heavy rain (though mist and light rain that does not affect hearing is fine),
              or when wind speeds are consistently greater than 12 mph (19 kmh). Surveying also should not occur when air temperatures are less than 42 degrees Fahrenheit (5.6 degrees Celsius).
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>Standard Procedure</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Typography variant="h5">
              <strong>Pre-Survey</strong>
            </Typography>
            <br/>
            <Typography sx={{fontSize: {xs: '1.125rem', sm: '1.25rem', md: '1.35rem'} }}>
              <strong>1. Scout the site. </strong>
              Obtain site maps and access instructions, including permission to enter private property.
              Select only sites with suitable habitat. Visit the site in the daytime prior to beginning surveys to familiarize yourself with the area.
              If you are surveying more than one site, change the order of the site visits with each survey,
              e.g., if there are 5 sites, survey 1-2-3-4-5 first, then 2-3-4-5-1, then 3-4-5-1-2, etc. If you intend to survey long-term,
              do not vary from initially selected sampling sites - monitor the same sites year after year.

              <br/>
              <strong>2. Survey effort. </strong>
              Surveys should be conducted approximately once per week. Select an evening when weather conditions are met.
              It is okay to miss one survey per month, but if more are missed, false absences may increase.

              <br/>
              <strong>3. Gas. </strong>
              Make sure any vehicles have enough gas to complete the routes.

              <br/>
              <strong>4. Safety. </strong>
              Tell someone where you are going before heading out for the evening. Enlist a partner whenever possible for safety.

              <br/>
              <strong>5. Equipment. </strong>
              Make sure you have all necessary equipment, including, but not limited to, a map, a flashlight,
              a stopwatch (or other time piece), a thermometer, a first aid kit, and proper clothing.

              <br/><br/><br/>
            </Typography>

            <Typography variant="h5">
              <strong>Survey Procedure</strong>
            </Typography>
            <br/>
            <Typography sx={{fontSize: {xs: '1.125rem', sm: '1.25rem', md: '1.35rem'} }}>
              <strong>1. </strong>
                Begin call surveys 30 minutes after sunset.

              <br/>
              <strong>2. </strong>
              At each call site, quietly wait 2-3 minutes after arriving at the listening post before starting the stopwatch for a 5-minute survey.
              During this time, expose the thermometer bulb to the air so it begins equalizing with the air temperature,
              and fill out the preliminary weather and time information on the data form. Start the survey, recording frogs heard.
              At the end of the 5 minutes, take the water temperature and fill in the remaining data.

              <br/>
              <strong>3. </strong>
              Listen to and record frogs from the wetland being monitored, but also record frogs heard in the distance as "distant" calls and note the direction.
              Distance calls are from other wetlands, not the one you are monitoring.

              <br/>
              <strong>4. </strong>
              Any time noise from passing vehicles, storms, etc. makes hearing impossible, elapsed time should be stopped on the stopwatch at the point of interruption
              and continued afterwards until the survey has been conducted for the full five minutes.

              <br/>
              <strong>5. </strong>
              You may record any birds or other wildlife detected in the Comments section, along with any comments or anything you think may have disturbed the survey.
              <br/><br/>
              <strong>Location Privacy Note: </strong>
              Upon opening the survey, your phone will ask for permission to access your current location. This is to ensure that we record the correct coordinates for the survey site. 

              <br/><br/><br/>
            </Typography>

            <Typography variant="h5">
              <strong>Post-Survey</strong>
            </Typography>
            <br/>
            <Typography sx={{fontSize: {xs: '1.125rem', sm: '1.25rem', md: '1.35rem'} }}>
              <strong>1. </strong>
              Store equipment. Place all wet equipment in a place where it can dry.

              <br/>
              <strong>2. </strong>
              Ensure the survey was successfully submitted. Congratulate yourself on a job well done!
            </Typography>

          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5"><strong>Frog Identification</strong></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{fontSize: {xs: '1.125rem', sm: '1.25rem', md: '1.35rem'} }}>
              All of the frog species that you may encounter in the Keweenaw area are listed in the Frog Identification page.
              Each species has a description, image, and audio clip of their call to help with identification.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

export default Help;


