import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { issuesIndices } from "../../data/issues";
import { type ColumnDef } from "@tanstack/react-table";
import { type Issues as IssuesType } from "../../utils/types";
import { Badge } from "../../components/ui/badge";
import { formatDateString } from "../../utils/formatter";
import IssueDetails from "./_components/IssueDetails";

const columns: ColumnDef<IssuesType>[] = [
    {
        accessorKey: "_id",
        header: "Issue ID",
        cell: ({ row }) => (
            <span className="text-white">#{row.getValue("_id")}</span>
        )
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("type")}</span>
        )
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user.email}</span>
            )
        }
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;

            let badgeVariant = "secondary";
            if (status.toLowerCase() === "new") badgeVariant = "primary";
            if (status.toLowerCase() === "resolved") badgeVariant = "default";
            if (status.toLowerCase() === "in-review") badgeVariant = "pending";
            if (status.toLowerCase() === "closed") badgeVariant = "destructive";
            return (
                <Badge
                    className={`hover:bg-[#05251C]/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "destructive" | "secondary"}
                >
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "summary",
        header: "Issue Summary",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]" title={row.getValue("summary")}>
                {row.getValue("summary")}
            </span>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Repoted on",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(row.getValue("createdAt"))}
            </span>
        )
    },
    {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<IssueDetails issue={row.original} />}
                />
            </div>
        )
    }
]

const Issues = () => {
    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Issues"
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
                    data={issuesIndices}
                    columns={columns}
                    searchKey="summary"
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
        </div>
    )
}

export default Issues;

