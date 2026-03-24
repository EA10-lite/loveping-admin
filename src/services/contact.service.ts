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


export const getContactMessages = async (params?: GetContactMessageParams) => {
    const response = await client.get<ContactMessageResponse>("/auth/admin/contacts", { params });
    return response.data;
}