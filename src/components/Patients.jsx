import  React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/PatientAction";
import {Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, styled} from "@mui/material";
import TextField from '@mui/material/TextField';
import { withStyles } from '@mui/styles';
import { spacing } from '@mui/system';
import Pagination from '@mui/material/Pagination';

import  PatientForm from "./PatientForm";
import  PatientCard from "./PatientCard";

const patient = {
    "id": 17,
    "name": "string",
    "lastName": "string",
    "patronym": "string",
    "birthday": "string",
    "sex": "string",
    "insurance_account_number": "string",
    "medical_insurance_number": "string"
  }


const StyledTableHead = styled(TableHead)(() => ({
    '& .MuiTableCell-head' : {
        fontSize: "1.25rem"
    }
}));



const Patients = ({classes, ...props}) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5); // Number of items per page
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset page to 1 when performing a new search
      };
    

    useEffect(() => {
        props.fetchAllPatients();

    }, []) // alternative for componentDidMount

    const indexOfLastPatient = page * rowsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - rowsPerPage;

      const filteredPatients = props.patientsList.filter(patient =>
        (patient.name + " " + patient.lastName + " " + patient.patronym).toLowerCase().includes(searchTerm.toLowerCase())

      ); 
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    return (

        <div>
        <TextField
            label="Search Patients"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: '20px' }}
        />
            {currentPatients.map((record, index) => (
                <PatientCard patient={record}/>
            ))}
        <Pagination
            count={Math.ceil(props.patientsList.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            style={{ marginTop: '20px' }}
        />
    </div>
    )
}

const mapStateToProps = state => {
    return {
        patientsList: state.patient.list
    }
}

const mapActionToProps = {
    fetchAllPatients: actions.fetchAll
}



export default connect(mapStateToProps, mapActionToProps)(Patients);
 
