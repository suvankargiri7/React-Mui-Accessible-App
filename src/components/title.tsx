import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface TitleProps extends TypographyProps {
  label: string;
}

const TitleComponent: React.FC<TitleProps> = ({ label, ...otherProps }) => {
  return (
    <Typography {...otherProps} aria-label={label} title={label}>
      {label}
    </Typography>
  );
};

export default TitleComponent;
