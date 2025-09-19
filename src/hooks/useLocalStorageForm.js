import { useState, useEffect } from 'react';

export const useLocalStorageForm = (key, initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [lastSaved, setLastSaved] = useState(null);
  const [errors, setErrors] = useState({});

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error('Could not load saved form data');
      }
    }
  }, [key]);

  // Auto save after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(formData));
      setLastSaved(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, key]);

  const updateField = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const setFieldErrors = (newErrors) => {
    setErrors(newErrors);
  };

  const clearForm = (message = 'Clear form?') => {
    if (window.confirm(message)) {
      localStorage.removeItem(key);
      setFormData(initialState);
      setLastSaved(null);
      setErrors({});
      return true;
    }
    return false;
  };

  return {
    formData,
    lastSaved,
    errors,
    updateField,
    setFieldErrors,
    clearForm
  };
};