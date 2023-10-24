import { toast } from 'react-toastify';

export const formValidation = (values, toastOptions) => {
    const { password, email } = values;

    if (!email || !password) {
        toast.error('Please Fill all the feilds', toastOptions);
        return false;
    }

    return true;
};