
import { ReusableTable, Text } from "../../../../components";
import type { Activity } from "../../../../utils/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Bell, Bot, CircleUserRound, Gift, Sparkles, Star } from "lucide-react";
import { formatTime } from "../../../../utils/formatter";


const Activites = ({ activities }: { activities: Activity[] }) => {
    const getType = (type: string) => {
        let formattedType = "";

        if (type.includes("ping")) {
            formattedType = "nudge";
        } else if (type.includes("auth") || type.includes("profile")) {
            formattedType = "account";
        } else if (type.includes("feedback")) {
            formattedType = "feedback";
        } else if (type.includes("gift")) {
            formattedType = "gift";
        } else if (type.includes("nudge")) {
            formattedType = "nudge";
        } else if (type.includes("notification")) {
            formattedType = "notification";
        } else if (type.includes("generated")) {
            formattedType = "generated";
        }

        return formattedType;
    }
    const columns: ColumnDef<Activity>[] = [
        {
            accessorKey: "type",
            header: "",
            cell: ({ row }) => {
                const type = row.original.type as string;
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#103C28] border-[0.5px] border-primary/10 rounded-full flex items-center justify-center">
                            {getType(type) === "gift" && <Gift className="text-primary size-4" />}
                            {getType(type) === "nudge" && <Sparkles className="text-primary size-4" />}
                            {getType(type) === "feedback" && <Star className="text-primary size-4" />}
                            {getType(type) === "notification" && <Bell className="text-primary size-4" />}
                            {getType(type) === "account" && <CircleUserRound className="text-primary size-4" />}
                            {getType(type) === "generated" && <Bot className="text-primary size-4" />}
                        </div>
                        <div className="">
                            <Text
                                title={row.original.message}
                                type="p"
                                letterSpacing={"-2%"}
                            />
                            <Text
                                title={`${getType(row.original.type)} • ${formatTime(row.original.createdAt)}`}
                                type="p"
                                letterSpacing={"-2%"}
                                className="text-xs text-grey capitalize"
                            />
                        </div>
                    </div>
                )
            }
        },
    ]
    return (
        <div className="activities">
            <ReusableTable
                data={activities}
                columns={columns}
                searchKeys={["message", "type"]}
                showHeader={false}
                filters={[
                    {
                        columnKey: "type",
                        title: "Type",
                        options: ["ping", "auth", "profile", "feedback", "gift", "nudge", "notification", "generated"].map(c => ({ label: c, value: c }))
                    },
                ]}
            />
        </div>
    )
}

export default Activites;