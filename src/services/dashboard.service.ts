import client from "./client.service";
import { type Notification } from "../utils/types";

export interface NudgeTimePoint {
    label: string;
    count: number;
}

export interface NudgeTimeSeries {
    range: string;
    start: string;
    end: string;
    points: NudgeTimePoint[];
}

export interface DashboardResponse {
    totals: {
        total_users: number;
        nudges_generated: number;
        signups_today: number;
    };
    active_users: {
        dau: number;
        wau: number;
        mau: number;
    };
    active_vs_inactive: {
        range: "30d" | "7d",
        active: number,
        inactive: number
    },
    nudges_sent_over_time: {
        day: NudgeTimeSeries;
        week: NudgeTimeSeries;
        month: NudgeTimeSeries;
        year: NudgeTimeSeries;
    },
    nudge_type_distribution: {
        by_ping_type: {
            type: string,
            count: number,
            percentage: number
        }[],
        by_tone: {
            tone: string,
            count: number,
            percentage: number
        }[],
    },
    activity_feed: []
    notifications: Notification[]
}


export const getDashboardData = async () => {
    const response = await client.get<DashboardResponse>("/auth/admin/dashboard");
    return response.data;
}