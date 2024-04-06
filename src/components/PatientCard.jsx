import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ExaminationFormDialog from "./ExaminationFromDialog";



const PatientCard = (record) => {
    var md5 = require('md5');
    const { id, name, lastName, patronym, birthday, gender, insurance_account_number, medcial_insurance_number} = record.patient;

    const avatarUrl = `https://www.gravatar.com/avatar/${md5(name+lastName+birthday)}?d=identicon&s=150`;

    const [openAddExaminationDialog, setOpenAddExaminationDialog] = useState(false);

    const handleOpenAddExaminationDialog = () => {
        setOpenAddExaminationDialog(true);
    };

    const handleCloseAddExaminationDialog = () => {
        setOpenAddExaminationDialog(false);
    };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }} >
      <CardContent>
        <Avatar alt={name} src={avatarUrl} sx={{ width: 100, height: 100, marginRight: 2 }} />
        <Typography variant="h5" component="h2">
          {name} {lastName} {patronym}
        </Typography>
        <Typography  color="textSecondary" sx={{ mb: 1.5 }} gutterBottom>
            Birthday: {birthday} 
        </Typography>
        <Typography  color="textSecondary" sx={{ mb: 1.5 }}  gutterBottom>
            gender: {gender} 
        </Typography>
        <Typography  color="textSecondary" sx={{ mb: 1.5 }}  gutterBottom>
            Insurance Account Number: {insurance_account_number} 
        </Typography>
        <Typography  color="textSecondary" gutterBottom>
            Medical insurance number: {medcial_insurance_number} 
        </Typography>

        <Button component={Link} to={`/examinations/${id}`} variant="contained" color="primary" style={{ marginRight: '10px', marginTop: '10px' }}>
            <ViewListIcon /> View Examinations
          </Button>
          <Button onClick={handleOpenAddExaminationDialog}  variant="contained" color="secondary" style={{ marginTop: '10px' }}>
            <AddCircleIcon /> Add Examination
          </Button>

          <ExaminationFormDialog open={openAddExaminationDialog} onClose={handleCloseAddExaminationDialog} />

      </CardContent>
    </Card>
  );
};

export default PatientCard;