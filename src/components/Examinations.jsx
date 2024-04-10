import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/ExaminationAction';
import * as patient_actions from '../actions/PatientAction';
import { Grid, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ExaminationForm from './ExaminationForm';
import ExaminationDialog from './ExaminationDialog';

const Examinations = ({ fetchAllExaminations, fetchPatientById, examinationsList, patientsList }) => {
  const [searchDate, setSearchDate] = useState('');
  const [searchPatient, setSearchPatient] = useState('');
  const [selectedExamination, setSelectedExamination] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [examinations, setExaminations] = useState([]);

  useEffect(() => {
    fetchAllExaminations();
  }, []);

  useEffect(() => {
    // Fetch patient information for each examination
      examinationsList.forEach((examination) => {
        console.log(examination)
        console.log("fetching patient with id: ", examination.patient_id)
        fetchPatientById(examination.patient_id);
      })
  }, [examinationsList]);

  useEffect(() => {
  // Associate fetched patient with each examination
    console.log("patientList changed", patientsList)
    const updatedExaminations = examinationsList.map((examination) => {
      return {
        ...examination,
        patient: patientsList.find((patient) => {
          console.log("ids: ", patient.id, examination.patient_id)
          return patient.id === examination.patient_id
        })
      };
    });
    console.log("Updated Examinations", updatedExaminations)
    setExaminations(updatedExaminations)

  // Now updatedExaminations contains examinations with associated patient information
}, [patientsList]);




  const handleItemClick = (examination) => {
    setSelectedExamination(examination);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filterExaminations = (examinations) => {
    return examinations.filter((examination) => {
      // Filter by date
      const examinationDate = examination.date;
      if (searchDate && examinationDate !== searchDate) {
        return false;
      }
      // Filter by patient
      let patient_data = ""
      if (examination.patient){

        patient_data = examination.patient.lastName + " " + examination.patient.name + " " +examination.patient.patronym

      }

      if (searchPatient && patient_data.toLowerCase().indexOf(searchPatient.toLowerCase()) === -1) {
        return false;
      }
      return true;
    });
  };

  const filteredExaminations = filterExaminations(examinations);

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        {/* Search fields */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by Date (MM/DD/YYYY)"
            variant="outlined"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by Patient Name"
            variant="outlined"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      {/* List of examination items */}
      <List>
        {filteredExaminations.map((examination, index) => (
          <ListItem key={index} button onClick={() => handleItemClick(examination)}>
            <ListItemText primary={examination.date} secondary={`${examination.patient ? examination.patient.lastName + " " + examination.patient.name + " " + examination.patient.patronym: " "}`} />
          </ListItem>
        ))}
      </List>
      {/* Dialog for detailed examination information */}
      <ExaminationDialog open={openDialog} onClose={handleCloseDialog} selectedExamination={selectedExamination} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  examinationsList: state.examination.list,
  patientsList: state.patient.list
});

const mapDispatchToProps = {
  fetchAllExaminations: actions.fetchAll,
  fetchPatientById: patient_actions.fetchById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Examinations);
