import * as Yup from "yup";


export const loginValidation = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(50).required(),
})


export const addPartnerValidation = Yup.object().shape({
    name: Yup.string().required(),
    status: Yup.string().required(),
    category: Yup.string().required(),
    website: Yup.string().url().required(),
    note: Yup.string(),
})