import client from "./client.service";
import type { Note } from "../utils/types";

export type { Note };

export interface IssueResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Note[];
}

export interface GetNotesParams {
    page?: number;
    limit?: number;
}


export const getNotes = async (params?: GetNotesParams) => {
    const response = await client.get<IssueResponse>("/ping/admin/note-nudges", { params });
    return response.data;
}