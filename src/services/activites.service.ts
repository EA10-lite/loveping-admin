import client from "./client.service";
import type { Activity } from "../utils/types";

export interface ActivitiesResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Activity[];
}

export interface GetActivitiesParams {
    page?: number;
    limit?: number;
}

export const getActivities = async (params?: GetActivitiesParams) => {
    const response = await client.get<ActivitiesResponse>("/activities", { params });
    return response.data;
}