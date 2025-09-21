import React from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { joinPageContent } from "../config";

// Join page component for displaying membership information and steps
const Join = () => {
  // Set page title using custom hook
  usePageTitle();

  return (
    // Main container with responsive top and bottom margins
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Box display="flex" justifyContent="center">
        {/* Responsive width adjustment for content box */}
        <Box sx={{ width: { xs: "100%", md: "90%", lg: "80%" } }}>
          <Paper
            elevation={3}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 4,
              mx: { xs: 2, md: 4 },
            }}
          >
            {/* Page Title */}
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", md: "3.25rem" },
                mb: 3,
              }}
            >
              {joinPageContent.title}
            </Typography>

            {/* Introductory Text */}
            <Typography
              variant="h6"
              component="p"
              sx={{
                maxWidth: "65ch",
                mx: "auto",
                mb: 4,
                color: "text.secondary",
              }}
            >
              {joinPageContent.intro}
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Steps to Join Section */}
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                mb: 4,
              }}
            >
              Follow These Steps to Join
            </Typography>

            {/* Grid of step cards */}
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
              {joinPageContent.steps.map((step, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    elevation={2}
                    sx={{
                      flex: 1,
                      maxWidth: 280,
                      width: "100%",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        height: "100%",
                      }}
                    >
                      {/* Step number circle */}
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          mb: 2,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        Step {idx + 1}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {step}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Contact Information */}
            <Box
              sx={{
                mb: 4,
                color: "text.secondary",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              {joinPageContent.contact.map((line, idx) => {
                // Format phone number to prevent wrapping
                const formattedLine = line.replace(
                  /(906-524-5757 ext\. 4227)/,
                  '<span style="white-space: nowrap;">$1</span>'
                );

                return (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{
                      mb: idx !== joinPageContent.contact.length - 1 ? 1.5 : 0,
                    }}
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Call to Action Button */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                href={joinPageContent.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 6,
                  px: 4,
                  fontWeight: 700,
                  "&:hover": { color: "white" },
                }}
              >
                {joinPageContent.websiteLabel}
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Join;