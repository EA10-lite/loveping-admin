import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"
import { ChevronRight } from "lucide-react";
import { Text } from "../../../components";

const RecentNotifications = () => {
    return (
        <Card className="border-[0.5px] border-primary/8 bg-[#05251C] p-0 rounded-sm gap-0">
            <CardHeader className="items-center p-4 mb-0 flex items-center justify-between border-b-[0.5px] border-primary/8">
                <CardTitle className="text-white">Recent Notifications</CardTitle>

                <Link to="/notifications" className="text-primary text-sm flex items-center gap-1 hover:underline transition-all ease-in duration-300ms">
                    <span>view all</span>
                    <ChevronRight  className="size-4" />
                </Link>
            </CardHeader>

            <CardContent className="p-0">
                <NotificationField
                    label="New AI Tone Pack Released: Deep Affection"
                    value="We've added a new tone option to help users send deeper, more emotionally expressive nudges."
                />
                <NotificationField
                    label="System Update: Improved Nudge Personalization"
                    value="The AI engine has been updated to better analyse relationship context for personalised suggestions."
                />
                <NotificationField
                    label="New AI Tone Pack Released: Deep Affection"
                    value="We've added a new tone option to help users send deeper, more emotionally expressive nudges."
                />
                <NotificationField
                    label="System Update: Improved Nudge Personalization"
                    value="The AI engine has been updated to better analyse relationship context for personalised suggestions."
                />
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