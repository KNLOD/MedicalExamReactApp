import MaskedInput from 'react-text-mask';
import React from 'react'; 

const InsuranceNumberMask = React.forwardRef((props, ref) => {
    const handleFocus = (event) => {
        event.target.setSelectionRange(0, 0); // Move cursor to the start of the input value
      };
    return (
      <MaskedInput
        {...props}
        ref={ref}
        onFocus={handleFocus}
        mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  });
  
  const MedicalInsuranceNumberMask = React.forwardRef((props, ref) => {
    const handleFocus = (event) => {
        event.target.setSelectionRange(0, 0); // Move cursor to the start of the input value
      };
    return (
      <MaskedInput
        {...props}
        ref={ref}
        onFocus={handleFocus}
        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  });

  export {InsuranceNumberMask, MedicalInsuranceNumberMask};