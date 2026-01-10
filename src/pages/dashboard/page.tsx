import { Link } from "react-router-dom";
import { Text } from "../../components";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { PiUserCheck, PiUserCirclePlus, PiUsersFourThin } from "react-icons/pi";
import { Sparkles } from "lucide-react";
import UserStatusChart from "./_components/UserStatusChart";
import NudgeDistributionChart from "./_components/NudgeDistributionChart";
import ActivityFeed from "./_components/ActivityFeed";
import RecentNotifications from "./_components/RecentNotification";
import NudgeSentChart from "./_components/NudgeSentChart";


const iconStyles = {
    users: "bg-[#A561FF1A] border-[#A561FF1A] text-[#A561FF]",
    active: "bg-[#3BD1DC1A] border-[#3BD1DC1A] text-[#3BD1DC]",
    nudges: "bg-[#D7BA381A] border-[#D7BA381A] text-[#D7BA38]",
    signup: "bg-[#EA811E1A] border-[#EA811E1A] text-[#EA811E]",
}

const Dashboard = () => {
    return (
        <div className="dashboard space-y-6">
             <div className="page-header">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Text
                            title="Hello Efe👋"
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
                <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Metric
                        label="Total users"
                        value={"3000"}
                        icon={<PiUsersFourThin className="size-4" />}
                        className={iconStyles["users"]}
                    />
                    <Metric
                        label="Active users"
                        value={"1800"}
                        icon={<PiUserCheck className="size-4" />}
                        className={iconStyles["active"]}
                    />
                    <Metric
                        label="Total Nudges Sent"
                        value={"1000"}
                        icon={<Sparkles className="size-4" />}
                        className={iconStyles["nudges"]}
                    />
                    <Metric
                        label="New Sign-ups Today"
                        value={"20"}
                        icon={<PiUserCirclePlus className="size-4" />}
                        className={iconStyles["signup"]}
                    />
                </div>

                <div className="w-full">
                    <NudgeSentChart />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UserStatusChart />
                    <NudgeDistributionChart />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ActivityFeed />
                    <RecentNotifications />
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
} : MetricProps) => {
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

export default Dashboard;