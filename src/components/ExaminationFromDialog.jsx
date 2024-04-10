import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ExaminationForm from './ExaminationForm';

const ExaminationFormDialog = ({ open, onClose, patient_id }) => {
  const handleClose = () => {
    onClose();
  };

  const handleAddExamination = () => {
    // Logic to handle adding examination
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Examination</DialogTitle>
      <DialogContent>
        <ExaminationForm onSubmit={handleAddExamination} onCancel={handleClose} patient_id={patient_id}/>
      </DialogContent>
    </Dialog>
  );
};

export default ExaminationFormDialog;