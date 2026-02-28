import client from "./client.service";
import type { FullUser } from "../utils/types";

export type { FullUser };

export interface UserResponse {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: FullUser[];
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
    const response = await client.get<FullUser>(`/auth/admin/users/${id}`);
    return response.data;
}

// {
//     "page": 1,
//     "limit": 20,
//     "total": 3,
//     "totalPages": 1,
//     "count": 3,
//     "data": [
//         {
//             "id": "69a2f5c3d84df0b7396162d3",
//             "full_name": "Afolabi Damilare",
//             "email_address": "afolabidamilar329@gmail.com",
//             "user_type": "ping_user",
//             "profile_visibility": true,
//             "is_verified": false,
//             "daily_nudge": true,
//             "special_occassion_reminders": true,
//             "silent_mode": false,
//             "language": "english",
//             "createdAt": "2026-02-28T14:03:47.299Z",
//             "updatedAt": "2026-02-28T14:03:47.299Z",
//             "partner": null
//         },
//         {
//             "id": "697e9401f4e575fef58b4068",
//             "full_name": "EASync",
//             "email_address": "emanuelanyigor@gmail.com",
//             "user_type": "ping_admin",
//             "profile_visibility": true,
//             "is_verified": false,
//             "daily_nudge": true,
//             "special_occassion_reminders": true,
//             "silent_mode": false,
//             "language": "english",
//             "createdAt": "2026-01-31T23:45:05.286Z",
//             "updatedAt": "2026-01-31T23:45:05.286Z",
//             "partner": null
//         },
//         {
//             "id": "697e9278f4e575fef58b4057",
//             "full_name": "Loveping Admin",
//             "email_address": "lovepingadmin@gmail.com",
//             "user_type": "ping_admin",
//             "profile_visibility": true,
//             "is_verified": false,
//             "daily_nudge": true,
//             "special_occassion_reminders": true,
//             "silent_mode": false,
//             "language": "english",
//             "createdAt": "2026-01-31T23:38:32.512Z",
//             "updatedAt": "2026-01-31T23:38:32.512Z",
//             "partner": null
//         }
//     ]
// }