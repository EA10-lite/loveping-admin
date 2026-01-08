import * as Yup from "yup";


export const loginValidation  = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(50).required(),
})