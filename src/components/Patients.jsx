import  React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/PatientAction";
import {Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, styled} from "@mui/material";
import { withStyles } from '@mui/styles';
import { spacing } from '@mui/system';

import  PatientForm from "./PatientForm";




const StyledPaper = styled(Paper)(() => ({

    margin: 16, // 16px because 1 is 8 px
    padding: 16, // 16px because 1 is 8 px
}));

const StyledTableHead = styled(TableHead)(() => ({
    '& .MuiTableCell-head' : {
        fontSize: "1.25rem"
    }
}));



const Patients = ({classes, ...props}) => {

    useEffect(() => {
        props.fetchAllPatients();

    }, []) // alternative for componentDidMount
    return ( 

        <StyledPaper elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <PatientForm/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <TableCell> Name </TableCell>
                                    <TableCell> Last Name </TableCell>
                                    <TableCell> Patronym </TableCell>
                                    <TableCell> Birthday</TableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {
                                    props.patientsList.map((record, index) => {
                                        return (
                                        <TableRow key = {index} hover>
                                            <TableCell> {record.name} </TableCell>
                                            <TableCell> {record.last_name} </TableCell>
                                            <TableCell> {record.patronym}  </TableCell>
                                            <TableCell> {record.birthday}  </TableCell>
                                        </TableRow>)
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        </Grid> 
        </StyledPaper>

    );
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
 
