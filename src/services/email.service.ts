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
    subject: string;
    body: string;
    status: "send_now" | "schedule_for_later" | "draft" | "sent";
    recipient_type: "user" | "group" | "all" | "new_users";
    user_id?: string;
    image_url?: string;
    created_after?: string;
    scheduled_at?: string;
}

export interface GetEmailsParams {
    page?: number;
    limit?: number;
}

export const createEmail = async (data: CreateEmailPayload) => {
    const response = await client.post<Emails>("/admin-emails", data);
    return response.data;
}

export const updateEmail = async (id: string, data: CreateEmailPayload) => {
    const response = await client.put<Emails>(`/admin-emails/${id}`, data);
    return response.data;
}

export const getEmails = async (params?: GetEmailsParams) => {
    const response = await client.get<EmailResponse>("/admin-emails", { params });
    return response.data;
}