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


export interface UpdateIssuesPayload {
    status: "new" | "resolved" | "in_review";
    issue_type: "bug" | "payment" | "privacy" | "other" | "rating";
    internal_note: string;
}


export const getIssues = async (params?: GetIssuesParams) => {
    const response = await client.get<IssueResponse>("/issues", { params });
    return response.data;
}

export const updateIssues = async (id: string, body: UpdateIssuesPayload) => {
    const response = await client.patch<Issues>(`/issues/${id}`, body);
    return response?.data;
}

export const deleteIssues = async (id: string) => {
    const response = await client.delete<Issues>(`/issues/${id}`);
    return response?.data;
}