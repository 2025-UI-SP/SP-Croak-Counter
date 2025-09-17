import React from "react";
import { joinPageContent } from "../config";
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText } from "@mui/material";

const Join = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 10, md: 14 }, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, textAlign: "center" }}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          {joinPageContent.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {joinPageContent.intro}
        </Typography>
        <List sx={{ textAlign: "left", maxWidth: 400, mx: "auto", mb: 2 }}>
          {joinPageContent.steps.map((step, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {joinPageContent.contact}
        </Typography>
        <Box>
          <Button
            href={joinPageContent.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            size="large"
            sx={{
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: 2,
              px: 2,
              backgroundColor: 'success.main',
              color: 'white',
              minWidth: 0,
              '&:hover': {
                backgroundColor: 'success.dark',
                color: 'white'
              }
            }}
          >
            {joinPageContent.websiteLabel}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Join;
