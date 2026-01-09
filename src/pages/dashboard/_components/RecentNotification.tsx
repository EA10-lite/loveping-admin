import {
    Card,
    CardHeader,
    CardTitle,
  } from "../../../components/ui/card"

const RecentNotifications = () => {
    return (
        <Card className="border-[0.5px] border-primary/8 bg-[#05251C] p-4 rounded-sm">
            <CardHeader className="items-center pb-0 px-0">
                <CardTitle className="text-white">Recent Notifications</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default RecentNotifications;