import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  Slider, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  PlayArrow, 
  Pause
} from '@mui/icons-material';

const AudioPlayer = ({ src }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle seek
  const handleSeek = (event, newValue) => {
    if (audioRef.current) {
      const newTime = (newValue / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };
    
    const handlePause = () => setIsPlaying(false);

    const handleError = () => {
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlayThrough = () => {
      setIsLoading(false);
    };

    // Reset state when src changes
    setIsLoading(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    // Set src and add event listeners
    audio.src = src;
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Force load with a small delay
    // Fix for audio not loading when switching tabs
    const delay = Math.floor(Math.random() * 100);
    const loadTimer = setTimeout(() => {
      if (audio && audio.src === src) {
        audio.load();
      }
    }, delay);

    return () => {
      clearTimeout(loadTimer);
      // Pause and reset audio when cleaning up
      audio.pause();
      audio.src = '';
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [src]);


  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 1,
      }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
      />

      {/* Main controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* Play/Pause button */}
        <IconButton
          onClick={togglePlayPause}
          disabled={isLoading}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '&:disabled': {
              bgcolor: 'action.disabled',
              color: 'action.disabled',
            },
            width: 40,
            height: 40,
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        {/* Time display */}
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80, fontSize: '0.875rem' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>

        {/* Progress bar - Made much wider */}
        <Box sx={{ flex: 1, mx: 2 }}>
          <Slider
            value={progress}
            onChange={handleSeek}
            disabled={isLoading || duration === 0}
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
              },
              '& .MuiSlider-track': {
                height: 6,
              },
              '& .MuiSlider-rail': {
                height: 6,
                opacity: 0.3,
              },
            }}
          />
        </Box>

      </Box>

      {/* Loading indicator - only show when actually loading and not ready */}
      {isLoading && duration === 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block', mt: 1 }}>
          Loading audio...
        </Typography>
      )}
    </Box>
  );
};

export default AudioPlayer;
