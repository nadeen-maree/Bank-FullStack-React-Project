import React from 'react';
import { Snackbar } from '@mui/material';

const SnackbarMessage = ({ open, message, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
};

export default SnackbarMessage;
