import client from "./client.service";
import type { Issues } from "../utils/types";

export type { Issues };

export interface IssueResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Issues[];
}

export interface GetIssuesParams {
    page?: number;
    limit?: number;
}


export const getIssues = async (params?: GetIssuesParams) => {
    const response = await client.get<IssueResponse>("/issues", { params });
    return response.data;
}
