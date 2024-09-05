import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

interface ButtonProps {
    title: string;
    onClick: () => void;
}

const ButtonComponent = styled(Button)(({ theme }) => ({
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
}));

const PrimaryButton: React.FC<ButtonProps> = ({ title, onClick }) => {
    return (
        <ButtonComponent onClick={onClick} variant="contained" fullWidth>
            {title}
        </ButtonComponent>
    );
};

export default PrimaryButton;
