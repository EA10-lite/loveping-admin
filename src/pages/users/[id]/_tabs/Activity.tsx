
import { ReusableTable, Text } from "../../../../components";
import type { Activity } from "../../../../utils/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Bell, Gift, Sparkles, Star } from "lucide-react";
import { formatTime } from "../../../../utils/formatter";


const Activites = ({ activities } : { activities: Activity[] }) => {
    const columns: ColumnDef<Activity>[] = [
        {
            accessorKey: "user",
            header: "",
            cell: ({ row }) => {
                const type = row.original.type as string;
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#103C28] border-[0.5px] border-primary/10 rounded-full flex items-center justify-center">
                            {type === "gift" && <Gift className="text-primary size-4" />}
                            {type === "nudge" && <Sparkles className="text-primary size-4" />}
                            {type === "feedback" && <Star className="text-primary size-4" />}
                            {type === "notification" && <Bell className="text-primary size-4" />}
                        </div>
                        <div className="">
                            <Text
                                title={row.original.description}
                                type="p"
                                letterSpacing={"-2%"}
                            />
                            <Text
                                title={`${row.original.type} • ${formatTime(row.original.createdAt)}`}
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
                searchKey="summary"
                showHeader={false}
                filters={[
                    {
                        columnKey: "type",
                        title: "Type",
                        options: ["Bug", "Feature", "Improvement"].map(c => ({ label: c, value: c }))
                    },
                    {
                        columnKey: "status",
                        title: "Status",
                        options: ["new", "resolved", "closed"].map(s => ({ label: s, value: s }))
                    }
                ]}
            />
        </div>
    )
}

export default Activites;