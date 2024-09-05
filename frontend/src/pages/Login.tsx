import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { TextField, Button, IconButton, InputAdornment, Container } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { theme } from "../util/theme";
import { loginFailed, loginSuccess } from "../redux/reducer/UserRed";
import { Navigate } from "react-router-dom";

interface LoginProps {
    username: string;
    password: string;
}

const initialFormData: LoginProps = {
    username: "",
    password: "",
};

const Login: React.FC = () => {
    const [formData, setFormData] = React.useState<LoginProps>(initialFormData);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((data) => ({ ...data, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/", formData);

            if (response.status == 201) {
                dispatch(loginSuccess(response.data));
                localStorage.setItem("token", response.data.token);
                <Navigate to={"/"} />;
            } else if (response.status == 401) {
                dispatch(loginFailed(response.data.message));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setFormData(initialFormData);
        }
    };
    return (
        <StyledContainer>
            <StyledForm onSubmit={handleLogin}>
                <TextField
                    label="Username"
                    variant="outlined"
                    name="username"
                    value={formData.username}
                    onChange={handleChangeField}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChangeField}
                    margin="normal"
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{
                        marginTop: "16px",
                        backgroundColor: theme.palette.primary.dark,
                        color: theme.palette.primary.main,
                    }}
                >
                    Login
                </Button>
            </StyledForm>
        </StyledContainer>
    );
};

export default Login;

const StyledContainer = styled(Container)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "25vh",
}));

const StyledForm = styled("form")(({ theme }) => ({
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
