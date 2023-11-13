import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";

import { StyledBox } from "../styled-components";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { formValidation } from "./formValidation";
import { instance } from "utils/axios";

import { AppLoadingButton } from "../../global/AppLoadingButton/AppLoadingButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formValidation(values, toastOptions)) {
            const { email, name, password } = values;

            const data = {
                email,
                name,
                password,
            };

            try {
                const res = await instance.post("user/register", data);

                localStorage.setItem("userInfo", JSON.stringify(res.data));
                toast.success("Registration Successful", toastOptions);
                setLoading(false);
                navigate("/chat");
            } catch (e) {
                if (e.response) {
                    toast.error(e.response.data.message, toastOptions);
                } else {
                    toast.error(e.message, toastOptions);
                }
                setLoading(false);
            }
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <StyledBox>
                    <Typography
                        variant="h2"
                        fontFamily="Poppins"
                        textAlign="center"
                    >
                        Sign up
                    </Typography>
                    <Typography
                        variant="body1"
                        marginBottom={2}
                        fontFamily="Poppins"
                        textAlign="center"
                    >
                        Enter data for registration
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                color="secondary"
                                name="name"
                                autoComplete="off"
                                fullWidth
                                label="Name"
                                variant="outlined"
                                placeholder="Enter your name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                color="secondary"
                                name="email"
                                autoComplete="off"
                                fullWidth
                                label="Email"
                                variant="outlined"
                                placeholder="Enter your email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                color="secondary"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    name="password"
                                    label="Password"
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                color="secondary"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirmpassword"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    name="confirmPassword"
                                    label="ConfirmPassword"
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <AppLoadingButton
                        loading={loading}
                        type="submit"
                        sx={{ marginTop: 2, marginBottom: 2, width: "60%" }}
                        variant="contained"
                    >
                        Sign up
                    </AppLoadingButton>
                </StyledBox>
            </form>
        </>
    );
};
