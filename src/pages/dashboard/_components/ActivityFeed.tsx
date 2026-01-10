import { Bell, Bot, CircleUserRound, Gift, Sparkles, Star } from "lucide-react"
import { Text } from "../../../components"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"

const ActivityFeed = () => {
    return (
        <Card className="border-[0.5px] border-primary/8 bg-secondary-foreground p-0 rounded-sm gap-0">
            <CardHeader className="items-center p-4 mb-0">
                <CardTitle className="text-white">Activity Feed</CardTitle>
            </CardHeader>

            <CardContent className="p-0 pb-4 mt-0">
                <div className="space-y-2.5">
                    <Activity
                        type="account"
                        title="Amara J. generated a romantic text nudge for her partner."
                        date="12/02/2025"
                        time="2 mins ago"
                    />
                    <Activity
                        type="generated"
                        title="AI generated three new gift suggestions for Sarah K"
                        date="12/02/2025"
                        time="2 mins ago"
                    />
                    <Activity
                        type="nudge"
                        title="Amara J. generated a romantic text nudge for her partner."
                        date="12/02/2025"
                        time="2 mins ago"
                    />
                    <Activity
                        type="gift"
                        title="User Chloe M. submitted a feedback rating of 5 stars"
                        date="12/02/2025"
                        time="2 mins ago"
                    />
                </div>
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
} : ActivityProps) => {
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