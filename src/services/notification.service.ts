import client from "./client.service";
import type { Notification } from "../utils/types";

export type { Notification };

export interface NotificationResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Notification[];
}


export interface CreateNotificationPayload {
    subject: string;
    body: string;
    audience: string;
    url: string;
}

export interface GetNotificationsParams {
    page?: number;
    limit?: number;
}

export const createNotification = async (data: CreateNotificationPayload) => {
    const response = await client.post<Notification>("/notifications", data);
    return response.data;
}

export const getNotifications = async (params?: GetNotificationsParams) => {
    const response = await client.get<NotificationResponse>("/notifications", { params });
    return response.data;
}

export const deleteNotification = async (id: string) => {
    const response = await client.delete<Notification>(`/notifications/${id}`);
    return response.data;
}