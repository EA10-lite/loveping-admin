import { Bell, Bot, CircleUserRound, Gift, Sparkles, Star } from "lucide-react"
import { Text } from "../../../components"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"


interface ActivityData {
    type: string;
    title: string;
    date: string;
    time: string;
}

const ActivityFeed = ({ data }: { data: ActivityData[] }) => {
    return (
        <Card className="border-[0.5px] border-primary/8 bg-secondary-foreground p-0 rounded-sm gap-0">
            <CardHeader className="items-center p-4 mb-0">
                <CardTitle className="text-white">Activity Feed</CardTitle>
            </CardHeader>

            <CardContent className="p-0 pb-4 mt-0">
                {data.length > 0 ? (
                    <div className="space-y-2.5">
                        {data?.map((item, index) => (
                            <Activity
                                key={index}
                                type={item.type}
                                title={item.title}
                                date={item.date}
                                time={item.time}
                            />
                        ))}
                    </div>
                ) : (
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


type ActivityProps = {
    title: string;
    date: string;
    time: string;
    type: string;
}

const Activity = ({
    title,
    date,
    time,
    type,
}: ActivityProps) => {
    return (
        <div className="bg-white/3 w-full flex items-center gap-4 px-4 py-2.5">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border-[0.5px] border-primary/10 bg-primary/10">
                {type === "gift" && <Gift className="text-primary size-5" />}
                {type === "nudge" && <Sparkles className="text-primary size-5" />}
                {type === "feedback" && <Star className="text-primary size-5" />}
                {type === "notification" && <Bell className="text-primary size-5" />}
                {type === "account" && <CircleUserRound className="text-primary size-5" />}
                {type === "generated" && <Bot className="text-primary size-5" />}
            </div>


            <div className="space-y-1">
                <Text
                    title={title}
                    type="p"
                />
                <Text
                    title={`${date} ${time}`}
                    type="p"
                    className="text-xs text-grey text-normal"
                />
            </div>
        </div>
    )
}

export default ActivityFeed;