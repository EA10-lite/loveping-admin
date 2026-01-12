import { NudgeType, ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef } from "@tanstack/react-table";
import { type Nudge } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { nudges } from "../../data/nudge";
import { Badge } from "../../components/ui/badge";
import { NudgeDetails } from "../../components/shared";

const columns: ColumnDef<Nudge>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user.name}</span>
            )
        }
    },
    {
        accessorKey: "type",
        header: "Nudge Type",
        cell: ({ row }) => <NudgeType type={row.getValue("type")} />
    },
    {
        accessorKey: "tone",
        header: "Tone/Category",
        cell: ({ row }) => {
            const tones = row.getValue("tone") as string[];
            return (
                <span className="text-white line-clamp-1 max-w-[300px]">
                    {tones?.join(", ")}
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "completed") badgeVariant = "default";
            if (status.toLowerCase() === "pending") badgeVariant = "pending";
            return (
                <Badge
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "destructive" | "secondary"}
                >
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "actionTaken",
        header: "Action Taken",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px] capitalize">
                {row.getValue("actionTaken") ? row.getValue("actionTaken") : "-"}
            </span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Generated At",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(new Date(row.getValue("createdAt")))}
            </span>
        )
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<NudgeDetails nudge={row.original} />}
                />
            </div>
        )
    }
]

const Nudges = () => {
    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Nudges"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={nudges}
                    columns={columns}
                    searchKeys={["content", "type", "status", "tone"]}
                    filters={[
                        {
                            columnKey: "type",
                            title: "Nudge Type",
                            options: [
                                "gift",
                                "call",
                                "text",
                            ].map(c => ({ label: c, value: c }))
                        },
                        {
                            columnKey: "status",
                            title: "Status",
                            options: ["completed", "pending"].map(s => ({ label: s, value: s }))
                        },
                        {
                            columnKey: "category",
                            title: "Tone/Category",
                            options: [
                                { label: "Romantic", value: "romantic" },
                                { label: "Playful", value: "playful" },
                                { label: "Deep & Thoughtful", value: "deep_n_thoughful" },
                                { label: "Supportive", value: "suppportive" },
                                { label: "Funny/Lighthearted", value: "funny_n_lighthearted" }
                            ].map(c => ({ label: c.label, value: c.value }))
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default Nudges;

