import React from 'react';
import { TextField, BaseTextFieldProps } from '@mui/material';

interface InputFieldProps extends BaseTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputFieldComponent: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  ...otherProps
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      {...otherProps}
    />
  );
};

export default InputFieldComponent;
