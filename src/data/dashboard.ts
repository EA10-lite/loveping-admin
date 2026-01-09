
export interface UserStatusDataPoint {
    user: string;
    sales: number;
    fill?: string;
}

// Users performance data (typically doesn't change with time filter)
export const userPerformanceData: UserStatusDataPoint[] = [
    { user: "Active", sales: 395, fill: "#48D962" },
    { user: "Inactive", sales: 190, fill: "#123229" },
];