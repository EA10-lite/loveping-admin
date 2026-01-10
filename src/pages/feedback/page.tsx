import { ReusableTable, StarRating, TableAction, Text } from "../../components";
import { Button } from "../../components/ui/button";
import { PiExport } from "react-icons/pi";
import { feedbacks } from "../../data/feedback";
import { type ColumnDef } from "@tanstack/react-table";
import { type Feedback as FeedbackType } from "../../utils/types";
import { formatDateString } from "../../utils/formatter";
import { FeedbackDetails } from "../../components/shared";

const columns: ColumnDef<FeedbackType>[] = [
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
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <span className="text-white capitalize">{row.getValue("type")}</span>
        )
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => <StarRating rating={row.getValue("rating")} />
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
        accessorKey: "createdAt",
        header: "Sudmitted on",
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
                    >
                        <PiExport />
                        <span className="text-sm font-medium">Export</span>
                    </Button>
                </div>
            </div>

            <div className="page-body mt-6">
                <ReusableTable
                    data={feedbacks}
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

export default Feedback;

