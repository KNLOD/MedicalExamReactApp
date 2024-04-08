import { Button, Grid, TextField, styled, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import React, { useState } from 'react';
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/PatientAction";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';

import {InsuranceNumberMask, MedicalInsuranceNumberMask} from "./InputMasks";


const patient_markers = [ "Last Name", "Name","Patronym", "Birthday", "Sex", "Insurance number", "Medical Insurance Number"];
const patient_markers_names = [ "lastName", "name", "patronym", "birthday", "sex", "insurance_account_number", "medical_insurance_number"];

const initialFieldValues = {
    id: 0,
    name: '',
    lastName: '',
    patronym: '',
    birthday: null,
    sex: '',
    insurance_account_number: '',
    medical_insurance_number: '',
};

const StyledTextField = styled(TextField)(() => ({
    margin: '8px',
    padding: '8px',
}));

const StyledButton = styled(Button)(() => ({
    margin: '16px',
    padding: '16px',
}));

const PatientForm = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPatients = props.patientsList.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const validate = (fieldValues = values) => {
        let temp = {}

        temp.name = fieldValues.name ? "" : "This field is required."
        temp.lastName = fieldValues.lastName ? "" : "This field is required."
        temp.patronym = fieldValues.patronym ? "" : "This field is required."
        temp.birthday = fieldValues.birthday ? "" : "This field is required."
        temp.sex = fieldValues.sex ? "" : "This field is required."
        temp.insurance_account_number = /^\d{3}-\d{3}-\d{3} \d{2}$/.test(fieldValues.insurance_account_number) ? "" : "Invalid format. Use 'xxx-xxx-xxx xx' format."
        temp.medical_insurance_number = /^\d{4} \d{4} \d{4} \d{4}$/.test(fieldValues.medical_insurance_number) ? "" : "Invalid format. Use 'xxxx xxxx xxxx xxxx' format."

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")

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
        if (validate()) {
            window.alert("validation succeeded")
            props.createPatient(values, () => { window.alert("validation succeeded") })
        }
    }

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                        {patient_markers.map((obj, idx) => (
                            <Grid item xs={4} md={6} key={idx}>
                                {obj === "Sex" ? (
                                    <RadioGroup
                                        name="sex"
                                        value={values["sex"]}
                                        onChange={handleInputChange}
                                        row
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                ) : obj === "Birthday" ? (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Birthday"
                                            value={values["birthday"]}
                                            onChange={(date) => setValues({ ...values, birthday: date })}
                                            renderInput={(params) => <TextField {...params} />}
                                            fullWidth
                                            inputFormat="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                ) : (
                                    <StyledTextField
                                        name={patient_markers_names[idx]}
                                        variant="outlined"
                                        label={obj}
                                        value={values[patient_markers_names[idx]]}
                                        onChange={handleInputChange}
                                        {...(errors[patient_markers_names[idx]] && { error: true, helperText: errors[patient_markers_names[idx]] })}
                                        fullWidth
                                        InputProps={{
                                            inputComponent: obj === "Insurance number" ?
                                                InsuranceNumberMask :
                                                obj === "Medical Insurance Number" ? MedicalInsuranceNumberMask : undefined
                                        }}
                                    />
                                )}
                            </Grid>
                        ))}
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
    patientsList: state.patient.list
})

const mapPatientActionToProps = {
    createPatient: actions.create,
    updatePatient: actions.update
}

export default connect(mapPatientStateToProps, mapPatientActionToProps)(PatientForm);
