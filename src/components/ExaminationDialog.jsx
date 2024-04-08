import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, styled} from "@mui/material";
import ExaminationForm from './ExaminationForm';


const ExaminationDialog = ({ open, onClose, selectedExamination}) => {

  const handleClose = () => {
    onClose();
  };

  return (
  <Dialog open={open} onClose={handleClose}>
    {selectedExamination && (
      <>
        <DialogTitle>Examination Details</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Blood Test</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Reference Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {Object.keys(referentValues).map(parameter => (
                <TableRow key={parameter} style={{ backgroundColor: isOutsideReferentValue(parameter, selectedExamination[parameter]) ? 'lightcoral' : 'inherit' }}>
                  <TableCell>{parameter}</TableCell>
                  <TableCell>{selectedExamination[parameter]}</TableCell>
                  <TableCell>{referentValues[parameter].join(' - ')}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </>
    )}
  </Dialog>
  )};

  const referentValues = {
    createnin: [0, 10],
    glucose: [70, 140],
    glucosed_hymoglobin: [4, 6],
    homocystein: [5, 15],
    c_reactive_protein: [0, 5],
    cholesterol: [100, 200]
    // Add more blood test parameters and their referent values as needed
  };

  const isOutsideReferentValue = (parameter, value) => {
    const [min, max] = referentValues[parameter];
    return value < min || value > max;
  };

  export default ExaminationDialog;