import client from "./client.service";
import type { FullUser, UserDetails } from "../utils/types";

export type { FullUser };

export interface UserResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: FullUser[];
}

export interface UpdateUserPayload {
    partner_name?: string;
    relationship_type?: string;
    full_name?: string;
    email_address?: string;
    anniversary_date?: string;
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
}


export const getUsers = async (params?: GetUsersParams) => {
    const response = await client.get<UserResponse>("/auth/admin/users", { params });
    return response.data;
}


export const getUserDetails = async (id: string) => {
    const response = await client.get<UserDetails>(`/auth/admin/users/${id}`);
    return response.data;
}

export const updateUser = async (id: string, data: UpdateUserPayload) => {
    const response = await client.put<UserDetails>(`/auth/admin/users/${id}`, data);
    return response.data;
}