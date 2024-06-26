import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues, validate) => {

    const [values, setValues] = useState(initialFieldValues);

    const [errors, setErrors] = useState({})
    
    const handleInputChange = e =>{
        const name = e.target.name;
        const value = e.target.value;
        const fieldValue = { [name] : value }
        setValues({
            ...values,
            ...fieldValue,
        })
        validate(fieldValue)
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }

}
export default useForm;