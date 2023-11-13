import { toast } from 'react-toastify';

export const formValidation = (values, toastOptions) => {
    const { password, confirmPassword, name, email } = values;

    if (!name || !email || !password || !confirmPassword) {
        toast.error('Please Fill all the feilds', toastOptions);
        return false;
    }

    if (password !== confirmPassword) {
        toast.error('Password and confirm password should be the same.', toastOptions);
        return false;
    } else if (name.length < 3) {
        toast.error('Name should be greater than 3 characters.', toastOptions);
        return false;
    } else if (password.length < 8) {
        toast.error('Password should be equal or greater than 8 characters.', toastOptions);
        return false;
    } else if (email === '') {
        toast.error('Email is required.', toastOptions);
        return false;
    }

    return true;
};