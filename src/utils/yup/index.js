import * as yup from "yup";
import { AppErrors } from "common/errors";

export const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .required(AppErrors.RequiredField)
        .email(AppErrors.InvalidEmail),

    password: yup
        .string()
        .required(AppErrors.RequiredField)
        .min(8, AppErrors.minLength)
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
            AppErrors.InvalidPassword
        ),
});

export const RegisterSchema = yup.object().shape({
    email: yup
        .string()
        .required(AppErrors.RequiredField)
        .email(AppErrors.InvalidEmail),

    password: yup
        .string()
        .required(AppErrors.RequiredField)
        .min(8, AppErrors.minLength)
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
            AppErrors.InvalidPassword
        ),
    confirmPassword: yup
        .string()
        .required(AppErrors.RequiredField)
        .min(8, AppErrors.minLength)
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!@#$%&?]{6,20}$/,
            AppErrors.InvalidPassword
        ),
    name: yup.string().required(AppErrors.RequiredField),
    username: yup.string().required(AppErrors.RequiredField),
});