import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface ButtonCompProps extends ButtonProps{
    label: string;
}

const ButtonComponent: React.FC<ButtonCompProps> = ({label, ...otherProps}) => {
    return (
        <Button {...otherProps} aria-label={label}>
            {label}
        </Button>
    )
}

export default ButtonComponent;