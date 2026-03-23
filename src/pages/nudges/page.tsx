import { NudgeType, QueryErrorState, ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Nudge } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { Badge } from "../../components/ui/badge";
import { NudgeDetails } from "../../components/shared";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNudges } from "../../services/nudges.service";
import { exportToCSV } from "../../utils/exportToCSV";
import { Link } from "react-router-dom";


const columns: ColumnDef<Nudge>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            const userName = typeof user === "string" ? user : user.full_name;
            const userId = typeof user === "string" ? user : user._id;
            return (
                <Link to={`/users/${userId}`}>
                    <span className="text-sm text-white hover:underline">{userName}</span>
                </Link>
            )
        }
    },
    {
        accessorKey: "ping_type",
        header: "Nudge Type",
        cell: ({ row }) => <NudgeType type={row.getValue("ping_type")} />
    },
    {
        accessorKey: "tones",
        header: "Tone/Category",
        cell: ({ row }) => {
            const tones = row.getValue("tones") as string[];
            return (
                <span className="text-white line-clamp-1 max-w-[300px] capitalize">
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
            if (status.toLowerCase() === "delivered") badgeVariant = "primary";

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
                {formatDateString(row.getValue("createdAt") as string | Date)}
            </span>
        )
    },
    {
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
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: nudgesData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['nudges', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getNudges({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const handleExport = () => {
        if (!nudgesData?.data) return;

        const dataToExport = nudgesData.data.map((nudge: Nudge) => ({
            "User": (typeof nudge.user === "string" ? nudge.user : nudge.user?.full_name) || "N/A",
            "Ping Type": nudge.ping_type,
            "Tones": nudge.tones?.join(", ") || "",
            "Status": nudge.status,
            "Action Taken": nudge.actionTaken || "",
            "Message": nudge.message,
            "Created At": formatDateString(nudge.createdAt)
        }));

        exportToCSV(dataToExport, "nudges_export.csv");
    };

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
                        onClick={handleExport}
                        disabled={isLoading || isError || !nudgesData?.data?.length}
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                {isError ? (
                    <QueryErrorState
                        error={error}
                        onRetry={() => refetch()}
                        title="Couldn't load nudges"
                    />
                ) : (
                    <ReusableTable
                        data={nudgesData?.data || []}
                        columns={columns}
                        searchKeys={["content", "type", "status", "tone"]}
                        isLoading={isLoading}
                        manualPagination={true}
                        pageCount={nudgesData?.totalPages || 1}
                        pagination={pagination}
                        onPaginationChange={setPagination}
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
                )}
            </div>
        </div>
    )
}

export default Nudges;

