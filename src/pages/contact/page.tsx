import { QueryErrorState, ReusableTable, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type ContactMessage } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "../../components/ui/badge";
import { getContactMessages } from "../../services/contact.service";

const columns: ColumnDef<ContactMessage>[] = [
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.original.user;
            return (
                <span className="text-sm text-white">{user?.name}</span>
            )
        }
    },
    {
        accessorKey: "message",
        header: "Feedback Preview",
        cell: ({ row }) => (
            <span className="text-white line-clamp-1 max-w-[300px]">
                {row.getValue("message")}
            </span>
        )
    },
    {
        accessorKey: "feedback_type",
        header: "Feedback Details",
        cell: ({ row }) => (
            <Badge
                className={`hover:bg-secondary-foreground/80 font-normal capitalize`}
                variant={row.getValue("feedback_type") === "positive" ? "default" : "destructive"}
            >
                {row.getValue("feedback_type")}
            </Badge>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Sudmitted At",
        cell: ({ row }) => (
            <span className="text-white">
                {formatDateString(row.getValue("createdAt"))}
            </span>
        )
    },
    {

        header: "Action",
        cell: () => (
            <div className="flex justify-end">
            </div>
        )
    }
]

const Contact = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: feedbacksData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['contacts', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getContactMessages({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const handleExport = () => {
        if (!feedbacksData?.data) return;
    };

    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Contact Messages"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                        disabled={isLoading || isError || !feedbacksData?.data.length}
                        onClick={handleExport}
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
                        title="Couldn't load feedback"
                    />
                ) : (
                    <ReusableTable
                        data={feedbacksData?.data || []}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                        pageCount={feedbacksData?.totalPages || 1}
                        manualPagination={true}
                        isLoading={isLoading}
                        columns={columns}
                        searchKeys={["message", "category"]}
                        filters={[
                            {
                                columnKey: "category",
                                title: "Type/Category",
                                options: ["Positive", "Negative"].map(c => ({ label: c, value: c }))
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    )
}

export default Contact;

