import client from "./client.service";
import type { Emails } from "../utils/types";

export type { Emails };

export interface EmailResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Emails[];
}

export interface CreateEmailPayload {
    question: string;
    category: string;
    status: "published" | "unpublished";
    answer: string;
}

export interface GetEmailsParams {
    page?: number;
    limit?: number;
}

export const createFAQ = async (data: CreateEmailPayload) => {
    const response = await client.post<Emails>("/faqs", data);
    return response.data;
}

export const getEmails = async (params?: GetEmailsParams) => {
    const response = await client.get<EmailResponse>("/admin-emails", { params });
    return response.data;
}

// export const updateFAQ = async (id: string, data: Partial<CreateEmailPayload>) => {
//     const response = await client.patch<Emails>(`/faqs/${id}`, data);
//     return response.data;
// }

export const deleteFAQ = async (id: string) => {
    const response = await client.delete(`/admin-emails/${id}`);
    return response.data;
}


// {
//     "page": 1,
//     "limit": 20,
//     "total": 2,
//     "totalPages": 1,
//     "data": [
//         {
//             "_id": "699c51d72f1222149b115cce",
//             "subject": "Reminder",
//             "body": "<p>Don't forget!</p>",
//             "status": "sent",
//             "recipient_type": "user",
//             "user_id": "68fab0daa428f9e55d6c2a2e",
//             "user_ids": [],
//             "sent_at": "2026-02-23T13:10:47.085Z",
//             "createdBy": "69768495499d5a80e02cd5e5",
//             "createdAt": "2026-02-23T13:10:47.100Z",
//             "updatedAt": "2026-02-23T13:10:47.100Z",
//             "__v": 0,
//             "createdByUser": {
//                 "id": "69768495499d5a80e02cd5e5",
//                 "name": "Loveping Admin",
//                 "email": "lovepingadmin@gmail.com"
//             },
//             "user": {
//                 "id": "68fab0daa428f9e55d6c2a2e",
//                 "name": "Afolabi test dami",
//                 "email": "afolabidamilare08@gmail.com"
//             }
//         },
//         {
//             "_id": "699c4b9c836739aade9fc71f",
//             "subject": "Reminder",
//             "body": "<p>Don't forget!</p>",
//             "status": "sent",
//             "recipient_type": "user",
//             "user_id": "68fab0daa428f9e55d6c2a2e",
//             "user_ids": [],
//             "sent_at": "2026-02-23T12:44:12.791Z",
//             "createdBy": "69768495499d5a80e02cd5e5",
//             "createdAt": "2026-02-23T12:44:12.804Z",
//             "updatedAt": "2026-02-23T12:44:12.804Z",
//             "__v": 0,
//             "createdByUser": {
//                 "id": "69768495499d5a80e02cd5e5",
//                 "name": "Loveping Admin",
//                 "email": "lovepingadmin@gmail.com"
//             },
//             "user": {
//                 "id": "68fab0daa428f9e55d6c2a2e",
//                 "name": "Afolabi test dami",
//                 "email": "afolabidamilare08@gmail.com"
//             }
//         }
//     ]
// }