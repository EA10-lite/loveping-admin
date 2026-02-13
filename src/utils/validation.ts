import * as Yup from "yup";


export const loginValidation = Yup.object().shape({
    email_address: Yup.string().email().required(),
    password: Yup.string().min(8).max(50).required(),
})


export const editUserValidation = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().required(),
    partnerName: Yup.string().required(),
    relationshipType: Yup.string().required(),
})

export const addPartnerValidation = Yup.object().shape({
    name: Yup.string().required(),
    status: Yup.string().required(),
    category: Yup.string().required(),
    url: Yup.string().url().required(),
    internal_note: Yup.string().optional(),
})


export const addFAQValidation = Yup.object().shape({
    question: Yup.string().required(),
    category: Yup.string().required(),
    answer: Yup.string().required(),
    status: Yup.string().required(),
})


export const emailAndNotificationValidation = Yup.object().shape({
    subject: Yup.string().required(),
    audience: Yup.string().required(),
    body: Yup.string().required(),
})
