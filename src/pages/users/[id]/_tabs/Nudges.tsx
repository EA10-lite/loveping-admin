import { ReusableTable, TableAction, Truncate } from "../../../../components";
import { type ColumnDef } from "@tanstack/react-table";
import { type Nudge } from "../../../../utils/types";
import { formatDateString } from "../../../../utils/formatter";
import { Badge } from "../../../../components/ui/badge";
import { NudgeType } from "../../../../components";
import { NudgeDetails } from "../../../../components/shared";

const columns: ColumnDef<Nudge>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user.full_name}</span>
            )
        }
    },
    {
        accessorKey: "partner",
        header: "Partner",
        cell: () => (
            <span className="text-sm text-white">Mira Ramirez</span>
        )
    },
    {
        accessorKey: "type",
        header: "Nudge Type",
        cell: ({ row }) => <NudgeType type={row.getValue("type")} />
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
        accessorKey: "content",
        header: "Preview",
        cell: ({ row }) => {
            const content = row.getValue("content") as string;
            return (
                <span className="text-white">
                    <Truncate text={content} />
                </span>
            )
        }
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

const Nudges = ({ nudges }: { nudges: Nudge[] }) => {
    return (
        <div className="notes">
            <ReusableTable
                data={nudges}
                columns={columns}
                searchKeys={["content", "type", "status"]}
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
    )
}

export default Nudges;

