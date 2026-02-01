import client from "./client.service";
import type { FAQ } from "../utils/types";

export type { FAQ };

export interface FAQResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: FAQ[];
}

export interface CreateFAQPayload {
    question: string;
    category: string;
    status: "published" | "unpublished";
    answer: string;
}

export interface GetFAQsParams {
    page?: number;
    limit?: number;
}

export const createFAQ = async (data: CreateFAQPayload) => {
    const response = await client.post<FAQ>("/faqs", data);
    return response.data;
}

export const getFAQs = async (params?: GetFAQsParams) => {
    const response = await client.get<FAQResponse>("/faqs", { params });
    return response.data;
}

export const updateFAQ = async (id: string, data: Partial<CreateFAQPayload>) => {
    const response = await client.patch<FAQ>(`/faqs/${id}`, data);
    return response.data;
}

export const deleteFAQ = async (id: string) => {
    const response = await client.delete(`/faqs/${id}`);
    return response.data;
}