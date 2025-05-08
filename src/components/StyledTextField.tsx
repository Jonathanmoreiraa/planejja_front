import React from 'react';
import { StyledTextField as StyledTextFieldComponent } from './CommonComponents.styles';
import { TextFieldProps } from '@mui/material';

const StyledTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <StyledTextFieldComponent
      {...props}
      variant="outlined"
      InputLabelProps={{
        ...props.InputLabelProps,
      }}
    />
  );
};

export default StyledTextField; 