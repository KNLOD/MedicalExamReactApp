import  React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/ExaminationAction";
import {Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, styled} from "@mui/material";
import { withStyles } from '@mui/styles';
import { spacing } from '@mui/system';

import  ExaminationForm  from "./ExaminationForm";




const StyledPaper = styled(Paper)(() => ({

    margin: 16, // 16px because 1 is 8 px
    padding: 16, // 16px because 1 is 8 px
}));

const StyledTableHead = styled(TableHead)(() => ({
    '& .MuiTableCell-head' : {
        fontSize: "1.25rem"
    }
}));



const Examinations = ({classes, ...props}) => {

    useEffect(() => {
        props.fetchAllExaminations();

    }, []) // alternative for componentDidMount
    return ( 

        <StyledPaper elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <ExaminationForm/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <StyledTableHead>
                                <TableRow>
                                    <TableCell> Createnin </TableCell>
                                    <TableCell> Glucose </TableCell>
                                    <TableCell> Glucosed hymoglobin  </TableCell>
                                    <TableCell> Homocystein  </TableCell>
                                    <TableCell> C Reactive Protein  </TableCell>
                                    <TableCell> Cholesterol  </TableCell>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {
                                    props.examinationsList.map((record, index) => {
                                        return (
                                        <TableRow key = {index} hover>
                                            <TableCell> {record.createnin} </TableCell>
                                            <TableCell> {record.glucose} </TableCell>
                                            <TableCell> {record.glucosed_hymoglobin}  </TableCell>
                                            <TableCell> {record.homocystein}  </TableCell>
                                            <TableCell> {record.c_reactive_protein}  </TableCell>
                                            <TableCell> {record.cholesterol}  </TableCell>
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
        examinationsList: state.examination.list
    }
}

const mapActionToProps = {
    fetchAllExaminations: actions.fetchAll
}



export default connect(mapStateToProps, mapActionToProps)(Examinations);
 
//export default Examinations;