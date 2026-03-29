import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"
import { ChevronRight } from "lucide-react";
import { Text } from "../../../components";
import { type Notification } from "../../../utils/types";

const RecentNotifications = ({ data }: { data: Notification[] }) => {
    return (
        <Card className="border-[0.5px] border-primary/8 bg-secondary-foreground p-0 rounded-sm gap-0">
            <CardHeader className="items-center p-4 mb-0 flex items-center justify-between border-b-[0.5px] border-primary/8">
                <CardTitle className="text-white">Recent Notifications</CardTitle>

                {data.length > 0 && (
                    <Link to="/notifications" className="text-primary text-sm flex items-center gap-1 hover:underline transition-all ease-in duration-300ms">
                        <span>view all</span>
                        <ChevronRight  className="size-4" />
                    </Link>
                )}
            </CardHeader>

            <CardContent className="p-0 flex-1">
                {data.length > 0 ? data.map((notification) => (
                    <NotificationField
                        key={notification._id}
                        label={notification.subject}
                        value={notification.body}
                    />
                )) : (
                    <div className="flex items-center justify-center h-full py-4">
                        <Text
                            title="No activity yet"
                            type="h4"
                            className="font-semibold"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

const NotificationField = ({
    label,
    value,
} : {
    label: string;
    value: string;
}) => {
    return (
        <div className={`px-4 py-2.5 border-b-[0.5px] border-primary/8 last:border-none`}>
            <Text
                title={label}
                type="p"
                className="text-white"
            />

            <Text
                title={value}
                type="p"
                className="text-grey text-xs"
            />
        </div>
    )
}

export default RecentNotifications;