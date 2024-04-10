import { Button, Grid, TextField, styled } from '@mui/material';
import  React, { useState } from 'react';
import useForm from "./useForm";
import {connect} from "react-redux";
import * as actions from "../actions/ExaminationAction";

const examination_markers = ["createnin", "glucose", "glucosed hymoglobin", "homocystein", "c reactive protein", "cholesterol"];
const examination_markers_names = ["createnin", "glucose", "glucosed_hymoglobin", "homocystein", "c_reactive_protein", "cholesterol"];

const initialFieldValues = {
    patient_id: -1,
    patient: null,
    createnin : '',
    glucose : '',
    glucosed_hymoglobin : '',
    homocystein : '',
    c_reactive_protein : '',
    cholesterol : '',
};

const StyledTextField = styled(TextField)(() => ({
    margin: 4, 
    padding: 4, 
}));

const StyledButton = styled(Button)(() => ({
    margin: 4, 
    padding: 4, 
}));



const ExaminationForm = (props) => {

    const validate = (fieldValues = values) => {

        let temp = {}
        
        temp.createnin = fieldValues.createnin ? "" :"This field is required."
        temp.glucose = fieldValues.glucose ? "" :"This field is required."
        temp.glucosed_hymoglobin = fieldValues.glucosed_hymoglobin ? "" :"This field is required."
        temp.homocystein = fieldValues.homocystein ? "" : "This field is required."
        temp.c_reactive_protein = fieldValues.c_reactive_protein ? "" : "This field is required."
        temp.cholesterol = fieldValues.cholesterol ? "" : "This field is required."

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
            console.log("patient id: ", props.patient_id)
            let date = new Date().toLocaleDateString();
            props.createExamination({...values, date: date, patient_id: props.patient_id}, () => {window.alert("validation succeeded")})
        }
        console.log(values)
        console.log(errors)
    }

    return ( 
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                   {examination_markers.map((obj, idx) => {
                        if (idx <= (examination_markers.length - 1)/2){
                        return <StyledTextField
                            name={examination_markers_names[idx]}
                            variant="outlined" 
                            label={obj}
                            value={values[examination_markers_names[idx]]}
                            onChange={handleInputChange}
                            {...(errors[examination_markers_names[idx]] && {error:true, helperText:errors[examination_markers_names[idx]]})}
                            margin="16px"
                            padding="16px" 
                        />
                        }
                    }
                    )} 
                </Grid>
                <Grid item xs={6}>
                   {examination_markers.map((obj, idx) => {
                        if (idx > (examination_markers.length - 1 )/2){
                        return <StyledTextField
                            name={examination_markers_names[idx]}
                            variant="outlined" 
                            label={obj}
                            value={values[examination_markers_names[idx]]}
                            onChange={handleInputChange}
                            {...(errors[examination_markers_names[idx]] && {error:true, helperText:errors[examination_markers_names[idx]]})}
                            margin="16px"
                            padding="16px" 
                        />
                        }
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

const mapStateToProps = state => ({
    examinationsList : state.examination.list
})

const mapActionToProps = {
    createExamination : actions.create,
    updateExamination : actions.update
}
 
export default connect(mapStateToProps, mapActionToProps)(ExaminationForm);