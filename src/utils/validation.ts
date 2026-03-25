import * as Yup from "yup";


export const loginValidation = Yup.object().shape({
    email_address: Yup.string().email().required(),
    password: Yup.string().min(8).max(50).required(),
})


export const editUserValidation = Yup.object().shape({
    full_name: Yup.string().required(),
    email_address: Yup.string().email().required(),
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
    recipient_type: Yup.string().required(),
    body: Yup.string().required(),
    status: Yup.string().required(),
    user_id: Yup.string().optional(),
    image_url: Yup.string().optional(),
    created_after: Yup.string().optional(),
    scheduled_at: Yup.string().optional(),
})
