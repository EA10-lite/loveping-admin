import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Issues as IssuesType } from "../../utils/types";
import { Badge } from "../../components/ui/badge";
import { formatDateString } from "../../utils/formatter";
import IssueDetails from "./_components/IssueDetails";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../../services/issues.service";
import { exportToCSV } from "../../utils/exportToCSV";

const columns: ColumnDef<IssuesType>[] = [
    {
        accessorKey: "_id",
        header: "Issue ID",
        cell: ({ row }) => (
            <span className="text-white">#{row.getValue("_id")}</span>
        )
    },
    {
        accessorKey: "issue_type",
        header: "Type",
        cell: ({ row }) => (
            <span className="text-white">{row.getValue("issue_type")}</span>
        )
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user.email_address}</span>
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
                    className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                    variant={badgeVariant as "default" | "primary" | "pending" | "destructive" | "secondary"}
                >
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "message",
        header: "Issue Summary",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]" title={row.getValue("summary")}>
                {row.getValue("message")}
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
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: issuesData, isLoading } = useQuery({
        queryKey: ['issues', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getIssues({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });
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
                        disabled={isLoading || !issuesData?.data.length}
                        onClick={() => exportToCSV(issuesData?.data || [], "issues")}
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={issuesData?.data || []}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    pageCount={issuesData?.totalPages || 1}
                    manualPagination={true}
                    isLoading={isLoading}
                    columns={columns}
                    searchKeys={["_id", "summary", "type", "status"]}
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

