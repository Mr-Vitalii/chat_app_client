import { useNavigate } from "react-router-dom";
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { StyledBox } from "../styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppLoadingButton } from "components/global/AppLoadingButton/AppLoadingButton";

import { formValidation } from "./formValidation";
import { instance } from "utils/axios";

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // const validateForm = () => {
    //     const { username, password } = values;
    //     if (username === "") {
    //         toast.error("Email and Password is required.", toastOptions);
    //         return false;
    //     } else if (password === "") {
    //         toast.error("Email and Password is required.", toastOptions);
    //         return false;
    //     }
    //     return true;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formValidation(values, toastOptions)) {
            const { email, password } = values;

            const data = {
                email,
                password,
            };

            try {
                const res = await instance.post("user/login", data);

                localStorage.setItem("userInfo", JSON.stringify(res.data));
                toast.success("Registration Successful", toastOptions);
                setLoading(false);
                navigate("/chat");
            } catch (error) {
                console.log(error);
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
                        Sing in
                    </Typography>
                    <Typography
                        variant="body1"
                        marginBottom={2}
                        fontFamily="Poppins"
                        textAlign="center"
                    >
                        Enter your email and password
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
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
                            <FormControl fullWidth variant="outlined">
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
                    </Grid>
                    <AppLoadingButton
                        type="submit"
                        sx={{ marginTop: 2, marginBottom: 2, width: "60%" }}
                        variant="contained"
                    >
                        Sign in
                    </AppLoadingButton>
                </StyledBox>
            </form>
            <ToastContainer />
        </>
    );
};
