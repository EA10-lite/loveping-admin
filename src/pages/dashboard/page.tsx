import { Link } from "react-router-dom";
import { Text, QueryErrorState } from "../../components";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { cn } from "../../lib/utils";
import { PiUserCheck, PiUserCirclePlus, PiUsersFourThin } from "react-icons/pi";
import { Sparkles } from "lucide-react";
import UserStatusChart from "./_components/UserStatusChart";
import NudgeDistributionChart from "./_components/NudgeDistributionChart";
import PingDistributionChart from "./_components/PingTypeDistribution";
import ActivityFeed from "./_components/ActivityFeed";
import RecentNotifications from "./_components/RecentNotification";
import NudgeSentChart from "./_components/NudgeSentChart";
import { useAdminStore } from "../../store/adminStore";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../../services/dashboard.service";


const iconStyles = {
    users: "bg-[#A561FF1A] border-[#A561FF1A] text-[#A561FF]",
    active: "bg-[#3BD1DC1A] border-[#3BD1DC1A] text-[#3BD1DC]",
    nudges: "bg-[#D7BA381A] border-[#D7BA381A] text-[#D7BA38]",
    signup: "bg-[#EA811E1A] border-[#EA811E1A] text-[#EA811E]",
}

const Dashboard = () => {
    const { admin } = useAdminStore();

    const { data: dashboardData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => getDashboardData()
    });

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (isError) {
        return (
            <div className="dashboard space-y-6">
                <div className="page-header">
                    <div className="flex items-center justify-between">
                        <div className="">
                            <Text
                                title={`Hello ${admin?.full_name}👋`}
                                type="h4"
                                className="text-lg"
                            />
                            <Text
                                title="How are you doing today?"
                                type="p"
                                className="text-sm text-grey"
                            />
                        </div>

                        <Button
                            variant="default"
                            className="rounded-sm px-4"
                        >
                            <Link to="/users">
                                <span>View All Users</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="page-body">
                    <QueryErrorState
                        error={error}
                        onRetry={() => refetch()}
                        title="Couldn't load dashboard"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard space-y-6">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Text
                            title={`Hello ${admin?.full_name}👋`}
                            type="h4"
                            className="text-lg"
                        />
                        <Text
                            title="How are you doing today?"
                            type="p"
                            className="text-sm text-grey"
                        />
                    </div>

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <Link to="/users">
                            <span>View All Users</span>
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="page-body space-y-6">
                <div className="metrics grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Metric
                        label="Total users"
                        value={dashboardData?.totals.total_users.toString() || "0"}
                        icon={<PiUsersFourThin className="size-4" />}
                        className={iconStyles["users"]}
                    />
                    <Metric
                        label="Active users"
                        value={dashboardData?.active_vs_inactive.active.toString() || "0"}
                        icon={<PiUserCheck className="size-4" />}
                        className={iconStyles["active"]}
                    />
                    <Metric
                        label="Total Nudges Sent"
                        value={dashboardData?.totals.nudges_generated.toString() || "0"}
                        icon={<Sparkles className="size-4" />}
                        className={iconStyles["nudges"]}
                    />
                    <Metric
                        label="New Sign-ups Today"
                        value={dashboardData?.totals.signups_today.toString() || "0"}
                        icon={<PiUserCirclePlus className="size-4" />}
                        className={iconStyles["signup"]}
                    />
                </div>

                <div className="w-full">
                    <NudgeSentChart data={dashboardData?.nudges_sent_over_time} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboardData?.active_vs_inactive && <UserStatusChart data={dashboardData?.active_vs_inactive} />}
                    {dashboardData?.nudge_type_distribution?.by_tone && <NudgeDistributionChart data={dashboardData?.nudge_type_distribution?.by_tone} />}
                    {dashboardData?.nudge_type_distribution?.by_ping_type && <PingDistributionChart data={dashboardData?.nudge_type_distribution?.by_ping_type} />}
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ActivityFeed data={dashboardData?.activity_feed || []} />
                    <RecentNotifications data={dashboardData?.notifications || []} />
                </div>
            </div>
        </div>
    )
}


type MetricProps = {
    icon: React.ReactNode;
    value: string;
    label: string;
    className: string;
}

const Metric = ({
    label,
    value,
    icon,
    className,
}: MetricProps) => {
    return (
        <div className="border-[0.5px] border-primary/8 bg-secondary-foreground rounded-sm p-4 space-y-3">
            <div className={
                cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-[0.5px]",
                    className
                )
            }>
                {icon}
            </div>
            <Text
                title={value}
                type="h2"
                className="text-2xl font-medium"
            />
            <Text
                title={label}
                type="h4"
            />
        </div>
    )
}

const MetricSkeleton = () => {
    return (
        <div className="border-[0.5px] border-primary/8 bg-secondary-foreground rounded-sm p-4 space-y-3">
            <Skeleton className="h-10 w-10 rounded-full bg-primary/10" />
            <Skeleton className="h-8 w-20 bg-primary/10" />
            <Skeleton className="h-5 w-32 bg-primary/10" />
        </div>
    );
};

const ChartSkeleton = () => {
    return (
        <div className="border-[0.5px] border-primary/8 bg-secondary-foreground rounded-sm p-4 space-y-4">
            <Skeleton className="h-5 w-40 bg-primary/10" />
            <Skeleton className="h-64 w-full bg-primary/10" />
        </div>
    );
};

const PanelSkeleton = () => {
    return (
        <div className="border-[0.5px] border-primary/8 bg-secondary-foreground rounded-sm p-4 space-y-3">
            <Skeleton className="h-5 w-40 bg-primary/10" />
            <Skeleton className="h-4 w-full bg-primary/10" />
            <Skeleton className="h-4 w-5/6 bg-primary/10" />
            <Skeleton className="h-4 w-3/4 bg-primary/10" />
            <Skeleton className="h-4 w-4/5 bg-primary/10" />
            <Skeleton className="h-4 w-2/3 bg-primary/10" />
        </div>
    );
};

const DashboardSkeleton = () => {
    return (
        <div className="dashboard space-y-6">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-56 bg-primary/10" />
                        <Skeleton className="h-4 w-40 bg-primary/10" />
                    </div>
                    <Skeleton className="h-10 w-36 rounded-sm bg-primary/10" />
                </div>
            </div>

            <div className="page-body space-y-6">
                <div className="metrics grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <MetricSkeleton />
                    <MetricSkeleton />
                    <MetricSkeleton />
                    <MetricSkeleton />
                </div>

                <ChartSkeleton />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ChartSkeleton />
                    <ChartSkeleton />
                    <ChartSkeleton />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PanelSkeleton />
                    <PanelSkeleton />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;