import client from "./client.service";
import type { Nudge } from "../utils/types";

export type { Nudge };

export interface NudgeResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Nudge[];
}

export interface CreateNudgePayload {
    question: string;
    category: string;
    status: "published" | "unpublished";
    answer: string;
}

export interface GetFAQsParams {
    page?: number;
    limit?: number;
}


export const getNudges = async (params?: GetFAQsParams) => {
    const response = await client.get<NudgeResponse>("/ping/admin", { params });
    return response.data;
}