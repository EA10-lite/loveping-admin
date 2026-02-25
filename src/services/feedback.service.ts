import client from "./client.service";
import type { Feedback } from "../utils/types";

export type { Feedback };

export interface FeedbackResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Feedback[];
}

export interface GetFeedbackParams {
    page?: number;
    limit?: number;
}


export const getFeedbacks = async (params?: GetFeedbackParams) => {
    const response = await client.get<FeedbackResponse>("/feedback", { params });
    return response.data;
}
