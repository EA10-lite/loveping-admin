import client from "./client.service";

interface Point {
    label: string;
    count: number;
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
        range: "year" | "month" | "week" | "30d" | "7d",
        start: string,
        end: string,
        points: Point[];
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
}


export const getDashboardData = async () => {
    const response = await client.get<DashboardResponse>("/auth/admin/dashboard");
    return response.data;
}