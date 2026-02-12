import { NudgeType, ReusableTable, TableAction, Text } from "../../components";
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
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: nudgesData, isLoading } = useQuery({
        queryKey: ['faqs', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getNudges({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const handleExport = () => {
        if (!nudgesData?.data) return;

        const dataToExport = nudgesData.data.map((nudge: Nudge) => ({
            "User": nudge.user?.name || "N/A",
            "Type": nudge.type,
            "Tone": nudge.tone?.join(", ") || "",
            "Status": nudge.status,
            "Action Taken": nudge.actionTaken || "",
            "Content": nudge.content,
            "Created At": formatDateString(new Date(nudge.createdAt))
        }));

        exportToCSV(dataToExport, "nudges_export.csv");
    };

    console.log("nudgesData: ", nudgesData);
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
                        disabled={isLoading || !nudgesData?.data?.length}
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
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
            </div>
        </div>
    )
}

export default Nudges;

