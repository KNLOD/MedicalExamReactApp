import { Button, Grid, TextField, styled } from '@mui/material';
import  React, { useState } from 'react';
import useForm from "./useForm";
import {connect} from "react-redux";
import * as actions from "../actions/PatientAction";

const patient_markers = ["Name", "Last Name", "Patronym", "Birthday"];
const patient_markers_names = ["name", "last_name", "patronym", "birthday"];

const initialFieldValues = {
    name : '',
    last_name : '',
    patronym : '',
    birthday : '',
};

const StyledTextField = styled(TextField)(() => ({
    margin: 4, 
    padding: 4, 
}));

const StyledButton = styled(Button)(() => ({
    margin: 4, 
    padding: 4, 
}));



const PatientForm = (props) => {

    const validate = (fieldValues = values) => {

        let temp = {}
        
        temp.name = fieldValues.name ? "" :"This field is required."
        temp.last_name = fieldValues.last_name ? "" :"This field is required."
        temp.patronym = fieldValues.patronym ? "" :"This field is required."
        temp.birthday = fieldValues.birthday ? "" : "This field is required."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x ==="")

    }



    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues, validate)


    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            window.alert("validation succeeded")
            props.createPatient(values, () => {window.alert("validation succeeded")})
        }
        console.log(values)
        console.log(errors)
    }

    return ( 
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                   {patient_markers.map((obj, idx) => {
                        return <StyledTextField
                            name={patient_markers_names[idx]}
                            variant="outlined" 
                            label={obj}
                            value={values[patient_markers_names[idx]]}
                            onChange={handleInputChange}
                            {...(errors[patient_markers_names[idx]] && {error:true, helperText:errors[patient_markers_names[idx]]})}
                            margin="16px"
                            padding="16px" 
                        />
                        }
                    )} 
                </Grid>
                <Grid item xs={6}>
                    <StyledButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    >Submit</StyledButton>

                    <StyledButton
                    variant="contained"
                    >Reset</StyledButton>

                </Grid>
            </Grid>
        </form>

    );
}

const mapPatientStateToProps = state => ({
    patientsList : state.patient.list
})

const mapPatientActionToProps = {
    createPatient : actions.create,
    updatePatient : actions.update
}
 
export default connect(mapPatientStateToProps, mapPatientActionToProps)(PatientForm);
