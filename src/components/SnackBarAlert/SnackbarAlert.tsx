import React from 'react'
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material'

interface SnackbarState {
  open: boolean;
  mensagem: string;
  severity: 'error' | 'info' | 'success' | 'warning' | undefined;
}

interface SnackbarProps {
  state: SnackbarState;
  setState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

const SnackbarAlert: React.FC<SnackbarProps> = ({ state, setState }) => {
  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <Snackbar
      open={state.open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
      onClose={handleClose}
      data-cy='snackbar-form'
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {state.mensagem}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
