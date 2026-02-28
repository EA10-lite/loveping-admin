import { ReusableTable, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import { type Feedback as FeedbackType } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { FeedbackDetails } from "../../components/shared";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "../../services/feedback.service";
import { exportToCSV } from "../../utils/exportToCSV";
import { Badge } from "../../components/ui/badge";

const columns: ColumnDef<FeedbackType>[] = [
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
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TableAction
                    View={<FeedbackDetails feedback={row.original} />}
                />
            </div>
        )
    }
]

const Feedback = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data: feedbacksData, isLoading } = useQuery({
        queryKey: ['feedbacks', pagination.pageIndex, pagination.pageSize],
        queryFn: () => getFeedbacks({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
        })
    });

    const handleExport = () => {
        if (!feedbacksData?.data) return;

        const dataToExport = feedbacksData.data.map((feedback: FeedbackType) => ({
            "User": feedback.user.email_address,
            "Message": feedback.message,
            "Category": feedback.feedback_type,
            "Created At": formatDateString(feedback.createdAt)
        }));

        exportToCSV(dataToExport, "feedbacks");
    };

    return (
        <div className="notes">
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <Text
                        title="Feedbacks"
                        type="h4"
                        className="text-lg"
                    />

                    <Button
                        variant="default"
                        className="rounded-sm px-4"
                        disabled={isLoading || !feedbacksData?.data.length}
                        onClick={handleExport}
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
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
            </div>
        </div>
    )
}

export default Feedback;

