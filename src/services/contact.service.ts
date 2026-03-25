import client from "./client.service";
import type { ContactMessage } from "../utils/types";

export type { ContactMessage };

export interface ContactMessageResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: ContactMessage[];
}

export interface GetContactMessageParams {
    page?: number;
    limit?: number;
}

export interface ReplyPayload {
    subject: string;
    message: string;
}


export const getContactMessages = async (params?: GetContactMessageParams) => {
    const response = await client.get<ContactMessageResponse>("/auth/admin/contacts", { params });
    return response.data;
}

export const replyToContactMessage = async (id: string, payload: ReplyPayload) => {
    const response = await client.post<ContactMessage>(`/auth/admin/contacts/${id}/reply`, payload);
    return response.data;
}