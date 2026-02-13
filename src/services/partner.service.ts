import client from "./client.service";
import type { Partner, AddPartner } from "../utils/types";

export type { Partner };

export interface PartnerResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Partner[];
}

export interface GetPartnersParams {
    page?: number;
    limit?: number;
}

export const addPartner = async (data: AddPartner) => {
    const response = await client.post<Partner>("/business-partners", data);
    return response.data;
};

export const getPartners = async (params?: GetPartnersParams) => {
    const response = await client.get<PartnerResponse>("/business-partners", { params });
    return response.data;
};

export const editPartner = async (id: string, data: Partial<AddPartner>) => {
    const response = await client.patch<Partner>(`/business-partners/${id}`, data);
    return response.data;
};

export const deletePartner = async (id: string) => {
    const response = await client.delete(`/business-partners/${id}`);
    return response.data;
};