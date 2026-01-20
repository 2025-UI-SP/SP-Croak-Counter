import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
            <Box display="flex" justifyContent="center">
                <Box sx={{ width: { xs: '100%', md: '90%', lg: '80%' } }}>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 5,
                            textAlign: 'center',
                            borderRadius: 4,
                            mx: { xs: 2, md: 4 }
                        }}
                    >
                        <Typography
                            variant="h1"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '4rem', md: '6rem' },
                                color: 'primary.main',
                                fontWeight: 700
                            }}
                        >
                            {t('notfound.title')}
                        </Typography>
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            sx={{
                                mb: 3,
                                color: 'text.secondary'
                            }}
                        >
                            {t('notfound.subtitle')}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 4,
                                fontSize: '1.2rem',
                                color: 'text.secondary'
                            }}
                        >
                            {t('notfound.message')}
                        </Typography>
                        <Button
                            component={Link}
                            to="/"
                            variant="contained"
                            size="large"
                            sx={{
                                borderRadius: 6,
                                px: 4,
                                textTransform: 'none',
                                fontSize: '1.1rem'
                            }}
                        >
                            {t('notfound.button')}
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default NotFound;
